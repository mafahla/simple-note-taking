const db = require("./config/database");
const express = require("express");         //Import our database config, Express, and Morgan into our project.
const morgan = require("morgan");
const create = require("./routes/create");
const read = require("./routes/read");
const update = require("./routes/update");
const del = require("./routes/delete");

const app = express();


app.set("view engine", "pug");      //Tell Express that our view engine will be Pug.
app.use(express.urlencoded({ extended: true }));        //This middleware parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(morgan("dev"));
app.use("/create",create);
app.use("/read",read);
app.use("/update", update);
app.use("/delete", del);


app.get("/", async (req, res) => {          //Handle the / directory.
  const query = `
    SELECT * FROM notes
    ORDER BY id;
    `;
  const { rows } = await db.query(query);       //Run the query.
  res.render("index", { item: rows });                              //Log out JSON output, which contains the list of our records in the database.
});

app.listen(3000, () => {                //Tell Express to run this app on the port 3000.
  console.log("At port 3000");
});