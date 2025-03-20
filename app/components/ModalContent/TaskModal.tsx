import { TaskProps } from "@/app/utils/interface";
import Button from "../Button";

import React, { useState } from "react";

const TaskModal = ({ type }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [task, setTask] = useState<TaskProps>(
    type === "add"
      ? {
          title: "",
          description: "",
          status: "",
          subtasks: []
        }
      : {
          title: "A title",
          description: "kjijic",
          status: "done",
          subtasks: []
        }
  );

  return (
    <div className="modal-content-wrapper">
      <h5>{type === "add" ? "Add New Task" : "Edit Task"}</h5>

      <form action="">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            // value={taskTitle}
            placeholder={type === "add" ? "e.g. Take coffee break" : ""}
            required
            // onChange={(e) =>
            //   setTask({
            //     ...task,
            //     title: e.target.value
            //   })
            // }
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            rows={7}
            placeholder={
              type === "add"
                ? "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little"
                : ""
            }
            // value={newTask.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="subtasks">Subtasks</label>
        </div>
        <div>
          <select name="status" id="status">
            <option value="">Select status</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        <Button
          text={type === "add" ? "Create Task" : "Save Changes"}
          btnClass="primary"
          //   fn={type === "add" ? handleSubmitBoardForm() : editExistingBoard()}
        />
      </form>
    </div>
  );
};

export default TaskModal;
