import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("")


  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/taskapi");
      const responsedData = await response.data;
      setTasks(responsedData);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async ()=>{
    try {
      const response = await fetch("http://localhost:3000/taskapi/post",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({text: newTask})
      })
      const task = await response.json();
      setTasks([...tasks, task])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className=" flex justify-center items-center flex-col">
        <div className=" mt-4">
          <div className=" mb-5">
            <div className="flex items-center border-b-2 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Learn Backend"
                aria-label="Full name"
                onChange={(e)=>setNewTask(e.target.value)}
              />
              <button
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="button"
                onClick={()=>addTask()}
              >
                Add
              </button>
            </div>
          </div>
          <div className="tasks-container">
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              {tasks.map((task) => (
                <div
                  className=" flex flex-row justify-between items-center text-center border-b"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <li key={task.id}>{task.text}</li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
