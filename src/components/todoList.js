import { Stack, Container } from "@mui/material";
import AddForm from "./addForm";
import TodoHeader from "./todoHeader";
import Tasks from "./tasks";
import { TaskContext } from "./contexts/taskContext";
import { useState } from "react";


export default function TodoList() {
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        title: "قراءة كتاب",
        details: "إنجاز قبل نهاية الشهر",
        isComplete: false,
      },
      {
        id: 2,
        title: "إنهاء كورس رياكت",
        details: "تعلم أساسيات رياكت",
        isComplete: false,
      },
      {
        id: 3,
        title: "فهم تفاصيل async و await",
        details: "دراسة البرمجة المتزامنة",
        isComplete: true,
      },
    ]
  );

  return(
    <>
      <Container maxWidth="sm">
        <Stack 
          direction="column"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }} 
          style={{
            background: "white",
            width: "375px"
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