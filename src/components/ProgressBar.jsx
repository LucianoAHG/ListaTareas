const ProgressBar = ({ tasks }) => {
    const completedTasks = tasks.filter((task) => task.status).length;
    const progress = (completedTasks / tasks.length) * 100 || 0;

    return (
        <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
            <span>{Math.round(progress)}% completado</span>
        </div>
    );
};

export default ProgressBar;
