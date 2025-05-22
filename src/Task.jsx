import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";


import "./App.css"

const Task = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState(1);

 
  const tasksRef = collection(db, "users", user.uid, "tasks");

  const getTasks = async () => {
    const data = await getDocs(tasksRef);
    setTasks(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await addDoc(tasksRef, {
      title,
      description,
      dueDate,
      dueTime,
      priority: Number(priority),
    });
    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setPriority(1);
    getTasks();
  };

  const deleteTask = async (taskId) => {
    const taskDoc = doc(db, "users", user.uid, "tasks", taskId);
    await deleteDoc(taskDoc);
    getTasks();
  };

  const increasePriority = async (taskId, currentPriority) => {
    const taskDoc = doc(db, "users", user.uid, "tasks", taskId);
    await updateDoc(taskDoc, {
      priority: currentPriority + 1,
    });
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h3>Add Task</h3>
      <input className="title"value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" /><br />
      
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} /><br />
      <input type="number" value={priority} onChange={(e) => setPriority(e.target.value)} placeholder="Priority" /><br />
      <textarea className="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task description" /><br />
      <button className="add--task" onClick={addTask}>Add</button>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task--list">
            <div className="task--description">
                <h2>{task.title}</h2>
            {task.description}<br />
            Due: {task.dueDate} at {task.dueTime}<br />
            
            </div>
            <div className="task--priority">
                Priority: {task.priority}{" "}
                <button className="task--button" onClick={() => increasePriority(task.id, task.priority || 1) }>⬆️</button><br />
            </div>
            
            <div className="task--delete">
                <button onClick={() => deleteTask(task.id)}>❌ Delete</button>
            </div>
            
            <hr />
            
            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
