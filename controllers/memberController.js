const {Member, User, Image} = require('../models');
const { saveFile } = require('../utils/manageFiles');

const getMembers = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1; 
          const perPage = parseInt(req.query.perPage) || 10;
            const totalItems = await Member.count(); 
            const totalPages = Math.ceil(totalItems / perPage); 
            const books = await Member.findAll({
              offset: (page - 1) * perPage,
              limit: perPage,
              include: [
                {
                model: User,
                as: "user"
                },
              {
                model: Image,
                as: 'image'
              }
            ]
            }); 
            res.json({ status:true, page, perPage, totalPages, totalItems, data:books });
    } catch(err){
        res.status(500).json({status: false, message: err.message});
    }
}

const createMember = async (req, res) => {
  try {
    console.log(req.file);
    const file = req.file;
    const user = await User.create(
      {
        email: req.body.email,
        password: req.body.password,
        member: {
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
        },
      },
      {
        include: {
          model: Member,
          as: "member",
        },
      }
    );
    if(file){
      const originalname = file.originalname;
      const savedFile = await saveFile(file.path, originalname, 'members');
      const image = await Image.create(savedFile);
      await user.member.reload();
      await user.member.setImage(image);
    }

    res.status(200).json({ status: true, message: "Member created successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
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
const updateMember = async (req, res) => {
    try {
        const member = await Member.findByPk(req.params.id);
        if(!member){ 
            res.status(404).json({status: false, message: "Member not found"});
            return;
        }
        await member.update(req.body);
        res.status(200).json({status: true, message: "Member updated successfully"});
    } catch (err) {
        res.status(500).json({status: false, message: err.message});
    }
}
module.exports = {getMembers, createMember, getMemberById, deleteMember, updateMember}