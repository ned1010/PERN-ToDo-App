import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000/todos";

//get all the todos
export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await axios.get(baseURL);
  return response.data;
});

//add a todo to the database
export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(baseURL, todo);
  return response.data;
});

//remove item from
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  //axios send the id to url
  await axios.delete(`${baseURL}/${id}`);
  return id;
});

//edit item from the database
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (newTodo) => {
    const response = await axios.put(`${baseURL}/${newTodo.id}`, newTodo);
  }
);
