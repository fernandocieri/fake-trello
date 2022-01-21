import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Grid from '@mui/material/Grid';
import { useState, useEffect, useContext } from "react";

export default function Activityspecs(props) {
  const [cardData, setCardData] = useState({ ...props.data });
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="on"
    >
      <Stack className="left-flex-container">
        <TextField id="name" label="name" variant="outlined" defaultValue={cardData.name} />
        <TextField id="description" label="description" variant="outlined" multiline rows={5} defaultValue={cardData.desc} />
        <TextField id="comments" label="Comments" variant="outlined" />
      </Stack>

      <div className="extra-info">
        <Grid item xs={3}>
          <AccessTimeFilledIcon fontSize="small" sx={{ color: '#1A5F7A' }} />
          {cardData.dateLastActivity}
        </Grid>
      </div>

      <div className='button-section'>
        <Button variant="outlined"><DeleteIcon fontSize="small" sx={{ color: '#1A5F7A' }} />Delete</Button>
        <Button variant="outlined"><CheckCircleIcon fontSize='small' sx={{ color: '#1A5F7A' }} />Save</Button>
      </div>
    </Box >
  );
}

