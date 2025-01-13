import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({ task, onEditTask, onDeleteTask, onToggleStatus }) => {
    const [showDescription, setShowDescription] = useState(false);

    return (
        <li className={`task-item ${task.status ? 'completed' : ''}`}>
            <div className="task-header">
                <span>{task.title}</span>
                <FontAwesomeIcon
                    icon={task.status ? faCheckCircle : faTimesCircle}
                    className={`status-icon ${task.status ? 'completed' : 'pending'}`}
                    onClick={() => onToggleStatus(task)}
                />
            </div>
            <div className="task-actions">
                <button onClick={() => setShowDescription(!showDescription)}>Ver</button>
                <button className="edit" onClick={() => onEditTask(task)}>
                    <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button className="delete" onClick={() => onDeleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                </button>
            </div>
            {showDescription && (
                <div className="task-details">
                    <p>{task.description}</p>
                    <small>
                        Fecha de creación: {new Date(task.created_at).toLocaleDateString()} - {new Date(task.created_at).toLocaleTimeString()}
                    </small>
                </div>
            )}
        </li>
    );
};

export default TaskItem;
