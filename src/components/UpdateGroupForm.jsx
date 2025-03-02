import "./updateGroupForm.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UpdateGroupForm({ setIsEditing, userGroupInfo, setUserGroupInfo }) {
  // In the formData state the initial value is set to be a copy of userGroupInfo and the arrays inside of it are set to be also copies of the original arrays to avoid modifying the userGroupInfo object and be able to recover it's content when discarding changes
  const userGroupInfoCopy = {
    ...userGroupInfo,
    members: [...userGroupInfo.members],
    recurringTasks: [...userGroupInfo.recurringTasks]
  }
  
  const [formData, setFormData] = useState(userGroupInfoCopy);
  console.log("THIS IS FORM DATA: ", formData);
  const [deletedMembers, setDeletedMembers] = useState([]);
  console.log("THIS IS THE DELETED MEMBERS ARRAY: ", deletedMembers);
  const [deletedRecurringTasks, setDeletedRecurringTasks] = useState([]);
  console.log("THIS IS THE DELETED RECURRING TASKS ARRAY: ", deletedRecurringTasks);
  const [newRecurringTask, setNewRecurringTask] = useState("")
  console.log("THIS IS THE DELETED MEMBERS ARRAY: ", newRecurringTask);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  
  function handleOnChangeForTasks(e) {
    setNewRecurringTask(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // fetch(`${API_URL}/api/groups/`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    setUserGroupInfo(formData);
    // setDeletedMembers([])
    setIsEditing(false);
  }

  function handleDeleteMember(index) {
    // console.log("THIS IS THE DELETED MEMBER: ", formData.members[index]);

    const deletedMember = formData.members.splice(index, 1);
    // console.log("THIS IS deletedMember: ", deletedMember[0]);
    // The splice() method returns an array with one object
    setDeletedMembers([...deletedMembers, deletedMember[0]]);
}

  function handleDeleteRecurringTask(index) {
    // console.log("THIS IS THE DELETED MEMBER: ", formData.members[index]);

    const deletedRecurringTask = formData.recurringTasks.splice(index, 1);
    // console.log("THIS IS deletedRecurringTask: ", deletedRecurringTask[0]);
    // The splice() method returns an array with one object
    setDeletedRecurringTasks([...deletedRecurringTasks, deletedRecurringTask[0]]);
}

function addNewTask() {
    setFormData({...formData, recurringTasks: [...formData.recurringTasks, newRecurringTask]});
    setNewRecurringTask("")
}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Group Name</label>
        <input
          type="text"
          name="name"
          onChange={handleOnChange}
          value={formData.name}
        />

        <section className="section">
          <h3 className="section__title">My crewmates</h3>
          <ul className="section__list">
            {formData.members.length > 0 ? (
              formData.members.map((member, index) => {
                return (
                  <>
                    <li key={member._id} className="list-item">
                      <div className="list-item__container">
                        <div className="list-item__user-image">
                          {member.name[0]}
                        </div>
                        <p className="list-item__name">{member.name}</p>
                      </div>
                      <button
                        className="list-item__delete-btn"
                        type="button"
                        onClick={() => handleDeleteMember(index)}
                      >
                        X
                      </button>
                    </li>
                  </>
                );
              })
            ) : (
              <p>No members in this group</p>
            )}
          </ul>
        </section>

        

        <section className="section">
            <h3 className="section__title">Recurring tasks</h3>
            <ul className="section__list">
              {formData.recurringTasks ? (
                formData.recurringTasks.map((task, index) => {
                  return <li key={formData.recurringTasks[index]} className="list-item">
                  <p className="list-item__name">{task}</p>
                  <button
                        className="list-item__delete-btn"
                        type="button"
                        onClick={() => handleDeleteRecurringTask(index)}
                      >
                        X
                      </button>
                  </li>;
                })
              ) : (
                <p>No recurring tasks in this group</p>
              )}
            </ul>
          </section>
          <label htmlFor="recurringTasks"></label>
          <input
          type="text"
          name="recurringTasks"
          onChange={handleOnChangeForTasks}
          value={newRecurringTask}
        />
        <button type="button" className="form__button" onClick={() => addNewTask()}>Add New Recurring Task</button>
        <button
          type="button"
          className="form__button--cancel"
          onClick={() => {
            console.log(
              "SET FORM DATA -->",
              formData,
              "USER GROUP INFO -->",
              userGroupInfo
            );
            setFormData(userGroupInfoCopy);
            setDeletedMembers([]);
          }}
        >
          Cancel changes
        </button>
        <button className="form__button" type="submit">
          Update Group
        </button>
        {errorMessage && <p className="error">❌ {errorMessage}</p>}
        {successMessage && <p className="success">✅ {successMessage}</p>}
      </form>
    </>
  );
}

export default UpdateGroupForm;
