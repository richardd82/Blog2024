const Router = require("express");
const router = Router();
const { BlogData } = require("../db.js");

//Obtener todos los Posts
router.get("/allPosts", async(req, res) => {
    try {        
        let allPosts = [];
        allPosts = await BlogData.findAll({
          order: [['createdAt', 'DESC']],
        });        

        allPosts = allPosts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                author: post.author,
                content: post.content.length > 70 ? post.content.slice(0, 70) + "..." : post.content
            }
        }
        );

        res.status(200).json(allPosts);
    } catch (error) {
        console.error("AQUI EL ERROR ==>", error);
        res.status(500).json({ message: "Error al obtener los Posts" });
    }
});

//Crear un nuevo post
router.post("/newPost", async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const newPost = await BlogData.create({ title, author, content });
    res.json(newPost);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al crear el nuevo Post" });
  }
});

//Obtener un post por ID
router.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogData.findByPk(id);
    res.json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al obtener el Post" });
  }
});

//Actualizar un post por ID
router.put("/updatePost/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, content } = req.body;
    const post = await BlogData.findByPk(id);
    post.title = title;
    post.author = author;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (error) {
    console.error("AQUI EL ERROR ==>", error);
    res.status(500).json({ message: "Error al actualizar el Post" });
  }
});

module.exports = router;
