const express = require("express");
const router = express.Router();

//Route: /api/getTasks
router.get("/", async (req, res) => {
  const pool = req.app.get("database").request();
  let documents = await pool.query(`select * from Tasks`);
  res.json(documents);
});

//Route: /api/getTasks/getProjects
router.get("/getProjects/:ID", async (req, res) => {
  const pool = req.app.get("database").request();
  let documents = await pool.query(`select ProjectName, ProjectCategory from Projects where ProjectID=${req.params.ID}`);
  res.json(documents.recordset);
});

//Route: /api/getTasks/getProjectNames
router.get('/getProjectNames', async (req,res)=>{
  const pool = req.app.get("database").request();
  let documents = await pool.query(`select ProjectName from Projects`);
  res.json(documents.recordset);
});

module.exports = router;
