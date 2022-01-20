import { useState } from 'react';
export default function UseActions() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        { console.log(selectedValue) }
    };
    return { open, selectedValue, setSelectedValue, handleClose, handleClickOpen };
}