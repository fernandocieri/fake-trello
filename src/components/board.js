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
        <section className="boardHeader">
          Pureba board name
          <Button variant="outlined"><EditIcon></EditIcon></Button>
        </section>

        <section className="boardLists">
          {/* mapear listas */}
        </section>
      </Stack>
    </Box>
  );
}
