const PostDetailed = (post) => {
//  console.log(post, " <=== post")
  if (!post) {
    return <div>Cargando...</div>;
  }
 
//   console.log(dateCreated, " <=== firstPost");
  return (
    <article className='flex flex-col items-center border border-pink-500 w-2/3 mt-6 p-3 rounded-md'>
      <h2 className='text-3xl font-extrabold '>{post.post?.title}</h2>
      <p className='mt-5 text-lg text-justify'>{post.post?.content}</p>
      <div className='flex gap-10'>
        <p>Creado por: {post.post?.author}</p>
        <p>{post.post?.createdAt.slice(0, 10)}</p>
      </div>
    </article>
  );
};

export default PostDetailed;
