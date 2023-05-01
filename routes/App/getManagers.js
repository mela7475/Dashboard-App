const express = require("express");
const router = express.Router();

//Route: /api/getManagers
router.get("/", async (req, res) => {
  const pool = req.app.get("database").request();

  let managers = await pool.query(
    `select ProjectManager from [Reece-Testing].[dbo].[Projects]`
  );
  managers = managers.recordset;

  //Get rid of duplicates
  let managersList = [];
  managers.forEach((manager) => {
    let exists = false;
    managersList.forEach((item) => {
      if (item.ProjectManager === manager.ProjectManager) {
        exists = true;
      }
    });

    if (exists === false) {
      managersList.push(manager);
    }
  });

  res.json(managersList);
});

module.exports = router;
