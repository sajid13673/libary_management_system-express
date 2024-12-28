const db = require('../models');
const Book = db.Book;
const Image = db.Image;
const path = require('path');
const saveImage = require('../utils/saveImage');

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
      const destinationPath = path.join(
        __dirname,
        "../uploads/book",
        file.originalname
      );
      const savedFile = await saveImage(file.path, destinationPath);
      const image = await Image.create(savedFile);
      await book.addImage(image);
    }
    res.status(201).json({status : true, message : "Book created successfully"});
  } catch (err) {
    res.status(400).json({ status : false, message: err.message });
  }
};