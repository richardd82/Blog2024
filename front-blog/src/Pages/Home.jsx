import PostsList from "../Components/PostsList"


const Home = () => {
  return (
    <div>
      <article className="flex flex-col mt-14 items-center">
        <PostsList />
      </article>
    </div>
  )
}

export default Home