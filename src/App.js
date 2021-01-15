/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect, useRef } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";

const App = (props) => {
  let filters = {
    All: () => true,
    Active: (task) => !task.completed,
    Completed: (task) => task.completed,
  };
  const [tasks, setTasks] = useState(props.tasks);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [filter, setFilter] = useState("All");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const listHeadingRef = useRef(null);

  let taskList = tasks
    .filter(filters[filter])
    .map((task) => (
      <Todo
        name={task.name}
        completed={task.completed}
        id={task.id}
        filter={filter}
        key={task.id}
        isEditing={task.isEditing}
        updateStatus={() => updateTaskStatus(task.id)}
        deleteTask={() => deleteTask(task.id)}
        editTask={() => editTaskPage(task.id)}
        cancelEditTask={() => editTaskPage(task.id)}
        newTaskName={(e) => addNameHandler(e, task.isEditing)}
        saveNewTask={(e) => updateTaskName(task.id)}
        fieldRef={editFieldRef}
        buttonRef={editButtonRef}
      />
    ));

  let countTask = tasks.filter(filters[filter]).length;

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const filterList = Object.keys(filters).map((filter) => (
    <FilterButton
      name={filter}
      key={filter}
      changedTab={(e) => changedTab(e)}
    />
  ));
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      // Created id for Task with nanoid
      id: nanoid(),
      name: name,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  // Observe the length of the array if changed,
  // delete all characters in the input box
  useEffect(() => {
    setName("");
  }, [tasks.length]);

  const addNameHandler = (event, isEditing) => {
    if (isEditing) {
      setEditName(event.target.value);
    } else {
      setName(event.target.value);
    }
  };
  const updateTaskStatus = (id) => {
    let updatedTask = tasks.map((e) => {
      // Find updatedTask by id
      if (e.id === id) {
        e.completed = !e.completed;
      }
      return e;
    });
    setTasks(updatedTask);
  };

  const deleteTask = (id) => {
    let newList = tasks.filter((e) => e.id !== id);
    setTasks(newList);
  };

  const editTaskPage = (id) => {
    let data = tasks.map((e) => {
      if (e.id === id) {
        e.isEditing = !e.isEditing;
      }
      return e;
    });
    setTasks(data);
  };

  const changedTab = (e) => {
    setFilter(e.target.innerText);
  };
  const updateTaskName = (id) => {
    let updateTask = tasks.map((task) => {
      if (task.id === id) {
        task.name = editName;
        task.isEditing = false;
      }
      return task;
    });
    setTasks(updateTask);
  };

  // Subcribe tasks.length. If delete 1 ele, focus to the heading
  const prevTaskLength = usePrevious(tasks.length);
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <Form
        value={name}
        submit={(e) => handleSubmit(e)}
        addTaskName={(event) => addNameHandler(event)}
      />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {countTask <= 1 ? `${countTask} task` : `${countTask} tasks`}{" "}
        {filter === "All" ? "" : filter.toLowerCase()}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
};

export default App;
