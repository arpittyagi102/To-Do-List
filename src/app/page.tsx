"use client";
import Item from "./component/Item";
import { useEffect, useState } from "react";

interface Task {
  _id: string|number;
  title: string;
  description?: string;
  marked: boolean;
  dueDate: string | null;
}

export default function Home() {
  const [tasks, setTasks] = useState<any>(null);         // list of tasks

  const [newTask, setNewTask] = useState("");             // input value for new task
  const [isNewTaskActive, setIsNewTaskActive] = useState(false); // state to toggle new task input

  const [dueDateInput, setDueDateInput] = useState("");   // input value for due date

  const [descriptionInput, setDescriptionInput] = useState(""); // input value for description

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(window.location.origin + "/api/tasks");
      const data = await response.json();
      setTasks(data);
    }
    fetchTasks();
  },[]);

  async function handleKeyDown(event: any) {
      if (event.key === "Enter") {
          // making changes locally
          setTasks([...tasks, { _id: tasks.length + 1, title: newTask, description: descriptionInput, marked: false, dueDate: dueDateInput }]);
          
          // making changes on the server
          fetch(window.location.origin + "/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: newTask, description: descriptionInput, marked: false, dueDate: "" })
          });
          setNewTask("");
          setDescriptionInput("");
          setIsNewTaskActive(false);
      }
  }
  
  async function deleteTask(id: string|number) {
    // making changes locally
    setTasks(tasks.filter((task:any) => task._id !== id));

    // making changes on the server
    await fetch(window.location.origin + "/api/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: id })
    });
  }

  return (
    <main className="bg-gray-800 min-h-screen w-screen flex flex-col items-center">
      <div className="mt-10 w-11/12 max-w-[800px] max-h-5/6">
        <h1 className="text-3xl md:text-5xl self-start m-6 ">Arpit's To-Do List</h1>

        <div className="bg-gray-700 p-2 md:p-4 rounded-lg shadow-lg rounded-b-none w-full">
          <ul className="flex flex-col items-center justify-center my-4 gap-2">
            { tasks ?
              (tasks.map((task:any) => <Item key={task._id} _id={task._id} title={task.title} description={task.description} marked={task.marked} dueDate={task.dueDate} deleteTask={deleteTask}/>))
            :
              (<svg fill="#ffffff" width="32px" height="32px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" className="animate-spin my-16">
                <g id="SVGRepo_iconCarrier"> 
                  <path d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3 22.2 52.4 53.9 99.5 94.3 139.9 40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6 52.4-22.2 99.5-53.9 139.9-94.3 40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9 437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"></path> 
                </g>
              </svg>)
            }
          </ul>
        </div>

        <div className={`flex justify-between items-center bg-slate-300 text-black rounded-t-none ${!isNewTaskActive && "rounded-xl border-b-2 border-black"} py-3 px-2 md:px-5 md:py-3 w-full hover:shadow-xl`} >
          <input className="bg-transparent w-full text-sm md:text-xl focus:outline-none placeholder:text-gray-800"  value={newTask} onChange={(e) => setNewTask(e.target.value)} onKeyDown={handleKeyDown} onFocus={()=>setIsNewTaskActive(true)} placeholder="Enter new Task"/>
          { isNewTaskActive && <input type="date" className="bg-transparent focus:outline-none" value={dueDateInput} onChange={(e) => setDueDateInput(e.target.value)}/> }
        </div>
        { isNewTaskActive && 
          <div className="flex justify-between items-center bg-slate-400 text-black rounded-t-none rounded-xl py-3 px-2 md:px-5 md:py-3 w-full hover:shadow-xl">
            <textarea className="bg-transparent w-full text-sm md:text-xl focus:outline-none placeholder:text-gray-800"  value={descriptionInput} onChange={(e)=>setDescriptionInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Enter the description of the task goes here"/>
          </div>}
      </div>
    </main>
  );
}
