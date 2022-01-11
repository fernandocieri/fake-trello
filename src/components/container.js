import * as React from 'react';
import {Box, Container} from '@mui/material';
import { useState, useEffect, useContext } from "react";

import Navbar from './navbar';
import WorkSpace from './workspace';
import Myboards from './myboards';
import Activityspecs from './Activityspecs';


export default function SimpleContainer() {
  const [organizations, setOrganizations] = useState('espaciodetrabajodeuser35293646');
  return (      
      <Container className="main-Container" maxWidth="xl" >
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Navbar/> {/* This component has a "title" prop to change the title of the component */}
            {/* The component WorkSpace use "name props" to get the name of the WorkSpace depending on the login or name it has.
            At the momment, it has the value of "Nombre Provisional". 
            In the future will be developed the way it gets the value for "name". */}
            <WorkSpace name='My Workspace'/>
            <Myboards name={organizations}/> {/* It has a prop "title" to change the title of this component */}
            {/* <Activityspecs/>  */}
        </Box>
      </Container>
    
  );
}
