const express = require("express");
const router = express.Router();

//Route: /api/getCategories
router.get("/", async (req, res) => {
  const pool = req.app.get("database").request();
  let documents = await pool.query(`select CategoryName from [Reece-Testing].[dbo].[Categories]`);
  res.json(documents.recordset);
});

module.exports = router;
