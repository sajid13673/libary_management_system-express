const { Payment, Fine } = require('../models'); 

const makePayment = async (req, res) => {
    try {
        const fine = await Fine.findByPk(req.body.fineId);
        if(!fine){
            res.status(404).json({status: false, message: "Fine not found"});
            return;
        }
        if(fine.amount !== req.body.amount){
            res.status(400).json({status: false, message: "Invalid payment amount"});
            return;
        }
        await Payment.create(req.body);
        fine.update({ isPaid: true });
        res.status(201).json({ status: true, message: "Payment made successfully" });

    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
}

module.exports = {makePayment};