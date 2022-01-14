import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

const actions = ['change name', 'delete'];

export default function ActionMenu(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>List actions</DialogTitle>
            <List sx={{ pt: 0 }}>
                {actions.map((action) => (
                    <ListItem button onClick={() => handleListItemClick(action)} key={action}>
                        <ListItemText primary={action} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

ActionMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

