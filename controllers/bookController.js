const { Book, Image, Borrowing } = require("../models");
const { saveFile } = require("../utils/manageFiles");
const { Op } = require("sequelize");
exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const order = req.query.order || "createdAt-desc";
    const [field, direction] = order.split("-");
    const searchTerm = req.query.search || "";
    const queryOptions = {
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[field, direction]],
      include: [
        {
          model: Image,
          as: "images",
        },
        {
          model: Borrowing,
          as: "borrowings",
        },
      ],
    };
    if (searchTerm) {
      queryOptions.where = {
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { author: { [Op.like]: `%${searchTerm}%` } },
          { publisher: { [Op.like]: `%${searchTerm}%` } },
        ],
      };
    }
    const totalItems = await Book.count({ where: queryOptions.where });
    const totalPages = Math.ceil(totalItems / perPage);
    const books = await Book.findAll(queryOptions);
    const booksWithBorrowingStatus = books.map((book) => {
      const hasActiveBorrowing = book.borrowings.some(
        (borrowing) => borrowing.status === true
      );
      const { borrowings, ...bookWithoutBorrowings } = book.toJSON();
      return {
        ...bookWithoutBorrowings,
        activeBorrowings: hasActiveBorrowing ? true : false,
      };
    });
    res.json({
      status: true,
      page,
      perPage,
      totalPages,
      totalItems,
      data: booksWithBorrowingStatus,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
exports.createBook = async (req, res) => {
  try {
    const file = req.file;
    console.log(file);
    const book = await Book.create(req.body);
    if (file) {
      const originalname = file.originalname;
      const savedFile = await saveFile(file.path, originalname, "books");
      const image = await Image.create(savedFile);
      await book.addImage(image);
    }
    res
      .status(201)
      .json({ status: true, message: "Book created successfully" });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    book.destroy();
    res
      .status(200)
      .json({ status: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: {
        model: Image,
        as: "images",
      },
    });
    res.status(200).json({ status: true, data: book });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: {
        model: Image,
        as: "images",
      },
    });
    if (!book) {
      res.status(404).json({ status: false, message: "Book not found" });
      return;
    }
    await book.update(req.body);
    if (req.file) {
      const originalname = req.file.originalname;
      const savedFile = await saveFile(req.file.path, originalname, "books");
      const images = book.images;
      console.log(images);

      if (images) {
        await Promise.all(
          images.map(async (image) => {
            await image.destroy();
          })
        );
      }
      const image = await Image.create(savedFile);
      book.addImage(image);
    }
    res
      .status(200)
      .json({ status: true, message: "Book updated successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};
exports.getBooksStats = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const issuedBooks = await Borrowing.count({ where: { status: true } });
    const availableBooks = totalBooks - issuedBooks;
    const overdueBooks = await Borrowing.count({
      where: { status: true, dueDate: { [Op.lt]: new Date() } },
    });
    res
      .status(200)
      .json({ totalBooks, issuedBooks, availableBooks, overdueBooks });
  } catch (err) {
    res.status(500).json({ status: false, message: err });
  }
};
