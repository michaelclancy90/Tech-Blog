const router = require('express').Router();
const { Blogger, Blog, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Blogger,
          attributes: ['name'],
        },
      ],
    });
    const blogs = blogData.map((project) => blogData.get({ plain: true }));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
