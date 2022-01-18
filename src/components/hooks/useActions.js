import { useState } from 'react';
<<<<<<< HEAD
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
    return { open, selectedValue, handleClose, handleClickOpen };
=======
export default function UseActions(){
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
      {console.log(selectedValue)}
    };
    return{open, selectedValue, handleClose, handleClickOpen};
>>>>>>> a46e9e4619415e2a5f30d0c45e5c41a1b6ec55c3
}