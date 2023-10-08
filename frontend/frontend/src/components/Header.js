import React from 'react';
import  { useState } from "react";
import {AppBar, Button, Toolbar, Typography,Tabs,Tab} from '@mui/material';
import { Box } from '@mui/system';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
// import { Tabs } from '@mui/base'

const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <div>
      
      <AppBar 
      position="sticky" 
      sx={{background:" linear-gradient(315deg, #e899dc 0%, #d387ab 74%)"}}>
        <Toolbar>
          <Typography variant='h4'>Blogger's Point</Typography>
         { isLoggedIn && ( <Box display='flex' marginLeft={"auto"} marginRight={'auto'}>
            <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
              <Tab  LinkComponent={Link} to="/blogs" label="All Blogs"/>
              <Tab LinkComponent={Link} to="/myblogs"  label="My Blogs"/>
              <Tab LinkComponent={Link} to="/blogs/add"  label="Add Blog"/>


            </Tabs>
          </Box>)}
         <Box display="flex" marginLeft='auto'>
           { !isLoggedIn && ( <> <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1,borderRadius:10, backgroundColor : "#0080bf"}}color="warning">Login</Button>
            <Button LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:10,backgroundColor : "#0080bf"}} color="warning">SignUp</Button>
            </>)}
           { isLoggedIn && (<Button onClick={() => dispath(authActions.logout())}
           LinkComponent={Link} to="/auth" variant='contained' sx={{margin:1, borderRadius:10,backgroundColor : "#0080bf"}} color="warning">LogOut</Button>)}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
