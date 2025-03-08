//CSS
import "./WeekTasks.css";
import TaskList from "./TaskList";

function WeekTasks({ tasks, assigneeFilter, updateTaskStatus }) {

  function filterByAssignee(assigneeFilter, tasks) {
    if (assigneeFilter.id === "all") {
      return tasks;
    } else {
      const filteredTasks = tasks.filter(
        (task) => task.assigneeId === assigneeFilter.id
      );
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
      <div className = "tasks-section-container">
        <h2 className="task-list-title tasks-section">
          Showing the tasks for{" "}
          <b className="DashboardPage__filter-active">{assigneeFilter.label}</b>
        </h2>
        <ul>
        {groupedTasks.map((group) => (
          <li key={group.assigneeName}>

          {assigneeFilter.id ==="all" && ( 
          <div className="assignee-name">
             {group.assigneeName.toUpperCase()} 
            </div>
          )}
            <TaskList tasks={group.tasks} updateTaskStatus={updateTaskStatus}/>
          </li>
      ))}
        </ul>
      </div>
    )
  );
}

export default WeekTasks;
