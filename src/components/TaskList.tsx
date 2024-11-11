import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../api';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const data = await fetchTasks();
      setTasks(data);
    };
    getTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Task List</h1>
        <Link
          to="/tasks/new"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          <span>Add New Task</span>
        </Link>
      </div>
      {tasks.length === 0 ? (
        <p className="text-gray-600 text-center">No tasks found. Start by adding a new task!</p>
      ) : (
        <ul className="bg-white shadow-md rounded-lg overflow-hidden">
          {tasks.map((task, index) => (
           
            <li 
              key={index} 
              className={`border-b border-gray-200  transition-colors duration-300 hover:bg-gray-100 `}
            >
              <div className="flex items-center justify-between p-4">
                <Link 
                  to={`/tasks/${task.id}`} 
                  className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  {task.title}
                </Link>
                <div className="flex space-x-2">
                  <Link
                    to={`/tasks/${task.id}/edit`}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded inline-flex items-center transition-colors duration-300"
                    aria-label={`Edit ${task.title}`}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded inline-flex items-center transition-colors duration-300"
                    aria-label={`Delete ${task.title}`}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </li>
           
          ))}
        </ul>
      )}
    </div>
  );
}