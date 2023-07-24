express = require("express");
note = require("../models/Note");
const {isAuthenticated} = require ('../helpers/auth')

app = express.Router();

app.get("/notes/add", isAuthenticated, async (req, res) => {
  res.render("notes/new-note");
});

app.post("/notes/new-note",isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please write a title" });
  }
  if (!description) {
    errors.push({ text: "Please write a description" });
  }
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    newNote = new note({ title, description });
    newNote.user = req.user.id
    await newNote.save();
    req.flash('success_msg', 'Note added successfully');
    res.redirect("/notes");
  }
});

app.get("/notes",isAuthenticated, async (req, res) => {
  notes = await note.find({user: req.user.id}).sort({date: 'desc'}).lean();
  res.render("notes/all-notes", {
    notes,
  });
});

app.get("/notes/edit/:id",isAuthenticated, async (req, res) => {
  noteID = await note.findById(req.params.id).lean()
  res.render("notes/edit-note",{
    noteID
  });
});

app.put('/notes/edit-note/:id',isAuthenticated, async (req, res) => {
  const {title, description} = req.body
  noteUpdate = await note.findByIdAndUpdate(req.params.id, {title, description}).lean();
  req.flash('success_msg', 'Note updated successfully');
  res.redirect("/notes");
});

app.delete('/notes/delete/:id',isAuthenticated, async (req, res) =>{
  await note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note deleted successfully');
  res.redirect('/notes');
});

module.exports = app;
