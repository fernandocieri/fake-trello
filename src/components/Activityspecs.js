import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReactDOM from "react-dom";

export default function Activityspecs() {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <div>
        <Button variant="outlined">Save</Button>
      </div>

      <div className="main">
        <Stack className="left-flex-container">
          <TextField id="title" label="Title" variant="outlined" />
          <TextField id="description" label="Description" variant="outlined" multiline maxRows={3}/>
          <TextField id="comments" label="Comments" variant="outlined" />
        </Stack>

        <div>
          <TextField
            multiline
            maxRows={5}
            id="activitySpecs"
            label="Activity Specs"
            variant="outlined"
          />
        </div>
      </div>

      <div>
        <Button variant="outlined">Delete</Button>
      </div>
    </Box>
  );
}

