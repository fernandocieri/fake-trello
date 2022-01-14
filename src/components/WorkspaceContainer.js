import * as React from 'react';
import {Box} from '@mui/material';
import WorkSpaceHeader from './WorkspaceHeader';
import WorkspaceMyboards from './WorkspaceMyboards';


export default function SimpleContainer() {
  
  return (         
        <Box sx={{ bgcolor: '#cfe8fc', height: '90vh'}}>            
            {/* The component WorkSpace use "name props" to get the name of the WorkSpace depending on the login or name it has.
            At the momment, it has the value of "Nombre Provisional". 
            In the future will be developed the way it gets the value for "name". */}
            <WorkSpaceHeader/> {/* It has a prop "title" to change the title of this component */}  
            <WorkspaceMyboards/> {/* It has a prop "title" to change the title of this component */}                        
        </Box> 
  );
}
