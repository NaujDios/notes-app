express = require("express");
note = require("../models/Note");

app = express.Router();

app.get("/", async (req, res) => {
  tasks = await note.find();
  res.render("index", {
    tasks: tasks,
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/tasks/add", async (req, res) => {
  tarea = note(req.body);
  taskSaved = await tarea.save();
  console.log(taskSaved);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  taskID = await note.findById(req.params.id);
  res.render("edit.ejs", {
    task: taskID,
  });
});

app.post("/edit/:id", async (req, res) => {
  await note.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  await note.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

app.get("/toggleDone/:id", async (req, res) => {
  taskDone = await note.findById(req.params.id);
  taskDone.done = !taskDone.done;
  await taskDone.save();
  res.redirect("/");
});

module.exports = app;
