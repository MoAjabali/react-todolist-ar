const generateID = () => {
  return parseInt(Date.now() + Math.random().toString().slice(2, 6));
}

export function todoReducer(currentTodos, action) {
  const {type, payload} = {...action};
  const {todo} = payload;

  console.log(todo)

  switch (type) {
    case 'Create':
      if(todo.title.length < 2)
        throw new Error("عنوان المهمة لا يقل عن حرفين");
      return [
        ...currentTodos, {
          id: generateID(),
          title: todo.title,
          details: "",
          isComplete: false,
        }]
    case 'Update':
      const updatedtodo = currentTodos.map(task => 
        task.id === todo.id 
          ? { ...task, title: todo.newTitle, details: todo.newDetails }
          : task
      );
      return updatedtodo;
    case 'toggleCheck':
      const updatedTasks = currentTodos.map((value)=>{
        if (value.id === todo.id)
          value.isComplete = todo.isChecked;
        return value;
      })
      return updatedTasks;
    case 'Delete':
      return currentTodos.filter((t)=>t.id!==todo.id)
    default:
      throw new Error("اختر عملية صحيحة");
  }
}