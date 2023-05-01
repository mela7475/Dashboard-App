const express = require("express");
const router = express.Router();

//Route: /api/getInfo/getTotals
router.get("/getTotals", async (req, res) => {
  const pool = req.app.get("database").request();
  //Get all instructional categories
  let instructionalCategories = await pool.query(
    `select CategoryName from [Reece-Testing].[dbo].[Categories] where MasterCategoryID=1`
  );
  instructionalCategories = instructionalCategories.recordset.length;
  
  //Get all noninstructional categories
  let noninstructionalCategories = await pool.query(
    `select CategoryName from [Reece-Testing].[dbo].[Categories] where MasterCategoryID=2`
  );
  noninstructionalCategories = noninstructionalCategories.recordset.length;

  res.json({
    instructionalTotal: instructionalCategories,
    noninstructionalTotal: noninstructionalCategories,
  });
});

//Route: /api/getInfo/getInstructionalCategories
router.get("/getInstructionalCategories", async (req, res) => {
  const pool = req.app.get("database").request();

  //Get all instructional categories
  let categories = await pool.query(
    `select CategoryName from [Reece-Testing].[dbo].[Categories] where MasterCategoryID=1`
  );
  categories = categories.recordset;

  //Get all projects
  let projects = await pool.query(
    `select ProjectName, ProjectCategory from Projects`
  );
  projects = projects.recordset;

  //Generate a base array of objects for the projects
  let baseProjectArray = [];
  projects.forEach((project) => {
    baseProjectArray.push({
      projectName: project.ProjectName,
      taskCount: 0,
      projectCategory: project.ProjectCategory,
    });
  });

  //Get all projects and tasks
  let projectsAndTasks = await pool.query(
    `select Projects.ProjectName, Projects.ProjectID, Projects.ProjectCategory, Tasks.TaskID
    from Projects
    inner join Tasks on Projects.ProjectID=Tasks.ProjectID`
  );
  projectsAndTasks = projectsAndTasks.recordset;

  //Combine the data
  let categoryData = [];
  categories.forEach((category) => {
    projectsAndTasks.forEach((object) => {
      //Project is in the same category
      if (object.ProjectCategory === category.CategoryName) {
        //add 1 to the taskCount field
        baseProjectArray.forEach((entry) => {
          if (entry.projectName === object.ProjectName) {
            entry.taskCount++;
          }
        });
      }
    });

    //Once done, add data to categoryData
    categoryData.push({
      category: category.CategoryName,
      tableData: baseProjectArray,
    });
  });

  //Separate the table data via the category
  categoryData.forEach((category) => {
    let newTableData = [];
    category.tableData.forEach((entry) => {
      if (entry.projectCategory === category.category) {
        newTableData.push(entry);
      }
    });
    category.tableData = newTableData;
  });

  res.json(categoryData);
});

//Route: /api/getInfo/getNoninstructionalCategories
router.get("/getNoninstructionalCategories", async (req, res) => {
  const pool = req.app.get("database").request();

  //Get all noninstructional categories
  let categories = await pool.query(
    `select CategoryName from [Reece-Testing].[dbo].[Categories] where MasterCategoryID=2`
  );
  categories = categories.recordset;

  //Get all projects
  let projects = await pool.query(
    `select ProjectName, ProjectCategory from Projects`
  );
  projects = projects.recordset;

  //Generate a base array of objects for the projects
  let baseProjectArray = [];
  projects.forEach((project) => {
    baseProjectArray.push({
      projectName: project.ProjectName,
      taskCount: 0,
      projectCategory: project.ProjectCategory,
    });
  });

  //Get all projects and tasks
  let projectsAndTasks = await pool.query(
    `select Projects.ProjectName, Projects.ProjectID, Projects.ProjectCategory, Tasks.TaskID
    from Projects
    inner join Tasks on Projects.ProjectID=Tasks.ProjectID`
  );
  projectsAndTasks = projectsAndTasks.recordset;

  //Combine the data
  let categoryData = [];
  categories.forEach((category) => {
    projectsAndTasks.forEach((object) => {
      //Project is in the same category
      if (object.ProjectCategory === category.CategoryName) {
        //add 1 to the taskCount field
        baseProjectArray.forEach((entry) => {
          if (entry.projectName === object.ProjectName) {
            entry.taskCount++;
          }
        });
      }
    });

    //Once done, add data to categoryData
    categoryData.push({
      category: category.CategoryName,
      tableData: baseProjectArray,
    });
  });

  //Separate the table data via the category
  categoryData.forEach((category) => {
    let newTableData = [];
    category.tableData.forEach((entry) => {
      if (entry.projectCategory === category.category) {
        newTableData.push(entry);
      }
    });
    category.tableData = newTableData;
  });

  res.json(categoryData);
});

module.exports = router;
