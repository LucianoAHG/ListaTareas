import React from 'react';

const TaskList = ({ tasks, onEditTask, onDeleteTask, onToggleStatus }) => {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task.id} className={`task-item ${task.status ? 'completed' : ''}`}>
                    <div className="task-header">
                        <span>{task.title}</span>
                        <i
                            className={`status-icon ${task.status ? 'completed' : 'pending'}`}
                            onClick={() => onToggleStatus(task)}
                        >
                            {task.status ? '✔️' : '❌'}
                        </i>
                    </div>
                    <div className="task-details">
                        <p>{task.description}</p>
                        <small>Creada: {new Date(task.created_at).toLocaleString()}</small>
                    </div>
                    <div className="task-actions">
                        <button className="edit" onClick={() => onEditTask(task)}>
                            Editar
                        </button>
                        <button className="delete" onClick={() => onDeleteTask(task.id)}>
                            Eliminar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
