const {Borrowing, Fine} = require('../models')
const { Op } = require('sequelize');

const updateFines = async () => {
    const overDueBorrowings = await Borrowing.findAll({
        where: {
            status: true,
            dueDate: {
                [Op.lt]: new Date(),
            },
        },
        include: {
            model: Fine,
            as: 'fine',
            required: false,
        }
    });
    // console.log("overDue Borrowings");
    // console.log(overDueBorrowings);

    for (const borrowing of overDueBorrowings) {
        const {amount, days} = calculateFine(borrowing);

        if(borrowing.fine) {
            borrowing.fine.amount = amount;
            borrowing.fine.days = days;
            await borrowing.fine.save();
        } else {
            await Fine.create({
                borrowingId: borrowing.id,
                memberId: borrowing.memberId,
                bookId: borrowing.bookId,
                amount: amount,
                days: days,
            });
        }
    }
    console.log("Fines updated successfully");
    
}
const calculateFine = (borrowing) => {
    const checking =  new Date() - borrowing.dueDate;
    console.log("cheking : " + checking)
    const days = Math.max(Math.ceil((new Date() - borrowing.dueDate) / (1000 * 60 * 60 * 24)), 0);
    console.log("days : " + days);
    
    const amount = days * 0.25;
    return {amount, days}; 
};

module.exports = updateFines