//CSS
import "./WeekTasks.css";

function WeekTasks({ tasks, filter }) {
  
    return (
    tasks && (
      <>
        <h2>
          Showing the tasks for <b>{filter.label}</b>
        </h2>
        {tasks.map((task) => {
          return (
            <>
              <li key={task._id}>
                <div>{task.assigneeName.slice(0, 3).toUpperCase()}</div>
                <p>{task.name}</p>
                <p>{task.isDone}</p>
              </li>
            </>
          );
        })}
      </>
    )
  );
}

export default WeekTasks;
