import * as React from 'react';
import axios from "axios";
import { Box } from '@mui/material';
import { useState, useEffect, createContext, useContext } from "react";
import NavbarDrawer from './NavbarDrawer';
import WorkSpaceHeader from './WorkspaceHeader';
import WorkspaceMyboards from './WorkspaceMyboards';
import {
  ListItem,
  List,
  Button,
  ListSubheader,
  Typography,
} from "@mui/material";
import {getApiData, credentialsContext, organizationsContext} from '../App'




//check if this funtion can be fit into a custom hook;



export default function SimpleContainer() {

  const {organizationsData} = useContext(organizationsContext);
  
  return (
    <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
      {/* The component WorkSpace use "name props" to get the name of the WorkSpace depending on the login or name it has.
            At the momment, it has the value of "Nombre Provisional". 
            In the future will be developed the way it gets the value for "name". */}
      
        <WorkSpaceHeader />
        <WorkspaceMyboards />{" "}
        {/* It has a prop "title" to change the title of this component */}
         
    </Box>
  );

}
