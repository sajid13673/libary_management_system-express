const db = require('../models');
const Member = db.Member;
const User = db.User;
const bcrypt = require('bcryptjs');

const getMembers = async (req, res) => {
    try{
        members = await Member.findAll();
        res.status(200).json({status : true, data: members});
    } catch(err){
        res.status(500).json({status: false, message: err.message});
    }
}

const createMember = async (req, res) => {
    try{
        console.log(req.body);
        // res.json("ji")
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        console.log('phone' + req.body.phoneNumber);
        
        user = await User.create({
            email: req.body.email, 
            password: password, 
            member: {
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
            }
        }, {
            include: {
                model: Member,
                as: 'member'
            }
        })
        res.status(200).json({status : true, message: 'Member created successfully'});
    } catch(err){
        res.status(500).json({status: false, message: err.message});
    }
};
const getMemberById = async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id)
        res.status(200).json({status : true, data: member})
    } catch (err) {
        res.status(500).json({status: false, message: err.message})
    }
};
const deleteMember = async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id);
        await member.destroy();
        res.status(200).json({status: true, message: "Member deleted successfully"});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
};

module.exports = {getMembers, createMember, getMemberById, deleteMember}