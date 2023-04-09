import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../store";
import List from "./List";
import Todo from "./Todo";
import { getTodos, addTodo, deleteTodo, updateTodo } from "../store/actions";

function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const [item, setItem] = useState("");

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleAdd = (item) => {
    if (!item) {
      alert("Empty Todo list");
      return;
    }

    const newItem = {
      id: todos.isEditing ? todos.editId : Math.floor(Math.random() * 100),
      text: item,
    };

    if (todos.isEditing) {
      dispatch(updateTodo(newItem));
    } else {
      dispatch(addTodo(newItem));
    }

    window.location = "/";
    setItem("");
  };

  const handleEdit = (id) => {
    const itemToEdit = todos.itemList.find((item) => item.id === id);
    setItem(itemToEdit.text);
    dispatch(todoActions.isEditing(id));
  };

  const handleRemove = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h3>To do Items</h3>
      <Todo onAdd={handleAdd} text={item} setText={setItem} />
      {todos.itemList.map((item) => (
        <List
          key={item.id}
          id={item.id}
          list={item.text}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      ))}
    </div>
  );
}

export default Todos;
