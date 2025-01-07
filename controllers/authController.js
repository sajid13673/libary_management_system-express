const {User, Member, Borrowing} = require("../models");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log("id : "+user.id+" role : "+user.role);
    
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Member,
        as: 'member',
        required: false,
        include: {
          model: Borrowing,
          as: 'borrowings',
          where: { status: true },
          required: false // This ensures borrowings with status true are included if they exist, but still include the member
        }
      }
    });

    if (!user) {
      return res.status(404).json({ status: false , message: 'User not found' });
    }

    res.status(200).json({status: true, data: user}); 
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};


