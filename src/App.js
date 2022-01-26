import * as React from 'react';
import WorkspaceContainer from './components/WorkspaceContainer'
import Navbar from './components/Navbar'
import Activityspecs from './components/Activityspecs'
import Board from './components/Board'
import { useState, useEffect, createContext, useContext } from "react";
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
async function getApiData(set, url) {
    let response = await axios.get(url)
    set([...response.data]);
  }  

const credentialsContext = createContext({
    credentialsData: '',
    setCredentialsData: () => { },
});
const organizationsContext = createContext({
    organizationsData: '',
    setOrganizationsData: () => { },
});

const dataContext = createContext({
    renderData: '',
    setRenderData: () => { },
});

export { dataContext, credentialsContext, getApiData, organizationsContext };
export default function App() {
    //IMPORTANT
    //Routing is made here.    
    const [organizationsData, setOrganizationsData] = useState([]);
    const [currentOrganization, setCurrentOrganization] = useState(0);
    const [renderData, setRenderData] = useState('hey');
    const [renderPrueba, setPrueba] = useState("prueba")
     const[credentialsData, setCredentialsData] = useState({ key: '278ed1bfd74ea3d23445703059a2fd01', token: '278ed1bfd74ea3d23445703059a2fd01' })
     useEffect(() => {
         console.log(credentialsData.key);
        getApiData(setOrganizationsData, `https://api.trello.com/1/members/me/organizations?key=278ed1bfd74ea3d23445703059a2fd01&token=278ed1bfd74ea3d23445703059a2fd01`)
      
      }, [])
  
    return (

        <Router>
            <Navbar /> {/* This component has a "title" prop to change the title of the component */}

            <dataContext.Provider value={{ renderData, setRenderData }}>            
            <credentialsContext.Provider value={{credentialsData, setCredentialsData}}>
            <organizationsContext.Provider value={organizationsData[currentOrganization]}>
                <Routes>
                    <Route path="/" element={<WorkspaceContainer />} />
                    <Route path="board/:id" element={<Board />} />
                </Routes>
                </organizationsContext.Provider>
                </credentialsContext.Provider>            
            </dataContext.Provider>
        </Router>
    )
}