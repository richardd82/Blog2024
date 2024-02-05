import { useEffect } from "react";
import useStore from "../Zustand/Store";
import useStoreFilters from "../Zustand/StoreFilters";
import { Link, useNavigate } from "react-router-dom";

const PostsList = () => {
  const { posts, getAllPosts, filterPostsByAuthor, filterPostsByContent, filterPostsByTitle } = useStore();
  const { filter, search, setResults } = useStoreFilters();
  const navigate = useNavigate();

// console.log('PostsList Store===>', filter, search)

const handleClick = () => {
  navigate({state:{filter, search}})
  // console.log('POST ID===>', postId)
}

  useEffect(() => {
    //si venimos de un post filtrado, al regresar al home, se mantienen los resultados del filtro
    if (filter && search) {
      let newResults = [];
      switch (filter) {
        case "byTitle":
          newResults = filterPostsByTitle(search);
          break;
        case "byAuthor":
          newResults = filterPostsByAuthor(search);
          break;
        case "byContent":
          newResults = filterPostsByContent(search);
          break;
        default:
          break;
      }
      setResults(newResults);
    }
    //Si no hay filtro, se muestran todos los posts
    getAllPosts();
  }, [getAllPosts, filter, filterPostsByAuthor, filterPostsByContent, filterPostsByTitle, search, setResults]);

  if (!posts) return <h1>NO HAS CREADO NINGUN POST</h1>;
  // console.log("Todos los Posts ===> ", posts, " <=== Todos los Posts");

  return posts.map((post) => (
    <article key={post.id} className="flex flex-col items-center border border-pink-500 w-2/3 mt-6 p-3 rounded-md">
      <Link to={`/post/${post.id}`} onClick={handleClick}>        
        <h2 className="text-3xl font-extrabold ">{post.title}</h2>
        <p className="mt-5 text-lg">{post.content}</p>
      </Link>
    </article>
  ));
};

export default PostsList;
