import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"
const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({
   
  });
  const handlechange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await fetch(`http://localhost:5000/api/blog/${id}`)
      
        if (response.ok) {
          response = await response.json();

          setBlog(response.blog)
              setInputs({
                 title: response.blog.title,
                 description: response.blog.description,
               }); 
          
        }
        else {
          console.error("Error while fetching the data");
        }
      }
      catch (error) {
        console.error("Error Logging In:", error);
      }
    }
    fetchdata();
  }, [id]);





  // const sendRequest = async () => {
  //   const res = await axios
  //     .put(`http://localhost:5000/api/blog/update/${id}`, {
  //       title: inputs.title,
  //       description: inputs.description,
  //     })
  //     .catch((err) => console.log(err));

  //   const data = await res.data;
  //   return data;
  // };
  // console.log(blog);

  const sendRequest = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/blog/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: inputs.title,
          description: inputs.description,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  console.log(blog)

  const handlesubmit = (e) => {
    e.preventDefault()
    console.log(inputs)
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs/"));
  }
  return (
    <div>
      { inputs &&
       <form onSubmit={handlesubmit}>
        <Box border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}>
          <Typography fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}>
            Post your blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField name="title" onChange={handlechange} value={inputs.title} margin="auto" />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField name="description" onChange={handlechange} value={inputs.description} margin="auto" />
         
          <Button sx={{ mt: 2, borderRadius: 4 ,backgroundColor : "#0080bf" }}
            variant="contained"
            color="warning" type="submit">Submit</Button>
        </Box>
      </form>
}
    </div>
  )
}

export default BlogDetail