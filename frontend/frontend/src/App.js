import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlogs";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import React,{ useEffect } from "react";
function App() 
{
  const dispath=useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  return (
    <>
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
        { !isLoggedIn ?(
           
          <Route path="/auth" element={<Auth/>}/> 
        ) : (
          <>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/myBlogs" element={<UserBlogs/>}/>
          <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
          <Route path="/blogs/add" element={<AddBlog/>}/>
          </>
        ) }
        </Routes>

      </main>
    </>
  );
}

export default App;
