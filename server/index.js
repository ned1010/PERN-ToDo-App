const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const pool = require("./database.js");
const PORT = process.env.port || 4000; //port for the server

const app = express();

//Middleware
//CORS allow secure request and data transfer between server and client
app.use(cors());
app.use(express.json()); // Enable easier parsing of incoming JSON data from 'request.body'
app.use(bodyParser.urlencoded({ extended: false }));
//Routing
app.get("/", (req, res) => {
  res.send("You are good");
});

//add a new item to the the list
app.post("/todos", async (req, res) => {
  try {
    // const task = req.body;
    const { id, text } = req.body;
    const newTask = await pool.query(
      "INSERT INTO todo VALUES ($1, $2) RETURNING *",
      [id, text]
    ); //returning * allows all other items to display as well
    res.json(newTask.rows);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Bad request");
  }
});

//Get all the list
app.get("/todos", async (req, res) => {
  // res.send("you are will get all the files");
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    // res.json(allTodos); //send all the allTodos to the client/browser
    res.json(allTodos.rows);
  } catch (err) {
    //if there is error send the error message
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get a specific item
app.get("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    console.log(todoId);

    const newItem = await pool.query("SELECT * FROM todo WHERE id=$1", [
      todoId,
    ]);
    //check if the result is empty
    if (newItem.rows.length === 0) {
      res.status(505).send("Server error");
    }
    // console.log(newItem.rows[0]);
    res.json(newItem.rows[0]);
  } catch (err) {
    console.log(err);
    // res.status(500).send("Server error");
    res.json(err);
  }
});

//update item
app.put("/todos/:id", async (req, res) => {
  console.log("request to server", req.body);
  try {
    const id = req.params.id;
    const { text } = req.body;
    // console.log(task.text);
    // console.log(id);
    const updateItem = await pool.query(
      "UPDATE todo SET text = $1 WHERE id=$2",
      [text, id]
    );
    res.json("Updated task");
  } catch (err) {
    console.error(err.message);
    res.status(404).send("Invalid request");
  }
});
//delete an item from the database
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    const taskToDelete = await pool.query("DELETE FROM todo WHERE id=$1", [id]);
    res.json("Item is removed");
  } catch (err) {
    console.error(err.message);
    res.status(400).send("INvalid request");
  }
});
//Backend server port
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
