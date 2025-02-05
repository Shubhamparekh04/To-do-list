const express = require("express");
const port = 8081;
const app = express();
app.set("view engine", "ejs");

let tasks = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/create", (req, res) => {
  const { id, task } = req.body;
  tasks.push({ id, task});
  res.redirect("/");
});


app.get('/delete', (req, res) => {
  const taskId = req.query.id;
  tasks = tasks.filter(task => task.id !== taskId); 
  res.redirect('/'); 
});

app.get('/edit', (req, res) => {
  const taskId = req.query.id;
  const singleTask = tasks.find(task => task.id === taskId);
  if (singleTask) {
      res.render('edit', { singleTask });
  } else {
      res.redirect('/'); 
  }
});

app.post('/edit', (req, res) => {
  const { id, task } = req.body; 
  let taskToUpdate = tasks.find(t => t.id === id);
  if (taskToUpdate) {
      taskToUpdate.task = task; 
  }
  res.redirect('/'); 
});

app.listen(port, (err) => {
  if (!err) {
    console.log("Server run on : http://localhost:" + port);
  }
});
