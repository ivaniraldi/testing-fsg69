const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const { getBooks, deleteBook, verificarCredenciales } = require("./consultas");

app.listen(3000, console.log("SERVER ON"));
app.use(cors());
app.use(express.json());


app.post("/login", async (req, res) => {
  try {
  const { email, password } = req.body;
  await verificarCredenciales(email, password);
  const token = jwt.sign({ email }, "az_AZ");
  res.send(token);
  } catch (error) {
  console.log(error);
  res.status(error.code || 500).send(error);
  }
 });
 
 app.delete("/books/:id", async (req, res) => {
  try {
  const { id } = req.params;
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  jwt.verify(token, "az_AZ");
  const { email } = jwt.decode(token);
  await deleteBook(id);
  res.send(`El usuario ${email} ha eliminado el libro con id
 ${id}`);
  } catch (error) {
  res.status(error.code || 500).send(error);
  }
 });
 

app.get("/books", async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});
