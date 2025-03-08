import "./TaskList.css";

function TaskList({ tasks, updateTaskStatus }) {
  function handleCheckboxChange(taskId, isDone) {
    updateTaskStatus(taskId, isDone); 
  }

  return (
    <>
    {tasks.length > 0 && (
    <div className="task-card">
    <ul className="task-list">
      {tasks.map((task) => (
      <li key={task._id} className={`task-list-item ${task.isDone ? 'task-completed' : ''}`}>
      <input
          type="checkbox"
          checked={task.isDone}
          onChange={() => handleCheckboxChange(task._id, !task.isDone)}
          className="task-checkbox"
        />
        <p>{task.name}</p>
        </li>
      ))}
    </ul>
  </div>
)}
    </>
  );
}

export default TaskList;