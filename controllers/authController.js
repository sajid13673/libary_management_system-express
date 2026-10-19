const {
  User,
  Member,
  Borrowing,
  Book,
  BlacklistToken,
  UserRefreshToken,
  Fine,
} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const crypto = require("crypto");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
      include: {
        model: Member,
        as: "member",
        required: false,
      },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.member.status) {
      return res
        .status(403)
        .json({
          message:
            "Your account is currently inactive. Please contact the administrator to restore or grant access.",
        });
    }
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    const refreshToken = uuidv4();

    await UserRefreshToken.create({ userId: user.id, refreshToken });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: true,
      access_token: accessToken,
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.refreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is missing",
    });
  }

  try {
    const storedToken = await UserRefreshToken.findOne({
      where: { refreshToken },
    });

    if (!storedToken) {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const user = await User.findByPk(storedToken.userId);

    if (!user) {
      await storedToken.destroy();

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        message: "User not found",
      });
    }

    // Generate a new access token.
    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    // Generate a new refresh token.
    const newRefreshToken = crypto.randomBytes(64).toString("hex");

    // Rotate the refresh token.
    await storedToken.update({
      refreshToken: newRefreshToken,
    });

    // Set the new refresh token as an HttpOnly cookie.
    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      status: true,
      access_token: accessToken,
      user,
    });
  } catch (err) {
    console.error("Refresh token error:", err);

    return res.status(500).json({
      message: "Unable to refresh access token",
    });
  }
};

exports.logout = async (req, res) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies?.refresh_token;

  try {
    // Blacklist the access token if provided.
    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.decode(token);

      if (decoded?.exp) {
        const expiresAt = new Date(decoded.exp * 1000);

        await BlacklistToken.create({
          token,
          expiresAt,
        });
      }
    }

    // Delete the refresh token from the database.
    if (refreshToken) {
      await UserRefreshToken.destroy({
        where: { refreshToken },
      });
    }

    // Clear the refresh-token cookie.
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      status: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: Member,
        as: "member",
        required: false,
        include: [
          {
            model: Borrowing,
            as: "borrowings",
            where: { status: true },
            required: false,
            include: {
              model: Book,
              as: "book",
            },
          },
          {
            model: Fine,
            as: "fines",
            required: false,
            where: { isPaid: false },
            include: {
              model: Borrowing,
              as: "borrowing",
              attributes: ["id"],
              include: {
                model: Book,
                as: "book",
                attributes: ["title", "author"],
              },
            },
          },
        ],
      },
    });

    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({ status: false, message: error });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const user = req.user;
    const { currentPassword, newPassword } = req.body;
    if (await bcrypt.compare(currentPassword, user.password)) {
      user.update({ password: newPassword });
      res
        .status(200)
        .json({ status: true, message: "Password changed successfully" });
      return;
    }
    res.status(400).json({ status: false, message: "Incorrect password" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, address, phone_number } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create(
      {
        email: req.body.email,
        password: req.body.password,
        member: {
          name: req.body.name,
          phoneNumber: req.body.phone_number,
          address: req.body.address,
        },
      },
      {
        include: {
          model: Member,
          as: "member",
        },
      },
    );

    return res.status(201).json({
      status: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      status: false,
      message: "An error occurred during registration",
    });
  }
};
