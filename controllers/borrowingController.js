const {Borrowing, Member, Book, Fine} = require('../models');

const getBorrowings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
          const perPage = parseInt(req.query.perPage) || 10;
          const type = req.query.type || 'all';
            const queryOptions  = {
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
              },
              {
                model: Fine,
                as: "fine"
              }
            ]
            };
            if(type !== 'all'){
              queryOptions.where = {status: type === 'returned' ? false : true}
            }
            const totalItems = await Borrowing.count(queryOptions);
            const totalPages = Math.ceil(totalItems / perPage);
            const borrowings = await Borrowing.findAll(queryOptions);
            const borrowingsWithFineStatus = borrowings.map((borrowing) => {
              const hasPendingFine = borrowing.fine ? !borrowing.fine.isPaid : false;
              const { borrowings, ...borrowingWithoutFines } = borrowing.toJSON();
              return {
                ...borrowingWithoutFines,
                hasPendingFine,
              };
            });
            res.json({ status:true, page, perPage, totalPages, totalItems, data:borrowingsWithFineStatus });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
const createBorrowing = async (req, res) => {
    try {
        console.log(req.body);

        const book = await Book.findByPk(req.body.bookId, {
          include: {
            model: Borrowing,
            as: "borrowings",
          },
        });
        const hasActiveBorrowings = book.borrowings.some(borrowing => borrowing.status === true);
        if(hasActiveBorrowings){
            res.status(400).json({status: false, message: 'Book already has an active borrowing'});
            return;
        }
        await Borrowing.create(req.body);
        res.status(201).json({status: false, message: 'Borrowing created successfully'});
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
        const borrowing = await Borrowing.findByPk(req.params.id,{
          include: {
            model: Fine,
            as: "fine"
          }
        });
        if(borrowing.fine && !borrowing.fine.isPaid){
            res.status(400).json({status: false, message: 'This borrowing has unpaid fine'});
        }
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