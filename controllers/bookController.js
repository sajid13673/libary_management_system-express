const { Book, Image, Borrowing } = require("../models");
const { saveFile } = require("../utils/manageFiles");
const { Op, Sequelize } = require("sequelize"); // Ensure Sequelize is imported alongside Op

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const order = req.query.order || "createdAt-desc";
    const [field, direction] = order.split("-");
    const searchTerm = req.query.search || "";
    const borrowStatus = req.query.borrStatus || "all"; // 'all', 'available', 'unavailable'

    const whereConditions = [];

    // 1. Search filter
    if (searchTerm) {
      whereConditions.push({
        [Op.or]: [
          { title: { [Op.like]: `%${searchTerm}%` } },
          { author: { [Op.like]: `%${searchTerm}%` } },
          { publisher: { [Op.like]: `%${searchTerm}%` } },
        ],
      });
    }

    // 2. Borrow status filter (Database-level so pagination remains accurate)
    // Note: Adjust 'Borrowings' and 'bookId' below if your actual MySQL table/foreign-key names differ
    const activeBorrowingSubquery = `
      SELECT 1 FROM Borrowings 
      WHERE Borrowings.bookId = Book.id 
      AND Borrowings.status = true
    `;

    if (borrowStatus === "unavailable") {
      // Books that HAVE at least one active borrowing (activeBorrowings === true)
      whereConditions.push(
        Sequelize.literal(`EXISTS (${activeBorrowingSubquery})`),
      );
    } else if (borrowStatus === "available") {
      // Books that DO NOT have any active borrowings (activeBorrowings === false)
      whereConditions.push(
        Sequelize.literal(`NOT EXISTS (${activeBorrowingSubquery})`),
      );
    }

    const whereClause =
      whereConditions.length > 0 ? { [Op.and]: whereConditions } : {};

    const queryOptions = {
      where: whereClause,
      offset: (page - 1) * perPage,
      limit: perPage,
      order: [[field, direction]],
      attributes: { exclude: ["updatedAt"] },
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["id", "url"],
        },
        {
          model: Borrowing,
          as: "borrowings",
        },
      ],
    };

    const totalItems = await Book.count({ where: whereClause });
    const totalPages = Math.ceil(totalItems / perPage);
    const books = await Book.findAll(queryOptions);

    const booksWithBorrowingStatus = books.map((book) => {
      const hasActiveBorrowing = book.borrowings.some(
        (borrowing) => borrowing.status === true,
      );
      const { borrowings, ...bookWithoutBorrowings } = book.toJSON();
      return {
        ...bookWithoutBorrowings,
        activeBorrowings: hasActiveBorrowing,
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
    const { categories, ...bookData } = req.body;

    const book = await Book.create(bookData);
    if (file) {
      const originalname = file.originalname;
      const savedFile = await saveFile(file.path, originalname, "books");
      const image = await Image.create(savedFile);
      await book.addImage(image);
    }
    console.log("categories : ", categories);
    if (categories) {
      const categoryIds = Array.isArray(categories)
        ? categories.map(Number)
        : String(categories).split(",").filter(Boolean).map(Number);

      if (categoryIds.length > 0) {
        await book.setCategories(categoryIds);
      }
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
          }),
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
