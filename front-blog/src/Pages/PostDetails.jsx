import { useEffect, useState } from "react";
import PostDetailed from "../Components/PostDetailed";
import useStore from "../Zustand/Store";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const PostDetails = () => {
  const { id } = useParams();
  const getPostById = useStore((state) => state.getPostById);
  const deletePost = useStore((state) => state.deletePost);
  const { filter, search } = useStore();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  // console.log('Filters Store===>', filter, search)

  const typeFilter =
    filter === "byTitle"
      ? "title"
      : filter === "byAuthor"
      ? "author"
      : filter === "byContent"
      ? "content"
      : "";

  const handleBack = () => {
    navigate({ state: { filter, search, typeFilter } });
  };

  const handleEdit = (id) => {
    navigate(`/newPost/${id}`);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(id);
        navigate("/");
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });
  };
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
      <article className='flex flex-col mt-14 items-center'>
        <section className='flex flex-row w-2/3 justify-between text-xl'>
          <button onClick={() => handleEdit(id)}>Edit ✏️</button>
          <button onClick={() => handleDelete(id)}>Delete ♻️</button>
        </section>
        <PostDetailed post={post} />
      </article>
      <div className='text-5xl mt-5'>
        {filter && search ? (
          <Link to='/' onClick={handleBack}>
            🔙
          </Link>
        ) : (
          <Link to='/'>🔙</Link>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
