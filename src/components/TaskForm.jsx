import React, { useState, useEffect } from 'react';

const TaskForm = ({ onCreateTask, onUpdateTask, selectedTask }) => {
    const [task, setTask] = useState({ title: '', description: '' });

    useEffect(() => {
        if (selectedTask) {
            setTask({
                title: selectedTask.title || '',
                description: selectedTask.description || '',
            });
        } else {
            setTask({ title: '', description: '' });
        }
    }, [selectedTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.title.trim()) {
            alert('El título es obligatorio');
            return;
        }

        if (selectedTask) {
            onUpdateTask({ ...selectedTask, ...task });
        } else {
            onCreateTask(task);
        }
        setTask({ title: '', description: '' });
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Título de la tarea"
                value={task.title}
                onChange={handleChange}
            />
            <textarea
                name="description"
                placeholder="Descripción de la tarea (opcional)"
                value={task.description}
                onChange={handleChange}
            ></textarea>
            <button type="submit">{selectedTask ? 'Actualizar' : 'Crear'} Tarea</button>
        </form>
    );
};

export default TaskForm;
