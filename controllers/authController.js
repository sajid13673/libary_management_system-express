const {User, Member, Borrowing, Book, BlacklistToken} = require("../models");
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
    res.json({ status:true, access_token: token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: false, message: 'Authentication token is missing' });
  }

  const token = authHeader.split(' ')[1];

  // Decode the token to get the expiration time
  const decoded = jwt.decode(token);
  if (!decoded) {
    return res.status(400).json({ status: false, message: 'Invalid token' });
  }

  const expiresAt = new Date(decoded.exp * 1000);

  try {
    // Add the token to the blacklist
    await BlacklistToken.create({ token, expiresAt });

    res.status(200).json({ status: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error });
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
          required: false, // This ensures borrowings with status true are included if they exist, but still include the member
          include:{
            model: Book,
            as: 'book'
          }
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


