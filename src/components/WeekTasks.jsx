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

  function groupTasksByAssignee(tasks) {
    const groupedTasks = [];
  
    tasks.forEach((task) => {
      const existingGroup = groupedTasks.find(
      (group) => group.assigneeName === task.assigneeName
      );
  
      if (existingGroup) {
      existingGroup.tasks.push(task);
      } else {
      groupedTasks.push({
      assigneeName: task.assigneeName,
      tasks: [task],
        });
      }
    });
  
    return groupedTasks;
  }

  const filteredTasks = filterByAssignee(assigneeFilter, tasks);
  const groupedTasks = groupTasksByAssignee(filteredTasks);

  return (
    tasks && (
      <>
        <h2>
          Showing the tasks for{" "}
          <b className="DashboardPage__filter-active">{assigneeFilter.label}</b>
        </h2>
        <ul>
        {groupedTasks.map((group) => (
          <li key={group.assigneeName}>
          <div className="assignee-name">
             {group.assigneeName.toUpperCase()} 
            </div>
            <ul>
              {group.tasks.map((task) => (
              <li key={task._id}>
              <p>{task.name}</p>
              <p>{task.isDone ? "✅ Done" : "❌ Not Done"}</p>
              </li>
             ))}
           </ul>
          </li>
      ))}
        </ul>
      </>
    )
  );
}

export default WeekTasks;
