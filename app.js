const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
const path = require("path");

mongoose.set('strictQuery', false); // Add this line

const staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

mongoose.connect("mongodb+srv://om:pharate11@cluster0.nnceu.mongodb.net/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.error(err));

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
