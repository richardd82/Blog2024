import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useStore from "../Zustand/Store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

const CreatePost = () => {
  const params = useParams();
  const { createNewPost, updatePost, statusResponse, setResults, setStatusResponse } = useStore();
  const [post, setPost] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const getPostById = useStore((state) => state.getPostById);
  const navigate = useNavigate();
  console.log(statusResponse, " <=== statusResponseBeforeOnSubmit");

  // console.log(post)

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updatePost(params.id, data);
    } else {
      createNewPost(data);
      toast.success("Post updated successfully");
      navigate(`/`);
    }
  });

   // Función para manejar la respuesta de updatePost
   const handleUpdateResponse = () => {
    if (statusResponse === "OK") {
      toast.success("Post updated successfully");
      setStatusResponse()
      navigate(`/`);
    } else {
      toast.error("Error updating post");
    }
  };

  // useEffect(() => {
  //   // Llamar a la función de manejo de la respuesta de updatePost
    
  // }, [statusResponse, params.id, navigate, setResults]);
  useEffect(() => {
    if (params.id) {
      const fetchPost = async () => {
        try {
          const postId = await getPostById(params.id);
          setPost(postId);
          setValue("author", postId.author);
          setValue("title", postId.title);
          setValue("content", postId.content);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      };

      fetchPost();
      if (statusResponse) {
        handleUpdateResponse();
      }
    }
  }, [getPostById, params.id, statusResponse, params.id, navigate, setResults]);

  return (
    <div className='flex justify-center items-center h-[calc(80vh-1rem)] w-full'>
      <form
        onSubmit={onSubmit}
        className='border border-pink-500 rounded-md bg-transparent p-10 w-2/3'
      >
        <header className='flex justify-between'>
          <h1 className='font-bold text-3xl m-auto'>
            {!params.id ? "Create new Post" : "Edit Post"}
          </h1>
        </header>
        <input
          placeholder='Write your name'
          {...register("author", { required: true })}
          className='bg-gray-800 border-2 rounded-lg mt-10 py-4 px-4  focus:outline-none w-full'
        />
        {errors.title && (
          <span className='block text-red-400 mb-2'>
            This field is required
          </span>
        )}
        <input
          placeholder='Write a title'
          {...register("title", { required: true })}
          className='bg-gray-800 border-2 rounded-lg my-10 mb-8 py-4 px-4  focus:outline-none w-full'
        />
        {errors.title && (
          <span className='block text-red-400 mb-2'>
            This field is required
          </span>
        )}
        <textarea
          placeholder='Write a description'
          {...register("content", { required: true })}
          className='bg-gray-800 border-2 rounded-lg  mb-6 py-4 px-4 h-[150px]  focus:outline-none w-full'
        ></textarea>
        {errors.description && (
          <span className='block text-red-400 mb-2'>
            This field is required
          </span>
        )}
        <button
          type='submit'
          className='font-bold text-white bg-pink-800 hover:bg-purple-600 px-14 py-4 rounded '
        >
          {!params.id ? "Save" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
