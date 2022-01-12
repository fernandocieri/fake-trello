import * as React from "react";
import {
  CardActionArea,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { credentialsContext } from "./container";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionMenu from './actions';

export default function ActivityCard(props) {
  const credentials = useContext(credentialsContext);
  const [cardData, setCardData] = useState({...props.data});

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

          title={cardData.name}
          subheader={cardData.dateLastActivity}
        >

        </CardHeader>

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {cardData.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
