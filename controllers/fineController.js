const { Fine, Member } = require('../models')

const getFines = async (req, res) => {
    try {
        const fines = await Fine.findAll({include: {
            model: Member,
            as: 'member',
        }});
        res.status(200).json({status: true, data: fines});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
}

module.exports = {getFines}