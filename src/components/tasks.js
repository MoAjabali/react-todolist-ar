import { ToggleButtonGroup, ToggleButton, Box, Paper, Grid, Typography, IconButton, Checkbox } from "@mui/material";
import { pink } from "@mui/material/colors";
import { Delete, Edit, CheckCircle } from "@mui/icons-material";
import { CheckCircleOutline } from "@mui/icons-material";
import { useContext, useState } from "react";
import { TaskContext } from "./contexts/taskContext";
import ConfirmDeleteDialog from "./confirmDeleteDialog";
import SnackbarAlert from "./muic/snackbarAlert";
import EditTaskDialog from "./EditTaskDialog";

export default function Tasks() {
  const {tasks, setTasks} = useContext(TaskContext);
  const [taskType, setTaskType] = useState('all');
  const [delOpen, setDelOpen] = useState(false);
  const [taskToDel, setTaskToDel] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const handelDelete = ()=>{
    setTasks((prev)=> prev.filter((t)=>t.id!==taskToDel.id));
    setTaskToDel(null);
    setDelOpen(false);
    setPopupOpen(true);
  };

  const filteredTask = tasks.filter((value)=>{
    return taskType==='all' ? true : (taskType==="complete"? value.isComplete : !value.isComplete)
  });
  const [editOpen, setEditOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [editSuccessOpen, setEditSuccessOpen] = useState(false);

  const handleEditOpen = (task) => {
    setTaskToEdit(task);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setTaskToEdit(null);
  };

  const handleEditSave = (newTitle, newDetails) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskToEdit.id 
        ? { ...task, title: newTitle, details: newDetails }
        : task
    );
    setTasks(updatedTasks);
    setEditOpen(false);
    setTaskToEdit(null);
    setEditSuccessOpen(true);
    
  };

  const todoTasks = filteredTask.map((task) => (
    <Paper
      key={task.id}
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        backgroundColor: 'white',
        width: "80%"
      }}
    >
      <Grid container alignItems="center" wrap="no-warp" justifyContent="space-between">
        <Grid item xs={9}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.details}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Checkbox
              checked={task.isComplete}
              onChange={(event, isChecked)=>{
                
                const updatedTasks = [...tasks];
                // updatedTasks[index] = {
                //   ...updatedTasks[index],
                //   isComplete: event.target.checked
                // };
                updatedTasks.map((value)=>{
                  if (value.id === task.id)
                    value.isComplete = isChecked;
                  return value;
                })
                setTasks(updatedTasks);
              }}
              icon={<CheckCircleOutline/>}
              checkedIcon={<CheckCircle/>}
              color="success"
            />
            <IconButton 
              aria-label="edit" 
              size="large"
              onClick={() => handleEditOpen(task)}
            >
              <Edit />
            </IconButton>
            <IconButton aria-label="delete" onClick={()=>{
              setDelOpen(true); 
              setTaskToDel(task);
            }} 
              size="large"
            >
              <Delete sx={{ color: pink[500] }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  ));
  console.log(filteredTask);
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={taskType}
        exclusive
        onChange={(event, newTaskValue)=>setTaskType(newTaskValue)}
        aria-label="Task type"
        size="small"
        style={{direction: "ltr"}}
      >
        <ToggleButton value="complete" aria-label='complete type'>منجز</ToggleButton>
        <ToggleButton value="uncomplete" aria-label='uncomplete type'>غير مجنز</ToggleButton>
        <ToggleButton value="all" aria-label='All'>الكل</ToggleButton>
      </ToggleButtonGroup>
      {todoTasks}
      <ConfirmDeleteDialog open={delOpen} onClose={()=>{setDelOpen(false); setTaskToDel(null);}} onConfirm={handelDelete} />
      <SnackbarAlert msg="تم الحذف بنجاح" open={popupOpen} setOpen={setPopupOpen} type="success"/>
      <EditTaskDialog 
        open={editOpen}
        onClose={handleEditClose}
        task={taskToEdit}
        onSave={handleEditSave}
      />
      <SnackbarAlert 
        msg="تم تعديل المهمة بنجاح"
        open={editSuccessOpen}
        setOpen={setEditSuccessOpen}
        type="success"
      />
    </>
  );
}
