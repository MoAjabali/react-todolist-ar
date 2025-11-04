import { Stack, TextField, Box, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { TaskContext } from './contexts/taskContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import SnackbarAlert from './muic/snackbarAlert';


export default function AddForm(){
  const  {tasks, setTasks}= useContext(TaskContext);
  const [taskTitle, setTaskTitle] = useState("");

  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [catchedError, setCatchedError] = useState("");
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') 
  //     return;
  //   setOpen(false);
  //   setErrorOpen(false);
  // };
  const handleClick = (event)=>{
    try {
      if(taskTitle.length < 2)
        throw new Error("عنوان المهمة لا يقل عن حرفين");
      setTasks([
        ...tasks, {
          id: tasks.length+1,
          title: taskTitle,
          details: "",
          isComplete: false,
        }])
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
            inputProps={{dir: "rtl", style:{textAlign: 'right'}}}
            InputLabelProps={{style: {right: 24, left: "auto"}}}
            id="outlined-basic" size='small' label="عنوان المهمة" variant="outlined"  value={taskTitle} onChange={(event)=>{setTaskTitle(event.target.value)}}/>
        </Box>
        <Button onClick={handleClick}  variant="contained" size='medium' color="success">إضافة</Button>
        
        <SnackbarAlert msg='تمت الاضافة بنجاح' open={open} setOpen={setOpen} type="success"/>
        <SnackbarAlert msg={catchedError} open={errorOpen} setOpen={setErrorOpen} type="error"/>
      </Stack>
    </>
  );
}