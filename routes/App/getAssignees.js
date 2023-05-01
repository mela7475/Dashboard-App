const express = require("express");
const router = express.Router();

//Route: /api/getAssignees
router.get("/", async (req, res) => {
  const pool = req.app.get("database").request();
  let assignees = await pool.query(`select TaskAssignees from [Reece-Testing].[dbo].[Tasks]`);
  assignees = assignees.recordset;

  //Get rid of duplicates
  let assigneesList = [];
  assignees.forEach((assignee) => {
    let exists = false;
    assigneesList.forEach((item) => {
      if (item.TaskAssignees === assignee.TaskAssignees) {
        exists = true;
      }
    });

    if (exists === false) {
      assigneesList.push(assignee);
    }
  });

  res.json(assigneesList);
});

module.exports = router;
