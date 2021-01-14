import React from "react";

const Form = (props) => {
  return (
    <form onSubmit={props.submit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          <h2>What needs to be done?</h2>
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        placeholder="Enter Name Here..."
        value={props.value}
        onChange={props.addTaskName}
      />
      <button
        type="submit"
        className="btn btn__primary btn__lg"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
