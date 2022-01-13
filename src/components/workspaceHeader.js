import * as React from "react";
import Button from "@mui/material/Button";

export default function WorkSpace({name = "Provisional Workspace Name"}){
    return(
        <div className="workSpace">
        <div>{name}</div>
        {/* Now, button has a prop called "onClick", as the attribute, to pass a function that will work 
        in the same way as if you call the event straigth from a button tag. */}
        <Button variant="contained" className="editButton">Edit</Button>    
        </div>
    );
}