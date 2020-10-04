import React from "react";

export default function UpdateProfile({
  name,
  handleChange,
  handleRoleChange,
  updateUser,
  chosenRole,
}) {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <h3 className="logo-icon">o7 Arena</h3>
          <p className="logo-text">Home Of Historic Events</p>
        </div>
      </div>

      <h1>Update Profile</h1>

      <form className="updateForm">
        <div className="credentials">
          <label htmlFor=""> Name: </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="credentials">
          <select
            className="dropdown"
            value={chosenRole}
            onChange={handleRoleChange}
          >
            <option value={"none"}>Choose Role</option>
            <option value="Subscriber">Subscriber</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="updateBtn">
          <button onClick={updateUser}>Update Profile</button>
        </div>
      </form>
    </div>
  );
}
