import React from "react";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <ul>
        <li>
          <button>Edit task</button>
        </li>
        <li className="delete-list-item">
          <button>Delete task</button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
