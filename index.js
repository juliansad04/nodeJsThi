const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 5300;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));


// const adminRoutes = require("./routes/adminRoutes");
// app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});


app.get("/", (req, res) => {
  res.render("home.ejs");
});
