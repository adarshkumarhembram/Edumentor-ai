import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Planner() {
  const { user } = useAuth();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const userTasksRef = collection(db, "users", user.uid, "tasks");

  // ✅ Add task to Firestore
  const addTask = async () => {
    if (!task.trim()) return;

    await addDoc(userTasksRef, {
      text: task,
      completed: false,
      createdAt: new Date(),
    });

    setTask(""); // Clear input
  };

  // ✅ Toggle task completion
  const toggleComplete = async (taskId, currentStatus) => {
    const docRef = doc(db, "users", user.uid, "tasks", taskId);
    await updateDoc(docRef, { completed: !currentStatus });
  };

  // ✅ Delete task
  const deleteTask = async (taskId) => {
    const docRef = doc(db, "users", user.uid, "tasks", taskId);
    await deleteDoc(docRef);
  };

  // ✅ Real-time listener with sorting
  useEffect(() => {
    if (!user?.uid) return;

    const q = query(userTasksRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(list);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">📘 Study Planner</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="flex-1 border px-4 py-2 rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center border p-3 rounded-md ${
              t.completed ? "bg-green-50" : ""
            }`}
          >
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id, t.completed)}
              />
              <span
                className={`${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {t.text}
              </span>
            </div>
            <button
              onClick={() => deleteTask(t.id)}
              className="text-red-500 hover:underline text-sm"
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planner;
