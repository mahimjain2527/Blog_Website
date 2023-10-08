import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${type}`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },
        body: JSON.stringify({
          name: inputs.name,
          email: inputs.email,
          password: inputs.password,
        }),
      });

    if (!response.ok) {
      throw new Error(`Request failed with status ${ response.status }`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};


const handleSubmit = (e) => {
  e.preventDefault();
  console.log(inputs);
  if (isSignup) {
    sendRequest("signup")
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => dispath(authActions.login()))
      .then(() => navigate("/blogs"));
  } else {
    sendRequest()
      .then((data) => localStorage.setItem("userId", data.user._id))
      .then(() => dispath(authActions.login()))
      .then(() => navigate("/blogs"));
  }
}
return (
  <div>
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={400}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        margin="auto"
        marginTop={5}
        borderRadius={5}
      >
        <Typography variant="h2" padding={3} textAlign="center">
          {isSignup ? "Signup" : "Login"}
        </Typography>
        {isSignup && (
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            placeholder="Name"
            margin="normal"
          />
        )}{" "}
        <TextField
          name="email"
          onChange={handleChange}
          value={inputs.email}
          type={"email"}
          placeholder="Email"
          margin="normal"
        />
        <TextField
          name="password"
          onChange={handleChange}
          value={inputs.password}
          type={"password"}
          placeholder="Password"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 ,   backgroundColor : "#0080bf"}}
          color="warning"
        >
          Submit
        </Button>
        <Button
          onClick={() => setIsSignup(!isSignup)}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Change To {isSignup ? "Login" : "Signup"}
        </Button>
      </Box>
    </form>
  </div>
);

}

export default Auth;