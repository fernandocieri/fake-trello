import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ReactDOM from "react-dom";

export default function Board() {
  return (
    <Box>
      <Stack>
        <div className="boardTitle">Preba board name</div>
        <Button variant="outlined"><EditIcon></EditIcon></Button>
        <div className="boardLists">
          {/* mapear listas */}
        </div>
      </Stack>
    </Box>
  );
}
