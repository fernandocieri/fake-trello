import * as React from "react";
import {
  CardActionArea,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionMenu from './actions';

export default function ActivityCard({ description = "Add a description" }) {
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
    <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
      <CardActionArea>
        <CardHeader
          action={
            <>
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleClickOpen} />
              </IconButton>
              <ActionMenu
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
              />
            </>
          }

          title={"Actividad 1: JoseMI project manager"}
          subheader={new Date().toLocaleString() + ""}
        >

        </CardHeader>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
