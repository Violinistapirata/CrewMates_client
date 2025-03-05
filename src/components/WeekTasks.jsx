//CSS
import "./WeekTasks.css";

function WeekTasks({ tasks, assigneeFilter }) {
  console.log(tasks);
  console.log(assigneeFilter);

  function filterByAssignee(assigneeFilter, tasks) {
    if (assigneeFilter.id === "all") {
      return tasks;
    } else {
      const filteredTasks = tasks.filter(
        (task) => task.assigneeId === assigneeFilter.id
      );
      console.log("filteredTasks", filteredTasks)
      return filteredTasks;
    }
  }

  return (
    tasks && (
      <>
        <h2>
          Showing the tasks for{" "}
          <b className="DashboardPage__filter-active">{assigneeFilter.label}</b>
        </h2>
        <ul>
          {filterByAssignee(assigneeFilter, tasks).map((task) => {
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
