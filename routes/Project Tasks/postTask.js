const express = require("express");
const router = express.Router();

//Route: /api/postTask
router.post("/", async (req, res) => {
  const pool = req.app.get("database").request();

  //Testing variables
  let selectedProjectName = req.body.projectName;
  let taskName = req.body.taskName;
  let taskStatus = req.body.taskStatus;
  let taskAssignees = req.body.taskAssignees;
  let taskStartDate = req.body.taskStartDate;
  let taskEndDate = req.body.taskEndDate;

  //Get project ID to associate with task
  let projectID = await pool.query(
    `select ProjectID from Projects where (ProjectName = '${selectedProjectName}')`
  );

  //Isolate the ID to an integer
  projectID = projectID.recordset[0].ProjectID;

  //Post the task
  let response = await pool.query(`insert into Tasks 
    (TaskName, TaskStatus, TaskAssignees, TaskStartDate, TaskEndDate, ProjectID) 
    values ('${taskName}','${taskStatus}','${taskAssignees}','${taskStartDate}','${taskEndDate}',${projectID})`);

  //Error handling
  if (!(response.rowsAffected[0] >= 1)) {
    res.json({ status: "Error" });
  } else {
    res.json({ status: 200 });
  }
});

module.exports = router;
