import * as React from 'react';
import { Box } from '@mui/material';
import WorkSpaceHeader from './WorkspaceHeader';
import WorkspaceMyboards from './WorkspaceMyboards';

export default function SimpleContainer() {

  return (
    <Box sx={{ bgcolor: "#cfe8fc", height: "100vh", padding:"25px" }}>
      <WorkSpaceHeader />
      <WorkspaceMyboards />
    </Box>
  );

}
