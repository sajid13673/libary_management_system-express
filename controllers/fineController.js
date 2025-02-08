const { Fine, Member, Borrowing, Book } = require("../models");

const getFines = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const totalItems = await Fine.count();
    const totalPages = Math.ceil(totalItems / perPage);
    const fines = await Fine.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
      include: [
        {
          model: Member,
          as: "member",
        },
        {
          model: Borrowing,
          as: "borrowing",
        },
      ],
    });
    res
      .status(200)
      .json({ status: true, page, perPage, totalPages, data: fines });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
const getFineById = async (req, res) => {
  try {
    const fine = await Fine.findByPk(req.params.id, {
      include: [
        {
          model: Member,
          as: "member",
        },
        {
          model: Borrowing,
          as: "borrowing",
          include: {
            model: Book,
            as: "book",
          },
        },
      ],
    });
    res.status(200).json({ status: true, data: fine });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { getFines, getFineById };
