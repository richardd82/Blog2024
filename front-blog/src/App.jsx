import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import NewPost from "./Pages/NewPost";
import PostDetails from "./Pages/PostDetails";
import NavBar from "./Components/NavBar";
import { Toaster } from "react-hot-toast";
import Filters from "./Components/Filters";


function App() {
  return (
    <>
    <Toaster />
    <NavBar />
    <Filters />
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='/newPost' exact element={ <NewPost />} />
        <Route path='/newPost/:id' exact element={ <NewPost />} />
        <Route path='/post/:id' element={ <PostDetails /> } />
      </Routes>
    </>
  );
}

export default App;
