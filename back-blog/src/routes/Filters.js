const Router = require("express");
const router = Router();
const { Op } = require('sequelize');
const { BlogData } = require("../db.js");

//Filtrar post por titulo
router.get("/byTitle", async (req, res) => {
  try {
    const { title } = req.query;
    const post = await BlogData.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    res.json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});
router.get("/byAuthor", async (req, res) => {
  try {
    const { author } = req.query;
    const post = await BlogData.findAll({
      where: {
        author: {
          [Op.like]: `%${author}%`,
        },
      },
    });
    res.json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});
router.get("/byContent", async (req, res) => {
  try {
    const { content } = req.query;
    const post = await BlogData.findAll({
      where: {
        content: {
          [Op.like]: `%${content}%`,
        },
      },
    });
    res.json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});

module.exports = router;
