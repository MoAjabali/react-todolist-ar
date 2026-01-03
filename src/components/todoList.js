import { Stack, Container } from "@mui/material";
import AddForm from "./addForm";
import TodoHeader from "./todoHeader";
import Tasks from "./tasks";
import { TaskContext } from "./contexts/taskContext";
import { useEffect, useState } from "react";


export default function TodoList() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) ?? []
  );

  useEffect(()=>{
    // if(localStorage.getItem('tasks'))
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])
  return(
    <>
      <Container maxWidth="md">
        <Stack 
          direction="column"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }} 
          style={{
            background: "white",
            width: "375px",
            margin: "4px",
            padding: "8px 4px",
            borderRadius: "8px",
          }}
        >
          <TaskContext.Provider value={{tasks, setTasks}}>
            <TodoHeader />
            <Tasks />
            <AddForm />
          </TaskContext.Provider>
        </Stack>
      </Container>
    </>
  );
}