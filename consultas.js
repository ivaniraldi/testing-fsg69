const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "iraldi11",
  database: "gestion_libros",
  port: 5432,
  allowExitOnIdle: true,
});

const getBooks = async () => {
  const { rows: boks } = await pool.query("SELECT * FROM books");
  return boks;
};

const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const values = [email, password];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount) throw { code: 404, message: "No se encontró ningún usuario con estas credenciales" };
 };

 const deleteBook = async (id) => {
  const consulta = "DELETE FROM books WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount) throw { code: 404, message: "No se encontró ningún libro con este ID" };
 };

 const deleteEvento = async (id) => {
   const consulta = "DELETE FROM eventos WHERE id = $1";
  const values = [id];
   const { rowCount } = await pool.query(consulta, values);
   if (!rowCount) throw { code: 404, message: "No se encontró ningún evento con este ID" };
};

module.exports = { getBooks, deleteEvento, verificarCredenciales, deleteBook };
