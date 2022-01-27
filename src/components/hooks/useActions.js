import { useState } from 'react';
export default function UseActions() {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
<<<<<<< HEAD
        setSelectedValue(value);
=======
        setSelectedValue(value);            
>>>>>>> a5846905fd783d16e109f8b599a7f15ebee60b72
    };
    return { open, selectedValue, setSelectedValue, handleClose, handleClickOpen };
}