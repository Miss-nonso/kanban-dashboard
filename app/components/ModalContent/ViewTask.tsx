import React, { useState } from "react";
import Image from "next/image";
import Dropdown from "../Dropdown";
// import { useState } from "react";

const handleEditTask = () => {
  console.log("editing...");
};

const ViewTask = () => {
  //   const [isChecked, setIsChecked] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  return (
    <div className="modal-content-wrapper" id="view-task-content-wrapper">
      <div className="view-task-modal-header">
        <h5>
          Research pricing points of various competitors and trial different
          business models
        </h5>
        <div className="relative">
          <button
            onClick={() => setDisplayDropdown(!displayDropdown)}
            className="task-option-btn"
          >
            <Image
              src="/assets/icons/icon-vertical-ellipsis.svg"
              alt="options"
              width={4.62}
              height={20}
            />
          </button>

          {displayDropdown && (
            <Dropdown taskOrBoard="task" fn={handleEditTask} />
          )}
        </div>
      </div>
      <p>
        We know what we&apos;re planning to build for version one. Now we need
        to finalise the first pricing model we&#39;ll use. Keep iterating the
        subtasks until we have a coherent proposition.
      </p>

      <div>
        <label htmlFor="subtasks">
          Subtasks({2} of {3})
        </label>
        <div>
          <label className="container">
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark"></span> <p>One</p>
          </label>
          <label className="container">
            <input type="checkbox" defaultChecked={false} />
            <span className="checkmark"></span> <p>One</p>
          </label>
          <label className="container">
            <input type="checkbox" defaultChecked={true} />
            <span className="checkmark"></span> <p>One</p>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="status">Current status</label>
        <select name="status" id="status">
          <option value="">Select status</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
};

export default ViewTask;
