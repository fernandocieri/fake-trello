import * as React from 'react';
import axios from "axios";
import { Box, Container } from '@mui/material';
import { useState, useEffect, createContext, useContext } from "react";
import Navbar from './Navbar';
import WorkSpaceHeader from './WorkspaceHeader';
import WorkspaceMyboards from './WorkspaceMyboards';

const credentialsContext = createContext({ key: '278ed1bfd74ea3d23445703059a2fd01', token: '4fc08ef1719c90b1a2576c8e260cc3190641b849c048a773ce35f55a6b394a51' })

const organizationsContext = createContext([])
export { credentialsContext, organizationsContext}


export default function SimpleContainer() {
  const credentials = useContext(credentialsContext);
  const [organizations, setOrganizations] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState(0)

  // useEffect(async () => {
  //   const apiOrganizations = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${credentials.key}&token=${credentials.token}`);
  //   await setOrganizations([...apiOrganizations.data]);
  //    console.log([...apiOrganizations.data]);
  // }, []);

  useEffect(() => {
    async function getInfo() {
      let response = await axios.get(`https://api.trello.com/1/members/me/organizations?key=${credentials.key}&token=${credentials.token}`)
      setOrganizations([...response.data]);
    }
    getInfo()
   //getDataAPI(setOrganizations, `https://api.trello.com/1/members/me/organizations?key=${credentials.key}&token=${credentials.token}`)
  }, [])

  return (
    <Container className="main-Container" maxWidth="xl" >
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Navbar /> {/* This component has a "title" prop to change the title of the component */}
        {/* The component WorkSpace use "name props" to get the name of the WorkSpace depending on the login or name it has.
            At the momment, it has the value of "Nombre Provisional". 
            In the future will be developed the way it gets the value for "name". */}
        <organizationsContext.Provider value={organizations[currentOrganization]}>
          <WorkSpaceHeader />
          <WorkspaceMyboards /> {/* It has a prop "title" to change the title of this component */}
        </organizationsContext.Provider>
        {/* <Activityspecs/>  */}
      </Box>
    </Container>
  );
}
