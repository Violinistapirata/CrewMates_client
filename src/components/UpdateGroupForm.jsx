import "./updateGroupForm.css";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function UpdateGroupForm({ setIsEditing, userGroupInfo, setUserGroupInfo }) {
  const [formData, setFormData] = useState(userGroupInfo);

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleOnChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    // fetch(`${API_URL}/auth/login`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(formData),
        // })
        setUserGroupInfo(formData)
        setIsEditing(false);
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
            {formData.members ? (
              formData.members.map((member) => {
                return (
                  <>
                    <li key={member._id} className="list-item">
                    <div className="list-item__container">
                      <div className="list-item__user-image">{member.name[0]}</div>
                      <p className="list-item__name">{member.name}</p>
                    </div>
                    <button className="list-item__delete-btn">X</button>
                    </li>
                  </>
                );
              })
            ) : (
              <p>No members in this group</p>
            )}
          </ul>
        </section>

        <label htmlFor="recurringTasks">Tasks</label>
        <input
          type="text"
          name="recurringTasks"
          onChange={handleOnChange}
          value={formData.recurringTasks}
        />
        <button type="button"
          className="form__button--cancel"
          onClick={()=>setFormData(userGroupInfo)}
        >
          Cancel changes
        </button>
        <button className="form__button" type="submit">
          {" "}
          Update Group{" "}
        </button>
        {errorMessage && <p className="error">❌ {errorMessage}</p>}
        {successMessage && <p className="success">✅ {successMessage}</p>}
      </form>
    </>
  );
}

export default UpdateGroupForm;
