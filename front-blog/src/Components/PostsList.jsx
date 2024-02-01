import { useEffect } from "react";
import useStore from "../Zustand/Store";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { posts, getAllPosts } = useStore();

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  if (!posts) return <h1>NO HAS CREADO NINGUN POST</h1>;
  // console.log("Todos los Posts ===> ", posts, " <=== Todos los Posts");

  return posts.map((post) => (
    <article key={post.id} className="flex flex-col items-center border border-pink-500 w-2/3 mt-6 p-3 rounded-md">
      <Link to={`/post/${post.id}`}>        
        <h2 className="text-3xl font-extrabold ">{post.title}</h2>
        <p className="mt-5 text-lg">{post.content}</p>
      </Link>
    </article>
  ));
};

export default PostsList;
