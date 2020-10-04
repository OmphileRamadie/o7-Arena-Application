import React from "react";

export default function UserItem({
  userName,
  userEmail,
  userRole,
  removeUser,
}) {
  return (
    <div className="userItem">
      <p className="userName">{userName}</p>
      <p>{userEmail}</p>
      <p>{userRole}</p>
      <button className="removeUser" onClick={removeUser}>
        Remove
      </button>
    </div>
  );
}
