import * as React from "react";
import { Stack, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./list";

export default function Board() {
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">Prueba board name</div>
          <IconButton variant="outlined">
            <MoreVertIcon></MoreVertIcon>
          </IconButton>
        </section>

        <section className="boardLists">
          {/* mapear listas */}
          <ActivityList/>
        </section>
      </Stack>
    </Box>
  );
}
