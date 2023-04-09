import React from "react";
import { useSelector } from "react-redux";

const Todo = ({ text, setText, onAdd }) => {
  const isEditing = useSelector((state) => state.todo.isEditing);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="add new item"
        name="todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>{isEditing ? "Edit" : "Add"}</button>
    </form>
  );
};

export default Todo;
