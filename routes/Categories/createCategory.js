const express = require("express");
const router = express.Router();

//Route: /api/createCategory
router.post("/", async (req, res) => {
  const pool = req.app.get("database").request();

  //Query
  let response = await pool.query(
    `insert into [Reece-Testing].[dbo].[Categories] (CategoryName, MasterCategoryID) values ('${req.body.categoryName}',${req.body.masterCategory})`
  );

  //Error handling
  if (!(response.rowsAffected[0] >= 1)) {
    res.json({ status: "Error" });
  } else {
    res.json({ status: 200 });
  }
});

module.exports = router;
