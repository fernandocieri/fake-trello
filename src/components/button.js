import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons(props) {
  return (
    <Stack spacing={2} direction="row">      
      <Button variant="contained" className="editButton" onClick={props.onClick} >{props.value}</Button>      
    </Stack>
  );
}
