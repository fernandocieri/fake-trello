import * as React from "react";
import { Stack, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./activityList";

export default function Board({ title="Board sin titulo"}) {
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">{title}</div>
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
