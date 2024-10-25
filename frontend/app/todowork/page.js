'use client';

import { useState } from 'react';

export default function TodoWorkPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (title && description && priority) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        priority,
        deadline,
        completed: false,
      };
      setTasks([...tasks, newTask]);
      // Clear form fields
      setTitle('');
      setDescription('');
      setPriority('');
      setDeadline('');
    }
  };

  // Mark task as complete/incomplete
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen  p-4 md:p-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-3xl font-extrabold text-center text-black mb-6">
        Student To-Do Task Manager
      </h1>

      {/* Motivational Quote */}
      <div className="max-w-5xl mx-auto mb-10 overflow-hidden">
        <div className="text-center text-xl font-semibold text-white animate-marquee">
          <p className="inline-block whitespace-nowrap">
            "Success is the sum of small efforts, repeated day in and day out."
            – Robert Collier &nbsp; | &nbsp; "The future depends on what you do
            today." – Mahatma Gandhi &nbsp; | &nbsp; "Don't watch the clock; do
            what it does. Keep going." – Sam Levenson
          </p>
        </div>
      </div>

      {/* Task Form */}
      <form
        onSubmit={addTask}
        className="bg-white shadow-3xl rounded-3xl p-8 mb-12 max-w-5xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-8 text-center">
          Add New Task
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Task Title"
            className="border border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            required
          />
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description of Task"
            className="border border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            rows="4"
            required
          ></textarea>
          <div className="flex flex-col md:flex-row gap-6">
            <select
              id="task-priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="date"
              id="task-deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="border border-gray-300 p-4 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90 transition duration-300"
        >
          Add Task
        </button>
      </form>

      {/* Today's Tasks */}
      <div className="max-w-5xl mx-auto mb-10">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          Today's Tasks
        </h2>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">You have no tasks today!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center bg-white ${
                task.completed ? 'opacity-60 line-through' : ''
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                {task.deadline && (
                  <p className="text-sm text-red-500">Due: {task.deadline}</p>
                )}
                <p className={`text-sm ${
                  task.priority === 'High'
                    ? 'text-red-500'
                    : task.priority === 'Medium'
                    ? 'text-yellow-500'
                    : 'text-green-500'
                }`}>
                  Priority: {task.priority}
                </p>
              </div>
              <div className="flex space-x-3">
                <input
                  type="checkbox"
                  id={`task-completed-${task.id}`}
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-6 h-6"
                />
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
