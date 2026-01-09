import { Stack, TextField, Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { TaskContext } from './contexts/taskContext';
import SnackbarAlert from './muic/snackbarAlert';


export default function AddForm(){
  const  { dispatch}= useContext(TaskContext);
  const [taskTitle, setTaskTitle] = useState("");

  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [catchedError, setCatchedError] = useState("");

  

  const handleClick = (event)=>{
    try {
      dispatch({type: "Create", payload: { todo: {title: taskTitle} }})
      setTaskTitle("");
      setOpen(true);
    } catch (error) {
      setCatchedError(error.message)
      setErrorOpen(true);
    }
  };
  return(
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            sx={{
              '& .MuiInputBase-input': {
                textAlign: 'right',
                direction: 'rtl',
              },
              '& .MuiInputLabel-root': {
                transformOrigin: 'top right',
                left: 'auto',
                right: 26,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                textAlign: 'right',
              }
            }}
            id="outlined-basic" 
            size='small' 
            label="عنوان المهمة" 
            variant="outlined"  
            value={taskTitle} 
            onChange={(event) => {setTaskTitle(event.target.value)}}
          />
        </Box>
        <Button onClick={handleClick}  variant="contained" size='medium' color="success">إضافة</Button>
        
        <SnackbarAlert msg='تمت الاضافة بنجاح' open={open} setOpen={setOpen} type="success"/>
        <SnackbarAlert msg={catchedError} open={errorOpen} setOpen={setErrorOpen} type="error"/>
      </Stack>
    </>
  );
}