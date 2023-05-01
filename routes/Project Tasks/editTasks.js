const express = require("express");
const router = express.Router();

//Route: /api/editTask
router.post("/", async (req, res) => {
  const pool = req.app.get("database").request();

  //Update task
  let response = await pool.query(
    `update Tasks set TaskName='${req.body.taskName}',TaskStatus='${req.body.taskStatus}',TaskAssignees='${req.body.taskAssignees}',TaskStartDate='${req.body.taskStartDate}',TaskEndDate='${req.body.taskEndDate}' where TaskID=${req.body.taskID}`
  );

  //Error handling
  //If no rows were edited
  if (!(response.rowsAffected[0] >= 1)) {
    res.json({ status: "Error" });
  }
  //If rows were edited
  else {
    res.json({ status: 200 });
  }
});

module.exports = router;
