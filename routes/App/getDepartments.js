const express = require("express");
const router = express.Router();

//Route: /api/getDepartments
router.get("/", async (req, res) => {
  const pool = req.app.get("database").request();

  let departments = await pool.query(
    `select Department from [Reece-Testing].[dbo].[Projects]`
  );
  departments = departments.recordset;

  //Get rid of duplicates
  let departmentsList = [];
  departments.forEach((department) => {
    let exists = false;
    departmentsList.forEach((item) => {
      if (item.Department === department.Department) {
        exists = true;
      }
    });

    if (exists === false) {
      departmentsList.push(department);
    }
  });

  res.json(departmentsList);
});

module.exports = router;
