//CSS
import "./WeekTasks.css";

function WeekTasks({ tasks, filter }) {

  console.log(tasks);
  
    return (
      tasks && (
        <>
          <h2>
            Showing the tasks for{" "}
            <b className="DashboardPage__filter-active">{filter.label}</b>
          </h2>
          <ul>
            {tasks.map((task) => {
              return (
                <li key={task._id}>
                  <div>{task.assigneeName.slice(0, 3).toUpperCase()}</div>
                  <p>{task.name}</p>
                  <p>{task.isDone}</p>
                </li>
              );
            })}
          </ul>
        </>
      )
    );
}

export default WeekTasks;
