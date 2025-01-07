const {Borrowing, Member, Book} = require('../models')

const getBorrowings = async (req, res) => {
  try {
    const borrowings = await Borrowing.findAll({
      include: [
        {
          model: Member,
          as: "member",
        },
        {
          model: Book,
          as: "book",
        },
      ],
    });
    res.status(200).json({ status: true, data: borrowings });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
const createBorrowing = async (req, res) => {
    try {
        await Borrowing.create(req.body);
        res.status(201).json({status: true, message: 'Borrowing created successfully'});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
};
const getBorrowingById =  async (req, res) => {
    try {
        const borrowing = await Borrowing.findByPk(req.params.id)
        res.status(200).json({status : true, data: borrowing})
    } catch (err) {
        res.status(500).json({status: false, message: err.message})
    }
};
const deleteBorrowing = async (req, res) => {
    try {
        const borrowing = await Borrowing.findByPk(req.params.id);
        await borrowing.destroy();
        res.status(200).json({status: true, message: "Borrowing deleted successfully"});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
};

const updateBorrowing = async (req, res) => {
    try {
        const borrowing = await Borrowing.findByPk(req.params.id);
        if(!borrowing){ 
            res.status(404).json({status: false, message: "Borrowing not found"});
            return;
        }
        await borrowing.update(req.body);
        res.status(200).json({status: true, message: "Borrowing updated successfully"});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
}

module.exports = {getBorrowings, createBorrowing, getBorrowingById, deleteBorrowing, updateBorrowing}