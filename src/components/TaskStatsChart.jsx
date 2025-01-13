import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

const TaskStatsChart = ({ completed, pending }) => {
    const chartData = {
        labels: ['Completadas', 'Pendientes'],
        datasets: [
            {
                label: 'Estado de Tareas',
                data: [completed, pending],
                backgroundColor: ['#28a745', '#dc3545'],
                borderColor: ['#1e7e34', '#bd2130'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true, // Mantener relación de aspecto
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14, // Ajustar tamaño de la leyenda
                    },
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>Estadísticas de Tareas</h2>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default TaskStatsChart;
