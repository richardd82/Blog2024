const Router = require("express");
const router = Router();
const { Op } = require('sequelize');
const { BlogData } = require("../db.js");

//Filtrar post por titulo
router.get("/byTitle", async (req, res) => {
  try {
    const { title } = req.query;
    let post = [];
    post = await BlogData.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    post = post.map((post) => {
      return {
        id: post.id,
        title: post.title,
        author: post.author,
        content: post.content.length > 70 ? post.content.slice(0, 70) + "..." : post.content
    }
    });
    res.status(200).json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});
router.get("/byAuthor", async (req, res) => {
  try {
    const { author } = req.query;
    let post = [];
    post = await BlogData.findAll({
      where: {
        author: {
          [Op.like]: `%${author}%`,
        },
      },
    });
    post = post.map((post) => {
      return {
        id: post.id,
        title: post.title,
        author: post.author,
        content: post.content.length > 70 ? post.content.slice(0, 70) + "..." : post.content
    }
    });
    res.status(200).json(post);    
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});
router.get("/byContent", async (req, res) => {
  try {
    const { content } = req.query;
    let post =[]
    post = await BlogData.findAll({
      where: {
        content: {
          [Op.like]: `%${content}%`,
        },
      },
    });
    post = post.map((post) => {
      return {
        id: post.id,
        title: post.title,
        author: post.author,
        content: post.content.length > 70 ? post.content.slice(0, 70) + "..." : post.content
    }
    });
    res.status(200).json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});

module.exports = router;
