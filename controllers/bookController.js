const db = require('../models');
const Book = db.Book;
const Image = db.Image;
const {saveFile} = require('../utils/manageFiles');
const { where } = require('sequelize');

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: {
                model: Image,
                as: 'images'
            }
        });
        res.status(200).json({status : true, data : books});
    } catch(err) {
        res.status(500).json({status: false, message: err.message});
    }
}
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
    res.status(200).json({ status: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id, {
            include: {
                model: Image,
                as: 'images'
            }
        });
        res.status(200).json({status : true, data : book});
    } catch(err) {
        res.status(500).json({status: false, message: err.message});
    }
};