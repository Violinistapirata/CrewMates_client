// --------------- IMPORTS ---------------

// STYLES
import "./UpdateGroupForm.css";
import binIcon from "../assets/delete.svg";
import removeIcon from "../assets/person_remove.svg";

// HOOKS
import { useState } from "react";

// COMPONENTS
import Button from "./Button";

// VARIABLES
const API_URL = import.meta.env.VITE_API_URL;

// --------------- COMPONENT ---------------

function UpdateGroupForm({
  userId,
  setUserInfo,
  setIsEditing,
  userGroupInfo,
  setUserGroupInfo,
}) {
  const storedToken = localStorage.getItem("authToken");
  const { _id: groupId, members, recurringTasks } = userGroupInfo;
  // In the formData state the initial value is set to be a copy of userGroupInfo and the arrays inside of it are set to be also copies of the original arrays to avoid modifying the userGroupInfo object and be able to recover it's content when discarding changes
  const userGroupInfoCopy = {
    ...userGroupInfo,
    members: [...members],
    recurringTasks: [...recurringTasks],
  };

  // STATE VARIABLES
  const [formData, setFormData] = useState(userGroupInfoCopy);

  const [deletedMembersArray, setDeletedMembersArray] = useState([]);

  const [deletedRecurringTasksArray, setDeletedRecurringTasksArray] = useState(
    []
  );

  const [newRecurringTask, setNewRecurringTask] = useState("");

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
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((updatedGroup) => {
        setUserGroupInfo(updatedGroup);
        setSuccessMessage("Group Updated successfully!");
        setErrorMessage(null);
      })
      .catch((err) => {
        setErrorMessage("Failed to update group");
        setSuccessMessage(null);
        console.error(errorMessage, err);
      });

    deletedMembersArray.forEach((member) => {
      fetch(`${API_URL}/api/users/remove-group/${member._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({ removedFromGroup: true }),
      })
        .then((response) => response.json())
        .then((updatedMember) => {
          if (userId === member._id) {
            //If the user removes themselves from the group

            setUserGroupInfo({ name: "", members: [], recurringTasks: [] });
            setUserInfo(updatedMember);
          }
        })
        .catch((err) => {
          console.error(errorMessage, err);
        });
    });

    setDeletedMembersArray([]);
    setIsEditing(false);
  }

  function handleReset() {
    setFormData(userGroupInfoCopy);
    setDeletedMembersArray([]);
    setIsEditing(false);
  }

  function handleDeleteMember(index) {
    // The splice() method returns an array with one object
    const deletedMember = formData.members.splice(index, 1);

    setDeletedMembersArray([...deletedMembersArray, deletedMember[0]]);
  }

  function handleDeleteRecurringTask(index) {
    const deletedRecurringTask = formData.recurringTasks.splice(index, 1);

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
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="GroupSettings__form"
      >
        <div className="GroupSettings__name">
          <label htmlFor="name">My ship&apos;s name</label>
          <input
            type="text"
            autoFocus
            name="name"
            id="name"
            onChange={handleOnChange}
            value={formData.name}
          />
        </div>

        <section className="section">
          <h2 className="section__title">My crewmates</h2>
          <ul className="GroupSettings__members-list">
            {formData.members.length > 0 ? (
              formData.members.map((member, index) => {
                return (
                  <li key={member._id} className="list-item">
                    <div className="list-item__user-image">
                      {member.name[0]}
                    </div>
                    <p className="list-item__name">{member.name}</p>

                    <button
                      className="icon-button"
                      type="button"
                      onClick={() => handleDeleteMember(index)}
                    >
                      <img src={removeIcon} alt="delete" />
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
          <h2 className="section__title">Recurring tasks</h2>
          <ul className="GroupSettings__task-list">
            {formData.recurringTasks.length > 0 ? (
              formData.recurringTasks.map((task, index) => {
                return (
                  <li
                    key={formData.recurringTasks[index]}
                    className="list-item"
                  >
                    <label htmlFor="recurringTasks">{`Task ${
                      index + 1
                    }:`}</label>
                    <div className="field-with-delete">
                      <input
                        className="list-item__name GroupSettings-input"
                        type="text"
                        autoFocus
                        id="recurringTasks"
                        name="recurringTasks"
                        onChange={(e) => handleOnChangeForTasks(e, index)}
                        value={task}
                      ></input>
                      <button
                        className="icon-button"
                        type="button"
                        onClick={() => handleDeleteRecurringTask(index)}
                      >
                        <img src={binIcon} alt="delete" />
                      </button>
                    </div>
                  </li>
                );
              })
            ) : (
              <p>No recurring tasks in this group</p>
            )}
          </ul>
          <div className="list-item">
            <label htmlFor="recurringTasks new-task">New task:</label>
            <div className="GroupAssignment_form-input-and-button">
              <input
                type="text"
                id="recurringTasks"
                onChange={(e) => setNewRecurringTask(e.target.value)}
                value={newRecurringTask}
                className="joint-button-input"
              />
              <button
                type="button"
                className="joint-button"
                onClick={() => handleAddNewTask()}
              >
                Add new task
              </button>
            </div>
          </div>
        </section>

        <div>
          <Button type="reset" className="Button--secondary" content="Cancel" />
          <Button type="submit" className="Button--submit" content="Save" />
        </div>

        {errorMessage && <p className="error">❌ {errorMessage}</p>}
        {successMessage && <p className="success">✅ {successMessage}</p>}
      </form>
    </>
  );
}

export default UpdateGroupForm;
