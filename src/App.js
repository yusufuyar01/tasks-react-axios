import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList.js';
import { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [tasks, setTasks] = useState([]);
  const createTask = async (title,taskDesc) => {
    const response = await axios.post('http://localhost:3001/tasks',{
    title,
    taskDesc
    });
    console.log(response)
    const createdTasks = [...tasks,response.data];
    setTasks(createdTasks);
  };

  const fetchTask = async () =>{
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);
  }

  useEffect(() => {
    fetchTask();
  }, [])
  
  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) =>{
      return task.id !== id;
    })
    setTasks(afterDeletingTasks); 
  }
  const editTaskById = async (id,updatedTitle,updatedTaskDesc) => {
    await axios.put(`http://localhost:3001/tasks/${id}`,{
      title:updatedTitle,
      taskDesc:updatedTaskDesc
    });
    const afterUpdatingTasks = tasks.map((task) =>{
      if (task.id===id) { 
        return {id,title:updatedTitle,taskDesc:updatedTaskDesc};
      }
      return task;
    })
    setTasks(afterUpdatingTasks); 
  }
  
  return (
    <div className="App">
      <TaskCreate onCreate={createTask}/>
      <h1>Görevler</h1>
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById}/>
    </div>
  );
}

export default App;
