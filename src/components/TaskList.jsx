import "./TaskList.css";

function TaskList({ tasks, updateTaskStatus }) {
  function handleCheckboxChange(taskId, isDone) {
    updateTaskStatus(taskId, isDone); 
  }

  return (
    <ul>
      {tasks.map(function (task) {
        return (
          <li key={task._id}>
            <p>{task.name}</p>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={function () {
                handleCheckboxChange(task._id, !task.isDone);
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default TaskList;