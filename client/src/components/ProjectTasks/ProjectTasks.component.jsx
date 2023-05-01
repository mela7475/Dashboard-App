import React, { useState, useEffect } from "react";
import employees from "../employees.json";
import TaskModal from "./TaskModal.component";
import EditTaskModal from "./EditTaskModal.component";
import TaskTableEntry from "./TaskTableEntry.component";
import AlertModal from '../AlertModal/AlertModal.component';
import Axios from "axios";
import Moment from "moment";
import DatePicker from 'react-date-picker';
import { CarouselItem } from "react-bootstrap";

export default function ProjectTasks(props) {
  //For EditTaskModal.Component.jsx
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedTaskTitle, setSelectedTaskTitle] = useState("");
  const [selectedTaskCategory, setSelectedTaskCategory] = useState("");
  const [selectedTaskProject, setSelectedTaskProject] = useState("");
  const [selectedTaskStatus, setSelectedTaskStatus] = useState("");
  const [selectedTaskAssigned, setSelectedTaskAssigned] = useState([]);
  const [selectedTaskStartDate, setSelectedTaskStartDate] = useState("");
  const [isEditDisabled, setEditIsDisabled] = useState(false);
  
  //For TaskModal.Component.jsx
  const [isDisabled, setIsDisabled] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [taskTitleModal, setTaskTitleModal] = useState("");
  const [categoryModal, setCategoryModal] = useState("");
  const [projectModal, setProjectModal] = useState("");
  const [statusModal, setStatusModal] = useState("");
  
  //For multiple files
  const [projectDropdownArray, setProjectDropdownArray] = useState([]);
  const [
  assigneeNamesCreatableSelect,
  setAssigneeNamesCreatableSelect,
  ] = useState([]);

  //For filtering
  const [categoryFilter, setCategoryFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [dateFilterStart, setDateFilterStart] = useState("");
  const [dateFilterEnd, setDateFilterEnd] = useState("");
  const [columnToSort, setColumnToSort] = useState("");
  const [columnSortOrder, setColumnSortOrder] = useState(false);

  // Alert Modal
  const [show, setShow] = useState(false);
  const [alertIcon, setalertIcon] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertText, setalertText] = useState("");
  const [alertColor, setalertColor] = useState("");
  const handleClose = () => setShow(false);
  
  //Other
  const [taskData, setTaskData] = useState([]);
  const [projectIDSearch, setProjectIDSearch] = useState("");
  const [searchField, setSearchField] = useState("");
  const [newTaskStartDate, setNewTaskStartDate] = useState("");
  const [selectedTaskEndDate, setSelectedTaskEndDate] = useState("");
  const [newTaskEndDate, setNewTaskEndDate] = useState("");
  const [searchTable, setSearchTable] = useState([]);
  const [taskCount, setTaskCount] = useState("");
  const [categoryNames, setCategoryNames] = useState([]);
  const [assigneeNames, setAssigneeNames] = useState([]);

  useEffect(() => {
    //Get tasks and project names
    Axios.get("/api/getTasks").then((response) => {
      //Allows editing
      let data = response.data.recordset;

      //Makes sure the data is updated before displaying
      let completeTheLoop = new Promise((resolve, reject) => {
        let taskIndex = 0;
        data.forEach((task) => {
          //Make date readable
          task.TaskStartDate = task.TaskStartDate.substring(0, 10);
          task.TaskEndDate = task.TaskEndDate.substring(0, 10);
          Axios.get("/api/getTasks/getProjects/" + task.ProjectID).then(
            (response) => {
              //Set values
              task.Category = response.data[0].ProjectCategory;
              task.Project = response.data[0].ProjectName;

              //Resolve promise when done with last task
              if (data.length - 1 === taskIndex) {
                resolve();
              } else {
                taskIndex++;
              }
            }
          );
        });
      });
      //This requires the forEach loop to finish before setting the table data
      completeTheLoop.then(() => {
        setTaskData(data);
      });
    });

    getDropdownMenuData();
  }, []);

  function getDropdownMenuData() {
    //Get category names for drop down menus
    Axios.get("/api/getCategories").then((response) => {
      setCategoryNames(response.data);
    });

    //Get project names for the drop downs
    Axios.get("/api/getTasks/getProjectNames").then((response) => {
      setProjectDropdownArray(response.data);
    });

    //Get assignee names for the drop downs
    Axios.get("/api/getAssignees").then((response) => {
      setAssigneeNames(response.data);
      //Convert to usable form for creatable select components
      let data = [];
      response.data.forEach((assignee) => {
        data.push({
          value: assignee.TaskAssignees,
          label: assignee.TaskAssignees,
        });
      });
      setAssigneeNamesCreatableSelect(data);
    });
  }

  //Post a task
  function handlePostTask() {
    Axios.post("/api/postTask", {
      projectName: projectModal,
      taskName: taskTitleModal,
      taskStatus: statusModal,
      taskAssignees: assignees.value,
      taskStartDate: newTaskStartDate,
      taskEndDate: newTaskEndDate,
    }).then(() => {
      getTasks();
      handleResetTaskModal();
      getDropdownMenuData();
      setShow(true);
      setalertTitle("Success");
      setalertText("Task has been successfully added");
      setalertIcon("fas fa-check mr-3 text-light");
      setalertColor("bg-alert-success");
    });
  }

  function getTasks() {
    Axios.get("/api/getTasks").then((response) => {
      //Allows editing
      let data = response.data.recordset;

      //Makes sure the data is updated before displaying
      let completeTheLoop = new Promise((resolve, reject) => {
        let taskIndex = 0;
        data.forEach((task) => {
          //Make date readable
          task.TaskStartDate = task.TaskStartDate.substring(0, 10);
          task.TaskEndDate = task.TaskEndDate.substring(0, 10);
          Axios.get("/api/getTasks/getProjects/" + task.ProjectID).then(
            (response) => {
              //Set values
              task.Category = response.data[0].ProjectCategory;
              task.Project = response.data[0].ProjectName;

              //Resolve promise when done with last task
              if (data.length - 1 === taskIndex) {
                resolve();
              } else {
                taskIndex++;
              }
            }
          );
        });
      });
      //This requires the forEach loop to finish before setting the table data
      completeTheLoop.then(() => {
        setTaskData(data);
      });
    });

    //Get project names for the drop downs
    Axios.get("/api/getTasks/getProjectNames").then((response) => {
      setProjectDropdownArray(response.data);
    });
  }

  function editTask() {
    Axios.post("/api/editTask", {
      taskID: selectedTask.TaskID,
      taskName: selectedTaskTitle,
      taskStatus: selectedTaskStatus,
      taskAssignees: selectedTaskAssigned.value,
      taskStartDate: newTaskStartDate,
      taskEndDate: newTaskEndDate,
    })
      .then(() => {
        setShow(true);
        setalertTitle("Success");
        setalertText("Task has been successfully updated");
        setalertIcon("fas fa-check mr-3 text-light");
        setalertColor("bg-alert-success");
        getTasks();
        getDropdownMenuData();
      })
      .catch(() => {
        setShow(true);
        setalertTitle("Error");
        setalertText("There was a problem updating the task");
        setalertIcon("fas fa-exclamation-triangle mr-3 text-light");
        setalertColor("bg-alert-error");
      });
  }

  function handleModalStartDateChange(event) {
    setNewTaskStartDate(Moment(event).format("YYYY-MM-DD"));
    setSelectedTaskStartDate(event);
  }

  function handleModalEndDateChange(event) {
    setNewTaskEndDate(Moment(event).format("YYYY-MM-DD"));
    setSelectedTaskEndDate(event);
  }

  function handleStartDateChange(event) {
    setNewTaskStartDate(Moment(event).format("YYYY-MM-DD"));
    setStartDate(event);
  }

  function handleEndDateChange(event) {
    setNewTaskEndDate(Moment(event).format("YYYY-MM-DD"));
    setEndDate(event);
  }

  function handleassignees(option) {
    if (option === null) {
      setAssignees([]);
    } else {
      //Get rid of special characters
      option = {
        value: option.value.replace(/[^\w\s]/gi, ""),
        label: option.label.replace(/[^\w\s]/gi, ""),
      };
      setAssignees(option);
    }
  }

  function handleAssigneeSelect(option) {
    if (option === null) {
      setSelectedTaskAssigned([]);
    } else {
      //Get rid of special characters
      option = {
        value: option.value.replace(/[^\w\s]/gi, ""),
        label: option.label.replace(/[^\w\s]/gi, ""),
      };
      setSelectedTaskAssigned(option);
    }
  }

  function handleResetTaskModal() {
    setAssignees([]);
    setStartDate("");
    setEndDate("");
    setTaskTitleModal("");
    setCategoryModal("");
    setProjectModal("");
    setStatusModal("");
  }

  function handleFilterReset() {
    setProjectIDSearch("");
    setSearchField("");
    setCategoryFilter("");
    setProjectFilter("");
    setStatusFilter("");
    setAssigneeFilter("");
    setColumnToSort("");
    setDateFilterEnd("");
    setDateFilterStart("");
  }

  function handleSelectedTask(index) {
    //Match employee list items with assignee on task
    let assignedEmployees = [];
    employees.forEach((employee) => {
      if (employee.value === index.TaskAssignees) {
        assignedEmployees.push(employee);
      }
    });

    setSelectedTask(index);
    setSelectedTaskTitle(index.TaskName);
    setSelectedTaskCategory(index.Category);
    setSelectedTaskProject(index.Project);
    setSelectedTaskStatus(index.TaskStatus);
    setSelectedTaskAssigned({
      value: index.TaskAssignees,
      label: index.TaskAssignees,
    });
    setSelectedTaskStartDate(Moment(index.TaskStartDate).toDate());
    setNewTaskStartDate(Moment(index.TaskStartDate).format("YYYY-MM-DD"));
    setSelectedTaskEndDate(Moment(index.TaskEndDate).toDate());
    setNewTaskEndDate(Moment(index.TaskEndDate).format("YYYY-MM-DD"));
  }

  // defines the color for the task status
  function handleStatusColor(priority) {
    const prefix = "fas fa-circle mr-2 text-";

    // eslint-disable-next-line default-case
    switch (priority) {
      case "Queued":
        return prefix + "info";
      case "Assigned":
        return prefix + "primary";
      case "In Progress":
        return prefix + "warning";
      case "Delayed":
        return prefix + "danger";
      case "Completed":
        return prefix + "success";
    }
  }

  useEffect(() => {
    let taskProjectLink = props.history.location.projectName;
    let taskCategoryLink = props.history.location.category;

    if (
      taskProjectLink !== null &&
      taskProjectLink !== undefined &&
      taskProjectLink !== ""
    ) {
      setProjectFilter(taskProjectLink);
    } else if (
      taskCategoryLink !== null &&
      taskCategoryLink !== undefined &&
      taskCategoryLink !== ""
    ) {
      setCategoryFilter(taskCategoryLink);
    }
  }, [props.history.location.projectName, props.history.location.category]);

  function handleSortTable(columnName) {
    setColumnToSort(columnName);
    setColumnSortOrder(!columnSortOrder);
  }

  useEffect(() => {
    var filteredTable = taskData;

    // Filter task table by category
    if (categoryFilter !== "") {
      filteredTable = taskData.filter((data) =>
        data.Category.includes(categoryFilter)
      );
    }

    // Filter task table by project
    if (projectFilter !== "") {
      filteredTable = filteredTable.filter((data) =>
        data.Project.includes(projectFilter)
      );
    }

    // Filter task table by status
    if (statusFilter !== "") {
      filteredTable = filteredTable.filter((data) =>
        data.TaskStatus.includes(statusFilter)
      );
    }

    // Filter task table by assignee
    if (assigneeFilter !== "") {
      filteredTable = filteredTable.filter((data) =>
        data.TaskAssignees.includes(assigneeFilter)
      );
    }

    // Filter task table by task ids
    if (projectIDSearch !== "") {
      filteredTable = filteredTable.filter(
        (data) => data.ProjectID.toString() === projectIDSearch
      );
    }

    //Sort by date range
    //If dateFilterEnd is not blank
    if (dateFilterEnd !== "") {
      //Convert the dates using moment to compare them
      let dateFilterStartMomentConversion = Moment(dateFilterStart).format(
        "YYYY-MM-DD"
      );
      let dateFilterEndMomentConversion = Moment(dateFilterEnd).format(
        "YYYY-MM-DD"
      );
      //Make sure dateFilterEnd isn't before dateFilterStart
      if (dateFilterEndMomentConversion >= dateFilterStartMomentConversion) {
        //Set the filter
        filteredTable = filteredTable.filter((data)=>(
          data.TaskStartDate >= dateFilterStartMomentConversion && data.TaskEndDate <= dateFilterEndMomentConversion
        ));
      }
      //If it isn't
      else {
        //Show a message and reset the fields
        alert("Please make sure your start date is before the end date");
        setDateFilterStart("");
        setDateFilterEnd("");
      }
    }

    let filter = filteredTable.filter((data) =>
      data.TaskName.toLowerCase().includes(searchField.toLowerCase())
    );

    //Get rid of deleted tasks
    let filterFinal = [];
    filter.forEach((task) => {
      if (task.TaskStatus !== "Deleted") {
        filterFinal.push(task);
      }
    });

    let textSort = [
      "TaskName",
      "Category",
      "Project",
      "TaskStatus",
      "TaskAssignees",
    ];

    //Sorting here
    if (columnToSort !== "") {
      //Determine type of sort by columnName
      if (textSort.includes(columnToSort)) {
        if (columnSortOrder === true) {
          //Sort by text ascending
          filterFinal.sort((nameToCompare1, nameToCompare2) => {
            var nameA = nameToCompare1[columnToSort].toLowerCase();
            var nameB = nameToCompare2[columnToSort].toLowerCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // if equal
            return 0;
          });
        } else {
          //Sort by text descending
          filterFinal.sort((nameToCompare1, nameToCompare2) => {
            var nameA = nameToCompare1[columnToSort].toLowerCase();
            var nameB = nameToCompare2[columnToSort].toLowerCase();
            if (nameA > nameB) {
              return -1;
            }
            if (nameA < nameB) {
              return 1;
            }

            // if equal
            return 0;
          });
        }
      } else if (columnToSort === "TaskStartDate" || columnToSort === "TaskEndDate"){        
        //Sort by date ascending
        if(columnSortOrder === true){
          filterFinal.sort((dateToCompare1, dateToCompare2)=>{
            if(dateToCompare1[columnToSort] < dateToCompare2[columnToSort]){
              return -1;
            }
            if(dateToCompare1[columnToSort] > dateToCompare2[columnToSort]){
              return 1;
            }
            //If equal
            return 0;
          });
        }else{
          //Sort by date descending
          filterFinal.sort((dateToCompare1, dateToCompare2)=>{
            if(dateToCompare1[columnToSort] > dateToCompare2[columnToSort]){
              return -1;
            }
            if(dateToCompare1[columnToSort] < dateToCompare2[columnToSort]){
              return 1;
            }
            //If equal
            return 0;
          });
        }
      } else {
        if (columnSortOrder === true) {
          //Sort by number ascending
          filterFinal.sort((numberToCompare1, NumberToCompare2) => {
            return numberToCompare1.ProjectID - NumberToCompare2.ProjectID;
          });
        } else {
          //Sort by number descending
          filterFinal.sort((numberToCompare1, NumberToCompare2) => {
            return NumberToCompare2.ProjectID - numberToCompare1.ProjectID;
          });
        }
      }
    }

    //Filter the task table based on the search box
    setSearchTable(filterFinal);
    setTaskCount(filterFinal.length);
  }, [
    categoryFilter,
    projectFilter,
    statusFilter,
    assigneeFilter,
    projectIDSearch,
    searchField,
    taskData,
    dateFilterEnd,
    dateFilterStart,
    columnToSort,
    columnSortOrder,
  ]);

  useEffect(() => {
    let valid = false;
    if (taskTitleModal !== "") {
      if (projectModal !== "") {
        if (statusModal !== "") {
          if (
            JSON.stringify(assignees) !== "{}" &&
            JSON.stringify(assignees) !== "[]" &&
            assignees.value !== ""
          ) {
            if (
              JSON.stringify(startDate) !== '""' &&
              JSON.stringify(startDate) !== "null" &&
              JSON.stringify(endDate) !== '""' &&
              JSON.stringify(endDate) !== "null"
            ) {
              //Make sure the start date is before the end date
              if (startDate <= endDate) {
                valid = true;
              }
            }
          }
        }
      }
    }
    setIsDisabled(valid);
  }, [
    taskTitleModal,
    projectModal,
    statusModal,
    assignees,
    startDate,
    endDate,
  ]);

  useEffect(() => {
    let valid = false;
    if (selectedTaskTitle !== "") {
      if (selectedTaskStatus !== "") {
        if (
          JSON.stringify(selectedTaskAssigned) !== "{}" &&
          JSON.stringify(selectedTaskAssigned) !== "[]" &&
          selectedTaskAssigned.value !== ""
        ) {
          if (
            JSON.stringify(selectedTaskStartDate) !== "" &&
            JSON.stringify(selectedTaskStartDate) !== "null" &&
            JSON.stringify(selectedTaskEndDate) !== "" &&
            JSON.stringify(selectedTaskEndDate) !== "null"
          ) {
            //Make sure the start date is before the end date
            if (selectedTaskStartDate <= selectedTaskEndDate) {
              valid = true;
            }
          }
        }
      }
    }
    setEditIsDisabled(valid);
  }, [
    selectedTaskTitle,
    selectedTaskCategory,
    selectedTaskProject,
    selectedTaskStatus,
    selectedTaskAssigned,
    selectedTaskStartDate,
    selectedTaskEndDate,
  ]);

  return (
    <div>
      {/* Ticket List */}
      <div className="card bg-white mb-3 border-dark text-dark mx-2">
        <div className="card-header bg-light border-bottom border-dark font-weight-bold">
          Project Tasks
        </div>
        <div className="card-body table-responsive">
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addTask">
            <i className="fas fa-plus mr-1"></i>
            Add New Task
          </button>
          <p className="mb-0 mt-3"> Results: {taskCount}</p>
          <div className="table-responsive">
            <table className="table table-bordered ticketing-system table-fixed table-hover mt-3 card-min-height">
              <thead className="text-dark font-weight-bold">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    Project ID
                    <i className={ columnToSort==="ProjectID" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("ProjectID")}
                      ></i>
                  </th>
                  <th scope="col">
                    Task Title
                    <i className={ columnToSort==="TaskName" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("TaskName")}
                      ></i>
                  </th>
                  <th scope="col">
                    Category
                    <i className={ columnToSort==="Category" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("Category")}
                      ></i>
                  </th>
                  <th scope="col">
                    Project
                    <i className={ columnToSort==="Project" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("Project")}
                      ></i>
                  </th>
                  <th scope="col">
                    Status
                    <i className={ columnToSort==="TaskStatus" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("TaskStatus")}
                      ></i>
                  </th>
                  <th scope="col">
                    Assignee
                    <i className={ columnToSort==="TaskAssignees" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("TaskAssignees")}
                      ></i>
                  </th>
                  <th scope="col">Start Date
                    <i className={ columnToSort==="TaskStartDate" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("TaskStartDate")}
                      ></i>
                  </th>
                  <th scope="col">End Date
                    <i className={ columnToSort==="TaskEndDate" ? columnSortOrder===true ? "fas fa-sort-up fa-lg ml-2"
                      : "fas fa-sort-down fa-lg ml-2" : "fas fa-sort fa-lg ml-2" } onClick={()=>
                      handleSortTable("TaskEndDate")}
                      ></i>
                  </th>
                </tr>
                <tr>
                  <th scope="col" className="py-0 clear-all-icon" onClick={handleFilterReset}>
                    <i className="fas fa-times-circle fa-lg pb-2"></i>
                  </th>
                  <th scope="col" className="p-0">
                    <input name="projectIDSearch" type="search" className="form-control mr-sm-2 border-0"
                      placeholder="Search ID" value={projectIDSearch} onChange={(event)=> {
                    setProjectIDSearch(event.target.value);
                    }}
                    />
                  </th>
                  <th scope="col" className="p-0">
                    <input name="searchField" className="form-control mr-sm-2 border-0" type="search"
                      placeholder="Search For Task Title" value={searchField} onChange={(event)=> {
                    setSearchField(event.target.value);
                    }}
                    />
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select name="categoryFilter" value={categoryFilter} onChange={(event)=> {
                      setCategoryFilter(event.target.value);
                      }}
                      className="form-control bg-white
                      border-light text-dark rounded-0"
                      >
                      <option value="">All categories</option>
                      {categoryNames.map((categoryName) => (
                      <option value={categoryName.CategoryName}>
                        {categoryName.CategoryName}
                      </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select name="projectFilter" value={projectFilter} onChange={(event)=> {
                      setProjectFilter(event.target.value);
                      }}
                      className="form-control bg-white
                      border-light text-dark rounded-0"
                      >
                      <option value="">All Projects</option>
                      {projectDropdownArray.map((projectName) => (
                      <option value={projectName.ProjectName}>
                        {projectName.ProjectName}
                      </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select name="statusFilter" value={statusFilter} onChange={(event)=> {
                      setStatusFilter(event.target.value);
                      }}
                      className="form-control bg-white
                      border-light text-dark rounded-0"
                      >
                      <option value="">All Statuses</option>
                      <option value="Queued">Queued</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select name="assigneeFilter" value={assigneeFilter} onChange={(event)=> {
                      setAssigneeFilter(event.target.value);
                      }}
                      className="form-control bg-white
                      border-light text-dark rounded-0"
                      >
                      <option value="">All Assignees</option>
                      {assigneeNames.map((assigneeName) => (
                      <option value={assigneeName.TaskAssignees}>
                        {assigneeName.TaskAssignees}
                      </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col" className="py-0">
                    <DatePicker name="dateFilterStart" onChange={(event)=> setDateFilterStart(event)}
                      value={dateFilterStart}
                      className="form-control border-0"
                      />
                  </th>
                  <th scope="col" className="py-0">
                    <DatePicker name="dateFilterEnd" onChange={(event)=> setDateFilterEnd(event)}
                      value={dateFilterEnd}
                      className="form-control border-0"
                      />
                  </th>
                </tr>
              </thead>
              <tbody className="text-dark">
                {searchTable.map((task) => (
                <TaskTableEntry key={task.TaskID} task={task} handleSelectedTask={handleSelectedTask}
                  handleStatusColor={handleStatusColor} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <TaskModal handleStartDateChange={handleStartDateChange} handleEndDateChange={handleEndDateChange}
        handleassignees={handleassignees} handleResetTaskModal={handleResetTaskModal} handlePostTask={handlePostTask}
        isDisabled={isDisabled} startDate={startDate} endDate={endDate} assignees={assignees}
        taskTitleModal={taskTitleModal} categoryModal={categoryModal} projectModal={projectModal}
        projectDropdownArray={projectDropdownArray} statusModal={statusModal} setTaskTitleModal={(event)=>
        setTaskTitleModal(event.target.value.replace(/[^\w\s]/gi, ""))
        }
        setCategoryModal={(event) => setCategoryModal(event.target.value)}
        setProjectModal={(event) => setProjectModal(event.target.value)}
        setStatusModal={(event) => setStatusModal(event.target.value)}
        assigneeNamesCreatableSelect={assigneeNamesCreatableSelect}
        />
        <EditTaskModal handleAssigneeSelect={handleAssigneeSelect} editTask={editTask} isEditDisabled={isEditDisabled}
          selectedTaskTitle={selectedTaskTitle} selectedTaskCategory={selectedTaskCategory}
          selectedTaskProject={selectedTaskProject} projectDropdownArray={projectDropdownArray}
          selectedTaskStatus={selectedTaskStatus} selectedTaskAssigned={selectedTaskAssigned}
          selectedTaskStartDate={selectedTaskStartDate} selectedTaskEndDate={selectedTaskEndDate}
          setSelectedTaskTitle={(event)=>
          setSelectedTaskTitle(event.target.value.replace(/[^\w\s]/gi, ""))
          }
          setSelectedTaskCategory={(event) =>
          setSelectedTaskCategory(event.target.value)
          }
          setSelectedTaskProject={(event) =>
          setSelectedTaskProject(event.target.value)
          }
          setSelectedTaskStatus={(event) =>
          setSelectedTaskStatus(event.target.value)
          }
          setSelectedTaskStartDate={handleModalStartDateChange}
          setSelectedTaskEndDate={handleModalEndDateChange}
          assigneeNamesCreatableSelect={assigneeNamesCreatableSelect}
          />
          <AlertModal show={show} alertTitle={alertTitle} alertText={alertText} alertColor={alertColor}
            alertIcon={alertIcon} handleClose={handleClose} />
    </div>
  );
}
