// --------------- IMPORTS ---------------

// STYLES
import "./updateGroupForm.css";

// HOOKS
import { useState } from "react";

// COMPONENTS
import Button from "./Button";

// VARIABLES
const API_URL = import.meta.env.VITE_API_URL;
const storedToken = localStorage.getItem("authToken");


// --------------- COMPONENT ---------------

function UpdateGroupForm({ setIsEditing, userGroupInfo, setUserGroupInfo }) {
    const {_id: groupId, members, recurringTasks } = userGroupInfo;
  // In the formData state the initial value is set to be a copy of userGroupInfo and the arrays inside of it are set to be also copies of the original arrays to avoid modifying the userGroupInfo object and be able to recover it's content when discarding changes
  const userGroupInfoCopy = {
    ...userGroupInfo,
    members: [...members],
    recurringTasks: [...recurringTasks],
  };

  // STATE VARIABLES
  const [formData, setFormData] = useState(userGroupInfoCopy);
  console.log("THIS IS FORM DATA: ", formData);

  const [deletedMembersArray, setDeletedMembersArray] = useState([]);
  console.log("THIS IS THE DELETED MEMBERS ARRAY: ", deletedMembersArray);

  const [deletedRecurringTasksArray, setDeletedRecurringTasksArray] = useState([]);
  console.log("THIS IS THE DELETED RECURRING TASKS ARRAY: ", deletedRecurringTasksArray);

  const [newRecurringTask, setNewRecurringTask] = useState("");
  console.log("THIS IS THE NEW RECURRING TASK: ", newRecurringTask);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // HANDLE FUNCTIONS
  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleOnChangeForTasks(e, index) {
    formData.recurringTasks.splice(index, 1, e.target.value);
    setFormData({ ...formData, recurringTasks: formData.recurringTasks });
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    fetch(`${API_URL}/api/groups/${groupId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${storedToken}`
    },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(updatedGroup => {
        console.log("THIS IS THE UPDATED GROUP -->", updatedGroup);
        setUserGroupInfo(updatedGroup);  
        setSuccessMessage("Group Updated successfully!");
        setErrorMessage(null);
    })
    .catch(err =>{
        setErrorMessage("Failed to update group");
        setSuccessMessage(null);
        console.error(errorMessage, err)
    })

    setDeletedMembersArray([])
    setIsEditing(false);
  }

  function handleReset() {
    console.log(
        "SET FORM DATA -->",
        formData,
        "USER GROUP INFO -->",
        userGroupInfo
      );
      setFormData(userGroupInfoCopy);
      setDeletedMembersArray([]);
      setIsEditing(false);
  }

  function handleDeleteMember(index) {
    // console.log("THIS IS THE DELETED MEMBER: ", formData.members[index]);

    const deletedMember = formData.members.splice(index, 1);
    // console.log("THIS IS deletedMember: ", deletedMember[0]);
    // The splice() method returns an array with one object
    setDeletedMembersArray([...deletedMembersArray, deletedMember[0]]);
  }

  function handleDeleteRecurringTask(index) {
    // console.log("THIS IS THE DELETED MEMBER: ", formData.members[index]);

    const deletedRecurringTask = formData.recurringTasks.splice(index, 1);
    // console.log("THIS IS deletedRecurringTask: ", deletedRecurringTask[0]);
    // The splice() method returns an array with one object
    setDeletedRecurringTasksArray([
      ...deletedRecurringTasksArray,
      deletedRecurringTask[0],
    ]);
  }

  function handleAddNewTask() {
    setFormData({
      ...formData,
      recurringTasks: [...formData.recurringTasks, newRecurringTask],
    });
    setNewRecurringTask("");
  }

  return (
    <>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <h3 className="section__title">My Ship</h3>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          onChange={handleOnChange}
          value={formData.name}
        />

        <section className="section">
          <h3 className="section__title">My crewmates</h3>
          <ul className="section__list">
            {formData.members.length > 0 ? (
              formData.members.map((member, index) => {
                return (                 
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
            {formData.recurringTasks.length > 0 ? (
              formData.recurringTasks.map((task, index) => {
                return (
                  <li
                    key={formData.recurringTasks[index]}
                    className="list-item"
                  >
                    <label htmlFor="recurringTasks"></label>
                    <input
                      className="list-item__name"
                      type="text"
                      autoFocus
                      id="recurringTasks"
                      onChange={(e) => handleOnChangeForTasks(e, index)}
                      value={task}
                    ></input>
                    <button
                      className="list-item__delete-btn"
                      type="button"
                      onClick={() => handleDeleteRecurringTask(index)}
                    >
                      X
                    </button>
                  </li>
                );
              })
            ) : (
              <p>No recurring tasks in this group</p>
            )}
          </ul>
        <label htmlFor="recurringTasks"></label>
        <input
          type="text"
          id="recurringTasks"
          onChange={(e) => setNewRecurringTask(e.target.value)}
          value={newRecurringTask}
        />
        <Button onClick={() => handleAddNewTask()} content="Add New Recurring Task"/>
        </section>

        <div>
        <Button type="reset" className="Button--cancel" content="Cancel Changes"/>
        <Button type="submit" className="Button--submit" content="Update Group"/>
        </div>

        {errorMessage && <p className="error">❌ {errorMessage}</p>}
        {successMessage && <p className="success">✅ {successMessage}</p>}
      </form>
    </>
  );
}

export default UpdateGroupForm;
