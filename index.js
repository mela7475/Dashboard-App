const express = require("express");
const app = express();
const path = require("path");
const sql = require("mssql/msnodesqlv8");
const config = require("./config.json");
const poolConfig = new sql.ConnectionPool({
  user: config.user,
  pass: config.pass,
  server: config.server,
  database: config.database,
  options: {
    trustedConnection: true,
  },
});

app.use(express.json());
app.set("port", process.env.PORT || 5000);

//Routes -- make sure to export router in each file
app.use("/api/testing", require("./routes/testing"));
app.use("/api/getProjects", require("./routes/Projects/getProjects"));
app.use("/api/getTasks", require("./routes/Project Tasks/getTasks"));
app.use("/api/postProject", require("./routes/Projects/postProject"));
app.use("/api/postTask", require("./routes/Project Tasks/postTask"));
app.use("/api/editProject", require("./routes/Projects/editProjects"));
app.use("/api/editTask", require("./routes/Project Tasks/editTasks"));
app.use("/api/getInfo", require("./routes/Categories/getInfo"));
app.use("/api/createCategory", require("./routes/Categories/createCategory"));
app.use("/api/getCategories", require("./routes/App/getCategories"));
app.use("/api/getDepartments", require("./routes/App/getDepartments"));
app.use("/api/getManagers", require("./routes/App/getManagers"));
app.use("/api/getAssignees", require("./routes/App/getAssignees"));

//All are needed to prevent crashing on page refresh and serving
//the front end
app.set("views", path.join(__dirname, "views"));
app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//Connect to database and start the app
poolConfig.connect((err, database) => {
  if (err) console.log(err);
  else {
    app.set("database", database);
    app.listen(app.get("port"), () => {
      console.log("Listening on 5000");
    });
  }
});

module.exports = app;
