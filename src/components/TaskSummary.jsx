import React from 'react';

const TaskSummary = ({ total, completed, pending }) => {
    return (
        <div className="task-summary">
            <h2>Resumen de Tareas</h2>
            <div className="stats">
                <p>Total: {total}</p>
                <p>Completadas: {completed}</p>
                <p>Pendientes: {pending}</p>
            </div>
        </div>
    );
};

export default TaskSummary;
