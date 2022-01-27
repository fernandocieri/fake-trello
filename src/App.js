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
    Route,
    useParams
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

const boarDataContext = createContext({
    boardData: '',
    setBoardData: () => { },
});

const boarListContext = createContext({
    boardLists: '',
    setBoardLists: () => { },
});

const listCardsContext = createContext({
    listCards: '',
    setListCards: () => { },
});

export { listCardsContext, boarListContext,boarDataContext, credentialsContext, getApiData, organizationsContext };
export default function App() {
    //IMPORTANT
    //Routing is made here.    
    const [organizationsData, setOrganizationsData] = useState([]);   
    const [boardData, setBoardData] = useState([])    
     const[credentialsData, setCredentialsData] = useState({ key: '278ed1bfd74ea3d23445703059a2fd01', token: '4fc08ef1719c90b1a2576c8e260cc3190641b849c048a773ce35f55a6b394a51' })
    const[boardLists,setBoardLists]= useState([])
    const[listCards,setListCards]= useState([])
     useEffect(() => {         
        getApiData(setOrganizationsData, `https://api.trello.com/1/members/me/organizations?key=${credentialsData.key}&token=${credentialsData.token}`) 
             
      }, [])

      useEffect(() => {
        async function getInfo() {
            if (organizationsData[0] !== undefined) {
                let response = await axios.get(`https://api.trello.com/1/organizations/${organizationsData[0].id}/boards?key=${credentialsData.key}&token=${credentialsData.token}`)
                setBoardData([...response.data])         
            }        
        }
        getInfo()
    }, [organizationsData]);

    useEffect(() => {
        boardData.map((board) =>
        getApiData(
          setBoardLists,
          `https://api.trello.com/1/boards/${board.id}/lists?key=${credentialsData.key}&token=${credentialsData.token}`
        ))
        
      }, [boardData]);
   
      useEffect(() => {
        boardLists.map((card)=>
        getApiData(setListCards, `https://api.trello.com/1/lists/${card.id}/cards?key=${credentialsData.key}&token=${credentialsData.token}`)
        )        
      }, [])
    return (

        <Router>            
            <Navbar /> {/* This component has a "title" prop to change the title of the component */}
            <listCardsContext.Provider value={{listCards,setListCards}}>
            <boarListContext.Provider value={{ boardLists,setBoardLists }}>
            <boarDataContext.Provider value={{ boardData, setBoardData }}>            
            <credentialsContext.Provider value={{credentialsData, setCredentialsData}}>
            <organizationsContext.Provider value={{organizationsData}}>
                <Routes>
                    <Route path="/" element={<WorkspaceContainer />} />
                    <Route path="board/:id" element={<Board />} />
                </Routes>
                </organizationsContext.Provider>
                </credentialsContext.Provider>            
            </boarDataContext.Provider>
            </boarListContext.Provider>
            </listCardsContext.Provider>
        </Router>
    )
}