import React, { useEffect, useState } from "react";
import { getUser } from "../../api/apiHelper";
import "./UserList.css";

export const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = await getUser();
    console.log(response.data);
    setUsers(response.data);
  };

  return (
    <div className="container">
      {users.length === 0 ? (
        <p>No results</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.fullname}</h3>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
          </div>
        ))
      )}
    </div>
  );
};
