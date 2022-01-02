import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from './navbar';
import WorkSpace from './workspace';
import Myboards from './myboards';
import Activityspecs from './Activityspecs';
import List from './list'
import Board from './board'

export default function SimpleContainer() {
  return (      
      <Container className="main-Container" maxWidth="xl" >
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Navbar/> {/* This component has a "title" prop to change the title of the component */}
            {/* The component WorkSpace use "name props" to get the name of the WorkSpace depending on the login or name it has.
            At the momment, it has the value of "Nombre Provisional". 
            In the future will be developed the way it gets the value for "name". */}
            <WorkSpace name="Nombre Provisional"/>
            <Myboards/> {/* It has a prop "title" to change the title of this component */}
            <Activityspecs/>
            <List/> 
            <Board/>           
        </Box>
      </Container>
    
  );
}
