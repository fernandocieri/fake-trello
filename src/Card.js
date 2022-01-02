import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function Card() {
  return (
    <Stack spacing={2}>
      <div>
        <Button variant="outlined">Save</Button>
      </div>
      <div className="main">
        <div className="left-flex-container">
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Comments" />
        </div>
        <div>
            <input type="text" placeholder="Activity Specifications" />
        </div>
      </div>
      <div>
        <Button>Delete</Button>
      </div>
    </Stack>
  );
}

ReactDOM.render( <Card />,
  document.getElementById('root')
);
