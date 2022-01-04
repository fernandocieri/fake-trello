import * as React from "react";
import Button from "@mui/material/Button";

export default function WorkSpace({name}){
    return(
        <div className="workSpace">
        <h5>{name}</h5>
        {/* Now, button has a prop called "onClick", as the attribute, to pass a function that will work 
        in the same way as if you call the event straigth from a button tag. */}
        <Button variant="contained" className="editButton">Edit</Button>    
        </div>
    );
}