const express = require("express");
const router = express.Router();

//Route: /api/postProject
router.post("/", async (req, res) => {
  const pool = req.app.get("database").request();

  //For easy reading
  let inputtedName = req.body.name;
  let inputtedCategory = req.body.category;
  let inputtedManager = req.body.manager.value;
  let inputtedDepartment = req.body.department.value;

  //Get names
  let projectNames = await pool.query(`select ProjectName from Projects`);

  //Take names out of object array
  let existingProjectNames = [];
  projectNames.recordset.forEach((projectName) => {
    existingProjectNames.push(projectName.ProjectName.toLowerCase());
  });

  //Make sure project name is not duplicate
  //If it's a duplicate
  if (existingProjectNames.includes(inputtedName.toLowerCase())) {
    res.json({ status: "Error" });
  }
  //If it's not a duplicate
  else {
    response = await pool.query(
      `insert into Projects (ProjectName,ProjectCategory,ProjectManager,Department) values ('${inputtedName}','${inputtedCategory}','${inputtedManager}','${inputtedDepartment}')`
    );
    //Error handling
    //If no rows were added
    if (!(response.rowsAffected[0] >= 1)) {
      res.json({ status: "Error" });
    }
    //If rows were added
    else {
      res.json({ status: 200 });
    }
  }
});

module.exports = router;
