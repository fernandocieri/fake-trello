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
async function getApiData(set, url, state) {
    let response = await axios.get(url)
    set([...response.data]);
}
async function getApiDataPersonal(set, url, state) {
    let response = await axios.get(url)

    set([state, ...response.data]);
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

export { listCardsContext, boarListContext, boarDataContext, credentialsContext, getApiData, organizationsContext };
export default function App() {
    //IMPORTANT
    //Routing is made here.    
    const [organizationsData, setOrganizationsData] = useState([]);
    const [boardData, setBoardData] = useState([])
    const [credentialsData, setCredentialsData] = useState({ key: '278ed1bfd74ea3d23445703059a2fd01', token: '4fc08ef1719c90b1a2576c8e260cc3190641b849c048a773ce35f55a6b394a51' })
    const [boardLists, setBoardLists] = useState([])
    const [listCards, setListCards] = useState([])
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
        async function getInfo() {
            let lists = []
            for (let i = 0; i < boardData.length; i++) {
                if (boardData !== undefined) {
                    let response = await axios.get(`https://api.trello.com/1/boards/${boardData[i].id}/lists?key=${credentialsData.key}&token=${credentialsData.token}`);
                    lists = [...lists, ...response.data];
                }
            }
            setBoardLists([...lists]);
        }
        getInfo()
    }, [boardData]);

    useEffect(() => {
        async function getInfo() {
            let cards = []
            for (let i = 0; i < boardLists.length; i++) {
                if (boardLists !== undefined) {
                    let response = await axios.get(`https://api.trello.com/1/lists/${boardLists[i].id}/cards?key=${credentialsData.key}&token=${credentialsData.token}`);
                    cards = [...cards, ...response.data];
                }
            }
            setListCards([...cards]);
        }
        getInfo()
    }, [boardLists]);

    return (

        <Router>
            <credentialsContext.Provider value={{ credentialsData, setCredentialsData }}>
                <listCardsContext.Provider value={{ listCards, setListCards }}>
                    <boarListContext.Provider value={{ boardLists, setBoardLists }}>
                        <boarDataContext.Provider value={{ boardData, setBoardData }}>
                            <organizationsContext.Provider value={{ organizationsData }}>
                                <Navbar /> {/* This component has a "title" prop to change the title of the component */}
                                <Routes>
                                    <Route path="/" element={<WorkspaceContainer />} />
                                    <Route path="board/:id" element={<Board />} />
                                </Routes>
                            </organizationsContext.Provider>
                        </boarDataContext.Provider>
                    </boarListContext.Provider>
                </listCardsContext.Provider>
            </credentialsContext.Provider>
        </Router>
    )
}