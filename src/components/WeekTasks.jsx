//CSS
import "./WeekTasks.css";

function WeekTasks({ tasks, filter }) {
  console.log(tasks);
  console.log(filter);

  function filterByAssignee(filter, tasks) {
    if (filter.id === "all") {
      return tasks;
    } else {
      const filteredTasks = tasks.filter(
        (task) => task.assigneeId === filter.id
      );
      return filteredTasks;
    }
  }

  return (
    tasks && (
      <>
        <h2>
          Showing the tasks for{" "}
          <b className="DashboardPage__filter-active">{filter.label}</b>
        </h2>
        <ul>
          {filterByAssignee(filter, tasks).map((task) => {
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
