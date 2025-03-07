import "./TaskList.css";

function TaskList({ tasks, updateTaskStatus }) {
  function handleCheckboxChange(taskId, isDone) {
    updateTaskStatus(taskId, isDone); 
  }

  return (
    <ul>
      {tasks.map((task) => {
        return (
          <li key={task._id} className={`task-list-item ${task.isDone ? 'task-completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={function () {
                handleCheckboxChange(task._id, !task.isDone);
              }}
              className="task-checkbox"
            />
            <p>{task.name}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;