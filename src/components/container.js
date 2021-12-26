import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from "./navbar";
import WorkSpace from "./workspace";

export default function SimpleContainer() {
  return (
    <React.Fragment >
      <CssBaseline />
      <Container className="main-Container" maxWidth="xl" >
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Navbar/>
            <WorkSpace/>
        </Box>
      </Container>
    </React.Fragment>
  );
}
