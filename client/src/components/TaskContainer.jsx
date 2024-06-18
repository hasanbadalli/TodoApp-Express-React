import React from "react";

const TaskContainer = ({ tasks, setTasks }) => {
  const toggleCompleted = async (id, completed) => {
    const response = await fetch("http://localhost:3000/taskapi/put", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await response.json();
    setTasks(
      tasks.map((task) => (task.id == id ? { ...task, completed } : task))
    );
  };

  const taskDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/taskapi/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      await response.json();
  
      tasks = tasks.filter((task) => task.id !== id);
      setTasks(tasks)
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="tasks-container">
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
        {tasks.map((task) => (
          <div
            className=" flex flex-row justify-between items-center text-center border-b"
            style={{
              marginBottom: "20px",
            }}
          >
            <li key={task.id} style={{textDecoration: task.completed ? "line-through" : "none"}}>
              <span onClick={()=>toggleCompleted(task.id , !task.completed)}>{task.text}</span>
            </li>
            <button onClick={()=>taskDelete(task.id)} class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Delete
              </span>
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskContainer;
