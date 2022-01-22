import * as React from 'react';
import WorkspaceContainer from './components/WorkspaceContainer'
import Navbar from './components/Navbar'
import Activityspecs from './components/Activityspecs'
import Board from './components/Board'
import NavbarDrawer from './components/NavbarDrawer'
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";
export default function App(){
    //IMPORTANT
    //Routing is made here.
    
    return(               
        <Router>
            <Navbar/> {/* This component has a "title" prop to change the title of the component */}            
            <Routes>
                <Route path="/" element={<WorkspaceContainer/>}/>
                <Route path="activityspecs" element={<Activityspecs/>}/>
                <Route path="board" element={<Board/>}/>                 
            </Routes>
        </Router>        
    )
}