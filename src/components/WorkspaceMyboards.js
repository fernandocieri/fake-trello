import * as React from "react";
import { useContext } from "react";
import axios from "axios";
import { credentialsContext, boarDataContext } from "../App";
import useAddButton from "./hooks/useAddButton";
import BoardPreview from './BoardPreview';

export default function Myboards() {
    const { credentialsData } = useContext(credentialsContext);
    const { boardData, setBoardData } = useContext(boarDataContext);
    const { renderAdd, inputState } = useAddButton();

    async function handleNewElement() {
        let postResponse = await axios.post(
            `${process.env.REACT_APP_HTTPS}boards/?name=${inputState}&key=${credentialsData.key}&token=${credentialsData.token}`
        );
        setBoardData([...boardData, postResponse.data]);
    }


    return (
       
        <section className="myboards-section">
            <div className="myboards-title">My Boards</div>
            <div className="allboards">
                {boardData.map((board) => <BoardPreview data={board} icons={true} className={'BoardPreview-MyBoards'}/>)}
                {renderAdd("Accept", "+ Add Board", handleNewElement)}
            </div>
        </section>
    );
} 
