import * as React from "react";
import { Stack, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActivityList from "./list";
import ActionMenu from './actions';

export default function Board() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(undefined);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <Box>
      <Stack>
        <section className="boardHeader">
          <div className="boardTitle">Prueba board name</div>
          <IconButton variant="outlined">
            <MoreVertIcon onClick={handleClickOpen} />
          </IconButton>
          <ActionMenu
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </section>

        <section className="boardLists">
          {/* mapear listas */}
          <ActivityList />
        </section>
      </Stack>
    </Box>
  );
}
