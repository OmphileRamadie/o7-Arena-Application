import React from "react";
import UserItem from "./UserItem";

export default function usersContainer({ users, removeUser }) {
  if (users.length > 0) {
    return (
      <div className="users">
        <div className="usersContainer">
          {users.map((user) => {
            return (
              <div key={user._id}>
                <UserItem
                  userName={user.name}
                  userEmail={user.email}
                  userRole={user.role}
                  removeUser={() => removeUser(user._id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h3 className="noUsers">No Users</h3>;
  }
}
