const express = require("express");
const router = express.Router();

//Route: /api/editProject
router.post("/", async (req, res) => {
  const pool = req.app.get("database").request();

  //Get names
  let projectNames = await pool.query(`select ProjectName,ProjectID from Projects`);

  //Take names out of object array
  let existingProjectNames = [];
  projectNames.recordset.forEach((projectName) => {
    existingProjectNames.push({name: projectName.ProjectName.toLowerCase(), id: projectName.ProjectID});
  });

  //Make sure project name is not duplicate
  let duplicate = false;
  existingProjectNames.forEach(project=>{
    //If the name is a duplicate, but it isn't the same entry, then the name is duplicate
    if(project.name === req.body.projectName.toLowerCase() && project.id !== req.body.projectID){
      duplicate = true;
    }
  });

  //If it's a duplicate
  if (duplicate === true) {
    res.json({ status: "Error" });
  }
  //If it's not a duplicate
  else {
    //Update rows
    let response = await pool.query(
      `update Projects set ProjectName='${req.body.projectName}',ProjectCategory='${req.body.projectCategory}',ProjectManager='${req.body.projectManager.value}',Department='${req.body.department.value}' where ProjectID=${req.body.projectID}`
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
  }
});

module.exports = router;
