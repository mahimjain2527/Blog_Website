import React, { useEffect, useState } from "react";
// import axios from 'axios';
import Blogcard from "./Blogcard";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/api/blog")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };

  const sendRequest = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog");
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw err; 
    }
  };
  
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
      <Blogcard
            id={blog._id}
            isUser={localStorage.getItem("userId")===blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />))}
    </div>
  )
}

export default Blogs
