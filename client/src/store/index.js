import { createSlice } from "@reduxjs/toolkit";
import { addTodo, deleteTodo, getTodos, updateTodo } from "./actions";
// Thunk functions - allows asynchronisation in the redux
const initialState = {
  itemList: [],
  isEditing: false,
  editId: null,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   state.itemList.push(action.payload);
    //   // console.log(state.itemList);
    // },
    // removeTodo: (state, action) => {
    //   const id = action.payload;
    //   state.itemList = state.itemList.filter((item) => item.id !== id);
    // },
    isEditing: (state, action) => {
      state.editId = action.payload;
      state.isEditing = !state.isEditing;
    },
    // editTodo: (state, action) => {
    //   //get the id of the item to edit
    //   const { id, text } = action.payload;
    //   //filter out the previous version of the list
    //   const todos = state.itemList.filter((item) => item.id !== id);
    //   const newItem = {
    //     id: id,
    //     text: text,
    //   };
    //   todos.push(newItem);
    //   state.itemList = todos;
    //   state.isEditing = !state.isEditing;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        const newState = {
          ...state,
          itemList: action.payload,
        };
        return newState;
      })
      .addCase(addTodo.pending, (state, action) => {
        console.log("add pending");
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.itemList.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.itemList = state.itemList.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        console.log("updated");
      });
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
