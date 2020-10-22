const { Literatures, Bookmark } = require('../../models');

exports.getBookmarks = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Bookmark.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: Literatures,
          as: 'literature',
          attributes: ['id', 'title', 'author', 'year', 'status'],
        },
      ],
      attributes: [],
      order: [['id', 'DESC']],
    });

    res.send({
      status: 'success',
      message: `Bookmarks fetched successfully`,
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.addBookmark = async (req, res) => {
  try {
    const { literatureId } = req.params;
    const userId = req.user.id;
    await Bookmark.create({
      userId,
      literatureId,
    });

    const { id, title } = await Literatures.findOne({
      where: {
        id: literatureId,
      },
    });

    res.send({
      status: 'success',
      message: 'Bookmark added successfully',
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};

exports.removeBookmark = async (req, res) => {
  try {
    const { literatureId } = req.params;
    const userId = req.user.id;
    await Bookmark.destroy({
      where: {
        userId,
        literatureId,
      },
    });
    const { id, title } = await Literatures.findOne({
      where: {
        id: literatureId,
      },
    });

    res.send({
      status: 'success',
      message: 'Bookmark removed successfully',
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'Internal Server Error',
      code: 500,
    });
  }
};
