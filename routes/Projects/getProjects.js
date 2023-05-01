const express = require("express");
const router = express.Router();

//Route: /api/getProjects
router.get("/", async (req, res) => {
  const pool = req.app.get("database").request();
  let documents = await pool.query(`select * from Projects`);
  res.json(documents);
});

//Route: /api/getProjects/getTaskCount
router.get("/getTaskCount/:ID", async (req, res) => {
  const pool = req.app.get("database").request();

  let statuses = [
    {
      status: "Queued",
      count: 0,
    },
    {
      status: "Assigned",
      count: 0,
    },
    {
      status: "In Progress",
      count: 0,
    },
    {
      status: "Delayed",
      count: 0,
    },
    {
      status: "Completed",
      count: 0,
    },
  ];

  //Pull info
  let documents = await pool.query(
    `select * from Tasks where ProjectID=${req.params.ID}`
  );

  //Determine the count of each status
  documents.recordset.forEach((task) => {
    //For each status object in that array
    statuses.forEach(statusObject=>{
      //Don't have to worry about breaking the loop because duplicates aren't an issue
      if(statusObject.status === task.TaskStatus){
        statusObject.count += 1;
      }
    });
  });

  //Send back the data for that project
  res.json({
    count: documents.recordset.length,
    statuses: statuses,
  });
});

module.exports = router;
