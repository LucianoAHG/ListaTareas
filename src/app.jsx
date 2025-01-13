import './css/styles.css';
import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } from './api';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskSummary from './components/TaskSummary';
import TaskEisenhowerMatrix from './components/TaskEisenhowerMatrix';
import TaskStatsChart from './components/TaskStatsChart';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('fecha'); // Opciones: 'fecha', 'estado'

    // Fetch tasks from API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    const handleCreateTask = async (task) => {
        try {
            const newTask = await createTask(task);
            setTasks((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const task = await updateTask(updatedTask.id, updatedTask);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? task : t))
            );
            setSelectedTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleToggleStatus = async (task) => {
        try {
            const updatedTask = await toggleTaskStatus(task.id);
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
            );
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-theme');
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortBy === 'fecha') {
            return new Date(b.created_at) - new Date(a.created_at);
        }
        if (sortBy === 'estado') {
            return a.status - b.status;
        }
        return 0;
    });

    const filteredTasks = sortedTasks.filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );

    const completedTasks = tasks.filter((task) => task.status).length;
    const pendingTasks = tasks.length - completedTasks;

    return (
        <div className="container">
            <header>
                <h1>Gestión de Tareas</h1>
                <div>
                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="fecha">Ordenar por Fecha</option>
                        <option value="estado">Ordenar por Estado</option>
                    </select>
                    <button onClick={toggleDarkMode}>Cambiar Tema</button>
                </div>
            </header>
            <TaskSummary total={tasks.length} completed={completedTasks} pending={pendingTasks} />
            <TaskForm
                onCreateTask={handleCreateTask}
                onUpdateTask={handleUpdateTask}
                selectedTask={selectedTask}
            />
            <TaskEisenhowerMatrix tasks={tasks} onUpdateTask={handleUpdateTask} />
            <TaskStatsChart completed={completedTasks} pending={pendingTasks} />
            <input
                type="text"
                placeholder="Buscar tarea..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TaskList
                tasks={filteredTasks}
                onEditTask={setSelectedTask}
                onDeleteTask={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
            />
        </div>
    );
};

export default App;
