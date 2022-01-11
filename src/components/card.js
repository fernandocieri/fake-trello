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


export default function ActivityCard({ description = "Add a description" }) {
  return (
    
    <Card sx={{ maxWidth: 300, maxHeight: 200 }}>
    {/*IMPORTANTE
      Hay que reemplazar CardActionArea por un div clickable porque CardActionArea es un boton y no podemos meter IconButton dentro de
      otro boton.
     */}
      <CardActionArea>          
          <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          
          title={"Actividad 1: JoseMI project manager"}
          subheader={new Date().toLocaleString() + ""}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>          
      </CardActionArea>
    </Card>
  );
}
