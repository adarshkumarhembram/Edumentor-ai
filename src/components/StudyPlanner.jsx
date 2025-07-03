import { useState } from "react";

function StudyPlanner() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput("");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-xl mt-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">📅 Study Planner</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task (e.g., Revise DBMS)"
          className="flex-1 border px-3 py-2 rounded-lg"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          tasks.map((task, index) => (
            <li
              key={index}
              className={`flex justify-between items-center p-3 border rounded-lg ${
                task.completed ? "bg-green-100 line-through text-gray-500" : ""
              }`}
            >
              <span onClick={() => toggleComplete(index)} className="cursor-pointer">
                ✅ {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:underline"
              >
                🗑️ Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default StudyPlanner;
