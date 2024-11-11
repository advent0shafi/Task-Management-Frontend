import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/tasks/';

export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchTaskById = async (id: number) => {
  const response = await axios.get(`${API_URL}${id}/`);
  return response.data;
};

export const createTask = async (task: { title: string; description: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (id: number, updatedTask: { title: string; description: string }) => {
  const response = await axios.put(`${API_URL}${id}/`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`);
};
