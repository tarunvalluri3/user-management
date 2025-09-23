import React from "react";
import "./UserCard.css";

// Using function based component and destructuring to directly extract user, onDelete, and onEdit from props

const UserCard = ({ user, onDelete, onEdit }) => {
  return (
    <div className="user-card">
      <p><span className="label">ID:</span> {user.id}</p>
      <p><span className="label">First Name:</span> {user.firstName}</p>
      <p><span className="label">Last Name:</span> {user.lastName}</p>
      <p><span className="label">Email:</span> {user.email}</p>
      <p><span className="label">Department/Company:</span> {user.department}</p>

      {/* Added Edit button to allow editing user details*/}
      <button
          className="edit-btn"
          onClick={() => onEdit(user)}
        >
          Edit
        </button>

      {/* Added Delete button to allow editing user details*/}

      <button
        className="delete-btn"
        onClick={() => onDelete(user.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
