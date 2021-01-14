import React, { useEffect, useRef } from "react";

let editTaskName = (props) => (
  <div className="stack-small">
    <div className="form-group">
      <label className="todo-label" htmlFor={props.id}>
        New name for {props.name}
      </label>
      <input
        id={props.id}
        className="todo-text"
        type="text"
        placeholder="Enter new name here ...."
        onChange={props.newTaskName}
        ref={props.fieldRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") props.saveNewTask();
        }}
      />
    </div>
    <div className="btn-group">
      <button
        type="button"
        className="btn todo-cancel"
        onClick={props.cancelEditTask}
      >
        Cancel
        <span className="visually-hidden">renaming {props.name}</span>
      </button>
      <button
        type="submit"
        className="btn btn__primary todo-edit"
        onClick={props.saveNewTask}
      >
        Save
        <span className="visually-hidden">new name for {props.name}</span>
      </button>
    </div>
  </div>
);

let viewTask = (props) => (
  <div className="stack-small">
    <div className="c-cb">
      <input
        id={props.id}
        type="checkbox"
        defaultChecked={props.completed}
        onClick={props.updateStatus}
      />
      <label className="todo-label" htmlFor={props.id}>
        {props.name}
      </label>
    </div>
    <div className="btn-group">
      <button
        type="button"
        className="btn"
        onClick={props.editTask}
        ref={props.buttonRef}
      >
        Edit <span className="visually-hidden">{props.name}</span>
      </button>
      <button
        type="button"
        className="btn btn__danger"
        onClick={props.deleteTask}
      >
        Delete <span className="visually-hidden">{props.name}</span>
      </button>
    </div>
  </div>
);
const Todo = (props) => {
  // Hook
  function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();

    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
  }
  const hasBeenEdited = usePrevious(props.isEditing);
  /** check component’s previous state before focus on button */
  useEffect(() => {
    if (!hasBeenEdited && props.isEditing) {
      props.fieldRef.current.focus();
    }
    if (hasBeenEdited && !props.isEditing) {
      props.buttonRef.current.focus();
    }
  }, [hasBeenEdited, props.buttonRef, props.fieldRef, props.isEditing]);

  /** this code has focus on edit button when load page */
  // useEffect(() => {
  //   if (props.isEditing) {
  //     props.fieldRef.current.focus();
  //   } else {
  //     props.buttonRef.current.focus();
  //   }
  // }, [props.buttonRef, props.fieldRef, props.isEditing]);
  return (
    <li className="todo stack-small">
      {props.isEditing ? editTaskName(props) : viewTask(props)}
    </li>
  );
};

export default Todo;
