import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export function Card() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Button variant="outlined">Save</Button>
      </div>

      <Stack className="main">
        <div className="left-flex-container">
          <TextField id="title" label="Title" variant="outlined" />
          <TextField id="description" label="Description" variant="outlined" />
          <TextField id="comments" label="Comments" variant="outlined" />
        </div>
        
        <div>
          <TextField
            id="activitySpecs"
            label="Acivity Specs"
            variant="outlined"
          />
        </div>
      </Stack>

      <div>
        <Button>Delete</Button>
      </div>
    </Box>
  );
}

ReactDOM.render(<Card />, document.getElementById("root"));
