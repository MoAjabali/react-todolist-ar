import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export default function SnackbarAlert({msg, open, setOpen, type}){

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') 
      return;
    setOpen(false);
  };

  return(
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={type}
            variant="filled"
            sx={{ width: '100%', gap: "12px" }}
          >
            {msg}
          </Alert>
        </Snackbar>
    </>
  );
}