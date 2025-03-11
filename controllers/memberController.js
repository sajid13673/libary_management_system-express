const { Member, User, Image, Borrowing, Book, Fine } = require("../models");
const { saveFile } = require("../utils/manageFiles");

const getMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalItems = await Member.count();
    const totalPages = Math.ceil(totalItems / perPage);
    const members = await Member.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Image,
          as: "image",
        },
      ],
    });
    res.json({
      status: true,
      page,
      perPage,
      totalPages,
      totalItems,
      data: members,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

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
    if (file) {
      const originalname = file.originalname;
      const savedFile = await saveFile(file.path, originalname, "members");
      const image = await Image.create(savedFile);
      await user.member.reload();
      await user.member.setImage(image);
    }

    res
      .status(200)
      .json({ status: true, message: "Member created successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const borrowingPage = parseInt(req.query.borrowingPage) || 1;
    const borrowingsPerPage = parseInt(req.query.borrowingsPerPage) || 5;

    const includeBorrowings = req.query.borrowings
      ? [
          {
            model: Borrowing,
            as: "borrowings",
            limit: borrowingsPerPage,
            offset: (borrowingPage - 1) * borrowingsPerPage,
            order: [["createdAt", "DESC"]],
            required: false,
            include: [
              {
                model: Book,
                as: "book",
                required: false,
              },
              {
                model: Fine,
                as: "fine",
              },
            ],
          },
        ]
      : [];

    console.log(includeBorrowings);

    const member = await Member.findByPk(req.params.id, {
      include: includeBorrowings,
    });

    if (req.query.borrowings) {
      if (!member) {
        res.status(404).json({ status: false, message: "Member not found" });
        return;
      }

      const totalItems = await Borrowing.count({
        where: { memberId: req.params.id },
      });
      const totalPages = Math.ceil(totalItems / borrowingsPerPage);

      // Convert Sequelize instance to plain object to avoid any side effects
      const memberData = member.toJSON();

      const borrowingsWithFineStatus = memberData.borrowings.map(
        (borrowing) => {
          const hasPendingFine = borrowing.fine
            ? !borrowing.fine.isPaid
            : false;
          const { fine, ...borrowingWithoutFines } = borrowing;
          return {
            ...borrowingWithoutFines,
            hasPendingFine,
          };
        }
      );

      memberData.borrowings = borrowingsWithFineStatus;

      res.status(200).json({
        status: true,
        data: memberData,
        borrowingPage,
        borrowingsPerPage,
        totalItems,
        totalPages,
      });
      return;
    }

    if (!member) {
      res.status(404).json({ status: false, message: "Member not found" });
      return;
    }

    res.status(200).json({ status: true, data: member });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    await member.destroy();
    res
      .status(200)
      .json({ status: true, message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
const updateMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, {
      include: {
        model: Image,
        as: "image",
      },
    });
    if (!member) {
      res.status(404).json({ status: false, message: "Member not found" });
      return;
    }
    await member.update(req.body);
    if (req.file) {
      const originalname = req.file.originalname;
      const savedFile = await saveFile(req.file.path, originalname, "members");
      if (member.image) {
        await member.image.destroy();
      }
      const image = await Image.create(savedFile);
      await member.setImage(image);
    }
    res
      .status(200)
      .json({ status: true, message: "Member updated successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
module.exports = {
  getMembers,
  createMember,
  getMemberById,
  deleteMember,
  updateMember,
};
