import React from 'react';

const TaskEisenhowerMatrix = ({ tasks, onUpdateTask }) => {
    const categories = {
        'Alta': 'Hacer Primero',
        'Media': 'Hacer Más Tarde',
        'Baja': 'Delegar',
        'No prioritaria': 'No Hacer',
    };

    const categorizeTasks = (category) =>
        tasks.filter((task) => task.priority === category);

    const handleCategoryChange = (task, newCategory) => {
        const updatedTask = { ...task, priority: newCategory };
        onUpdateTask(updatedTask); // Llama al método para actualizar la tarea
    };

    return (
        <div className="eisenhower-matrix">
            <h2>Matriz de Eisenhower</h2>
            <div className="matrix-grid">
                {Object.entries(categories).map(([key, label]) => (
                    <div key={key} className="matrix-cell">
                        <h3>{label}</h3>
                        {categorizeTasks(key).map((task) => (
                            <div key={task.id} className="matrix-task">
                                <p>{task.title}</p>
                                <select
                                    value={task.priority}
                                    onChange={(e) =>
                                        handleCategoryChange(task, e.target.value)
                                    }
                                >
                                    {Object.entries(categories).map(([value, name]) => (
                                        <option key={value} value={value}>
                                            Mover a {name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskEisenhowerMatrix;
