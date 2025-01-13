import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/tasks/';

export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTask = async (task) => {
    const response = await axios.post(API_URL, task);
    return response.data;
};

export const updateTask = async (id, task) => {
    const response = await axios.put(`${API_URL}${id}`, task);
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
};

export const toggleTaskStatus = async (id) => {
    const response = await axios.patch(`${API_URL}${id}/toggle`);
    return response.data;
};
