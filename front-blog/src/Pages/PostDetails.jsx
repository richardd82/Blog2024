import { useEffect, useState } from "react";
import PostDetailed from "../Components/PostDetailed";
import useStore from "../Zustand/Store";
import useStoreFilters from "../Zustand/StoreFilters";
import { Link, useNavigate, useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const getPostById = useStore((state) => state.getPostById);
  const { filter, search } = useStoreFilters();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
// console.log('Filters Store===>', filter, search)
  
  const typeFilter = filter === "byTitle" ? "title" : filter === "byAuthor" ? "author" : filter === "byContent" ? "content" : "";

  const handleBack = () => {
    navigate({state:{filter, search, typeFilter}})
  }

  // console.log('ID===>', id)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postId = await getPostById(id);
        setPost(postId);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [getPostById, id]);

  // console.log('Aqui postID', post)

  return (
    <div>
      <article className="flex flex-col mt-14 items-center">
        <PostDetailed post={post} />
      </article>
      <div className="text-5xl mt-5">{
        filter && search ?
        <Link to="/" onClick={handleBack} >🔙</Link> :
        <Link to="/" >🔙</Link>
        }
      </div>
    </div>
  );
};

export default PostDetails;
//{`/filters/${filter}?${typeFilter}=${search}`}