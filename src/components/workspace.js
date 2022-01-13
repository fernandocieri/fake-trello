import * as React from "react";
import Button from "@mui/material/Button";
import { organizationsContext } from "./container";
import { useState, useEffect, useContext } from "react";

export default function WorkSpace(){
    const organizations = useContext(organizationsContext);
    return(
        <div className="workSpace">
        <h5>{organizations[0].displayName}</h5>
        {/* Now, button has a prop called "onClick", as the attribute, to pass a function that will work 
        in the same way as if you call the event straigth from a button tag. */}
        <Button variant="contained" className="editButton">Edit</Button>   
        </div>
    );
}