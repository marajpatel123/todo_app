import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import React from "react";
import { faEdit, faTrash,faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [tasks, setTasks] = useState([]);
  const [checkedState, setCheckedState] = useState(false);
  const [inputData, setInputData] = useState("");
  const [editingTask, setEditingTask] = useState(null); // State for the task being edited
  const [editInput, setEditInput] = useState(""); // State for the edit input field
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!inputData){
      return
    }else{
      try {
        await axios.post("http://localhost:5000/todo-data", { task: inputData });
        setInputData("");
        getAllTasks();
      } catch (e) {
        console.error("Error submitting task:", e);
      }
    };
    }

  const getAllTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/todo-data");
      setTasks(data);
    } catch (e) {
      console.error("Error fetching tasks:", e);
    }
  };

  const handleCheckboxChange = (index, id) => {
    setCheckedState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log(`Checkbox at index ${index+1} with ID ${id} toggled.`);
    if(checkedState){
      console.log("Checked");
    }else{
      console.log("Unchecked");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todo-data/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  const handleEditClick = (task) => {
    if (editingTask === task._id) {
      // Exit editing mode (toggle back to faEdit)
      setEditingTask(null);
      setEditInput("");
    } else {
      // Enter editing mode (toggle to faTimes)
      setEditingTask(task._id);
      setEditInput(task.task);
    }
  };

  const handleEditSave = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/todo-data/${id}`, { task: editInput });
      setEditingTask(null); // Exit editing mode
      setEditInput(""); // Clear the edit input field
      getAllTasks(); // Refresh the task list
    } catch (e) {
      console.error("Error saving edited task:", e);
    }
  };

  const saveToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  useEffect(()=>{
    const StoreTasksOnLocalStorage= localStorage.getItem("tasks");
    if(StoreTasksOnLocalStorage){
      setTasks(JSON.parse(StoreTasksOnLocalStorage))
    }else{
      getAllTasks();
    }
  },[])

  useEffect(()=>{
    getAllTasks();
  })

  useEffect(() => {
    saveToLocalStorage(tasks);
  }, [tasks]);

  return (
    <div className="text-center my-[100px] font-serif">
      <h1 className="text-green-500 text-[30px] font-bold">Todo App.</h1>
      <h2 className="text-white text-[20px]">Add your task here..</h2>
      <form
        onSubmit={handleSubmit}
        className="flex text-center justify-center mt-[15px]"
      >
        <input
          className="w-[500px] h-[60px] border rounded-l-lg text-black text-[25px] font-semibold pl-[10px]"
          type="text"
          placeholder="Add task"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button
          className="bg-pink-400 h-[60px] w-[80px] rounded-r-lg text-[20px] text-black"
          type="submit"
        >
          Add
        </button>
      </form>

        <h1 className="text-[25px] w-auto h-[80px] shadow-inner shadow-red-400 text-yellow-400 mt-[100px] content-center rounded-full">
          Tasks List
        </h1>
      <div className="mt-[50px]">
        <div className="flex flex-col justify-center items-center">
          {tasks.map((task, index) => (
            <div
              className="text-center text-black w-[650px] h-[70px] rounded-lg bg-zinc-400 m-[10px] p-[10px] items-center shadow-inner shadow-black flex justify-center"
              key={task._id}
            >
                <input
                  className="w-[15px] h-[15px] m-auto text-black shadow-inner rounded-full px-2 py-[4px] flex justify-between"
                  type="checkbox"
                  checked={!!checkedState[task._id]}
                  onChange={() => handleCheckboxChange(index, task._id)}
                />
              
              {editingTask === task._id ? (
                <div className="mx-[10px] flex">
                  <input
                    type="text"
                    className="text-black w-full rounded-full px-[10px] py-[5px] "
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button
                    className="shadow-inner shadow-white text-white bg-black rounded-xl ml-[5px] py-[2px] px-[10px]"
                    onClick={() => handleEditSave(task._id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <h3 className="w-[100%] ml-[50px]">
                  {task.task}
                </h3>
              )}
                <div className="flex justify-end items-center w-[70%] gap-2">
                  <FontAwesomeIcon
                    icon={editingTask === task._id ? faTimes : faEdit}
                    className="text-white shadow-inner shadow-black rounded-full px-[5px] py-[5px]"
                    onClick={() => handleEditClick(task)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-white shadow-inner shadow-black rounded-full px-[5px] py-[5px]"
                    onClick={() => handleDelete(task._id)}
                  />
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
