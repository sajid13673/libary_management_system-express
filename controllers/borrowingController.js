const {Borrowing, Member, Book} = require('../models')

const getBorrowings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
          const perPage = parseInt(req.query.perPage) || 10;
            const totalItems = await Borrowing.count(); 
            const totalPages = Math.ceil(totalItems / perPage); 
            const borrowings = await Borrowing.findAll({
              offset: (page - 1) * perPage,
              limit: perPage,
              include: [
                {
                model: Book,
                as: "book"
              },
              {
                model: Member,
                as: "member"
              }
            ]
            }); 
            res.json({ status:true, page, perPage, totalPages, totalItems, data:borrowings });
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