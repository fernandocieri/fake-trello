import { useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d39a249234130920bbef2a657895be3088f158c3
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
<<<<<<< HEAD
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
=======
>>>>>>> d39a249234130920bbef2a657895be3088f158c3
}