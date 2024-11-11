import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTaskById } from '../api';

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getTask = async () => {
      if (id) {
        try {
          const data = await fetchTaskById(Number(id));
          setTask(data);
        } catch (error) {
          console.error('Failed to fetch task:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getTask();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-bold mb-4">Task not found</h2>
        <Link to="/" className="text-blue-500 hover:underline">Back to Task List</Link>
      </div>
    );
  }

  return (
    <div className=" mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">{task.title}</h2>
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <p className="text-gray-700 whitespace-pre-wrap">{task.description}</p>
      </div>
      <Link 
        to="/" 
        className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Back to Task List
      </Link>
    </div>
  );
}