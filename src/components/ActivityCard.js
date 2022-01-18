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
import { credentialsContext } from "./WorkspaceContainer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ActionMenu from './Actions';
import useActions from './hooks/useActions'

export default function ActivityCard(props) {
  const credentials = useContext(credentialsContext);
  const [cardData, setCardData] = useState({ ...props.data });
  const { open, selectedValue, handleClose, handleClickOpen } = useActions();

  return (
    <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
      <div className="card-action-area">
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
      </div>
    </Card>
  );
}