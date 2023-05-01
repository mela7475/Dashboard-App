import React, { useState, useEffect } from "react";
import Axios from "axios";
import employees from "../employees.json";
import ProjectModal from "./ProjectModal.component";
import EditProjectModal from "./EditProjectModal.component";
import ProjectTableEntry from "./ProjectTableEntry.component";
import AlertModal from '../AlertModal/AlertModal.component';


export default function Projects(props) {
  //For EditProjectModal.component.jsx
  const [selectedProject, setSelectedProject] = useState([]);
  const [selectedProjectTitle, setSelectedProjectTitle] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManager, setSelectedManager] = useState([]);
  const [isEditDisabled, setEditIsDisabled] = useState(false);

  //For ProjectModal.component.jsx
  const [manager, setManager] = useState([]);
  const [projectTitleModal, setProjectTitleModal] = useState("");
  const [departmentModal, setDepartmentModal] = useState("");
  const [categoryModal, setCategoryModal] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  //Variables for drop down menu options
  const [categoryNames, setCategoryNames] = useState([]);
  const [departmentNames, setDepartmentNames] = useState([]);
  const [
    departmentNamesCreatableSelect,
    setDepartmentNamesCreatableSelect,
  ] = useState([]);
  const [managerNames, setManagerNames] = useState([]);
  const [
    managerNamesCreatableSelect,
    setManagerNamesCreatableSelect,
  ] = useState([]);

  // Alert Modal
  const [show, setShow] = useState(false);
  const [alertIcon, setalertIcon] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertText, setalertText] = useState("");
  const [alertColor, setalertColor] = useState("");
  const handleClose = () => setShow(false);

  //Filter variables
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [managerFilter, setManagerFilter] = useState("");
  const [searchField, setSearchField] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [columnToSort, setColumnToSort] = useState("");
  const [columnSortOrder, setColumnSortOrder] = useState(false);
  const [searchTable, setSearchTable] = useState([]);
  
  //Other
  const [projectCount, setProjectCount] = useState("");
  const [projectData, setProjectData] = useState([]);


  useEffect(() => {
    //Pull all projects on page load and get tasks number for each
    Axios.get("/api/getProjects").then((response) => {
      //setProjectData(response.data.recordset);
      let data = response.data.recordset;
      //Pull all tasks associated with each project
      let completeTheLoop = new Promise((resolve, reject) => {
        let projectIndex = 0;
        data.forEach((project) => {
          Axios.get("/api/getProjects/getTaskCount/" + project.ProjectID).then(
            (result) => {
              //Add the object to the project data to be sent to the table
              project.taskData = result.data;
              if (data.length - 1 === projectIndex) {
                resolve();
              } else {
                projectIndex++;
              }
            }
          );
        });
      });

      //This requires the forEach loop to finish before setting the table data
      completeTheLoop.then(() => {
        setProjectData(data);
      });

      getDropdownMenuData();
    });
  }, []);

  function getDropdownMenuData() {
    //Get category names for drop down menus
    Axios.get("/api/getCategories").then((response) => {
      setCategoryNames(response.data);
    });

    //Get department names for drop down menus
    Axios.get("/api/getDepartments").then((response) => {
      setDepartmentNames(response.data);
      //Convert to usable form for creatable select components
      let data = [];
      response.data.forEach((department) => {
        data.push({
          value: department.Department,
          label: department.Department,
        });
      });
      setDepartmentNamesCreatableSelect(data);
    });

    //Get manager names for drop down menus
    Axios.get("/api/getManagers").then((response) => {
      setManagerNames(response.data);
      //Convert to usable form for creatable select components
      let data = [];
      response.data.forEach((manager) => {
        data.push({
          value: manager.ProjectManager,
          label: manager.ProjectManager,
        });
      });
      setManagerNamesCreatableSelect(data);
    });
  }

  function getProjects() {
    Axios.get("/api/getProjects").then((response) => {
      //setProjectData(response.data.recordset);
      let data = response.data.recordset;
      //Pull all tasks associated with each project
      let completeTheLoop = new Promise((resolve, reject) => {
        let projectIndex = 0;
        data.forEach((project) => {
          Axios.get("/api/getProjects/getTaskCount/" + project.ProjectID).then(
            (result) => {
              //Add the object to the project data to be sent to the table
              project.taskData = result.data;
              if (data.length - 1 === projectIndex) {
                resolve();
              } else {
                projectIndex++;
              }
            }
          );
        });
      });

      //This requires the forEach loop to finish before setting the table data
      completeTheLoop.then(() => {
        setProjectData(data);
      });
    });
  }

  function handleModalReset() {
    setManager([]);
    setProjectTitleModal("");
    setCategoryModal("");
    setIsDisabled(false);
    setDepartmentModal("");
  }

  function handleFilterReset() {
    setDepartmentFilter("");
    setCategoryFilter("");
    setManagerFilter("");
    setSearchID("");
    setSearchField("");
    setColumnToSort("");
  }

  function handleManagerSelect(option) {
    console.log(option);
    if (option === null) {
      setManager([]);
    } else {
      //Get rid of special characters
      option = {
        value: option.value.replace(/[^\w\s]/gi, ""),
        label: option.label.replace(/[^\w\s]/gi, ""),
      };
      setManager(option);
    }
  }

  function handleDepartmentSelect(option) {
    if (option === null) {
      setDepartmentModal([]);
    } else {
      //Get rid of special characters
      option = {
        value: option.value.replace(/[^\w\s]/gi, ""),
        label: option.label.replace(/[^\w\s]/gi, ""),
      };
      setDepartmentModal(option);
    }
  }

  function handleSelectedManagerEdit(option) {
    if (option === null) {
      setSelectedManager([]);
    } else {
      //Get rid of special characters
      option = {
        value: option.value.replace(/[^\w\s]/gi, ""),
        label: option.label.replace(/[^\w\s]/gi, ""),
      };
      setSelectedManager(option);
    }
  }

  function handleSelectedDepartmentEdit(option) {
    if (option === null) {
      setSelectedDepartment([]);
    } else {
      //Get rid of special characters
      option = {
        value: option.value.replace(/[^\w\s]/gi, ""),
        label: option.label.replace(/[^\w\s]/gi, ""),
      };
      setSelectedDepartment(option);
    }
  }

  //Submits a new project
  function handleSubmitNewProject() {
    if (isDisabled === true) {
      Axios.post("/api/postProject", {
        name: projectTitleModal,
        category: categoryModal,
        manager: manager,
        department: departmentModal,
      }).then(() => {
        getProjects();
        handleModalReset();
        getDropdownMenuData();
        setShow(true);
        setalertTitle("Success");
        setalertText("Project has been successfully added");
        setalertIcon("fas fa-check mr-3 text-light");
        setalertColor("bg-alert-success");
      });
    } else {
      setShow(true);
      setalertTitle("Error");
      setalertText("There was a problem adding the project");
      setalertIcon("fas fa-exclamation-triangle mr-3 text-light");
      setalertColor("bg-alert-error");
    }
  }

  //Edits a project
  function handleSubmitEditProject() {
    if (isEditDisabled === true) {
      Axios.post("/api/editProject", {
        projectID: selectedProject.ProjectID,
        projectName: selectedProjectTitle,
        projectCategory: selectedCategory,
        projectManager: selectedManager,
        department: selectedDepartment,
      }).then((response) => {
        if (response.data.status !== 200) {
          setShow(true);
          setalertTitle("Error");
          setalertText("There was a problem updating the project");
          setalertIcon("fas fa-exclamation-triangle mr-3 text-light");
          setalertColor("bg-alert-error");
        } else {
          setShow(true);
          setalertTitle("Success");
          setalertText("Project has been successfully updated");
          setalertIcon("fas fa-check mr-3 text-light");
          setalertColor("bg-alert-success");
          getProjects();
          getDropdownMenuData();
        }
      });
    } else {
      alert("Did not meet requirements");
    }
  }

  function handleSelectedProject(index) {
    let techs = [];
    employees.forEach((element) => {
      if (element.value === index.ProjectManager) {
        techs.push(element);
      }
    });

    setSelectedProject(index);
    setSelectedProjectTitle(index.ProjectName);
    setSelectedCategory(index.ProjectCategory);
    setSelectedManager({
      value: index.ProjectManager,
      label: index.ProjectManager,
    });
    setSelectedDepartment({ value: index.Department, label: index.Department });
  }

  function handleSortTable(columnName) {
    setColumnToSort(columnName);
    setColumnSortOrder(!columnSortOrder);
  }

  useEffect(() => {
    let projectLink = props.history.location.project;
    let categoryLink = props.history.location.category;

    if (
      projectLink !== null &&
      projectLink !== undefined &&
      projectLink !== ""
    ) {
      setSearchField(projectLink);
    } else if (
      categoryLink !== null &&
      categoryLink !== undefined &&
      categoryLink !== ""
    ) {
      setCategoryFilter(categoryLink);
    }
  }, [props.history.location.project, props.history.location.category]);

  useEffect(() => {
    var filteredTable = projectData;

    if (departmentFilter !== "") {
      filteredTable = projectData.filter((data) =>
        data.Department.includes(departmentFilter)
      );
    }

    // Filter the Project Table based on the category selection
    if (categoryFilter !== "") {
      filteredTable = projectData.filter((data) =>
        data.ProjectCategory.includes(categoryFilter)
      );
    }

    // Filter the Project Table based on the manager selection
    if (managerFilter !== "") {
      filteredTable = filteredTable.filter((data) =>
        data.ProjectManager.includes(managerFilter)
      );
    }

    // Filter task table by task ids
    if (searchID !== "") {
      filteredTable = filteredTable.filter(
        (data) => data.ProjectID == searchID
      );
    }

    let filter = filteredTable.filter((data) =>
      data.ProjectName.toLowerCase().includes(searchField.toLowerCase())
    );

    let textSort = [
      "ProjectName",
      "ProjectCategory",
      "ProjectManager",
      "Department",
    ];

    //Remove all completed projects if button is not enabled
    if (showCompleted === false) {
      let newFilter = [];
      filter.forEach((project) => {
        let projectIsComplete = true;
        project.taskData.statuses.forEach((status) => {
          //If the status isn't completed
          if (status.status !== "Completed") {
            //If the count is greater than 0
            if (status.count > 0) {
              projectIsComplete = false;
            }
          }
          //If the status is completed
          else {
            //If the count is 0
            if (status.count === 0) {
              projectIsComplete = false;
            }
          }
        });

        //If project is not complete
        if (projectIsComplete !== true) {
          //Add to newFilter
          newFilter.push(project);
        }
      });

      //Sorting here
      if (columnToSort !== "") {
        //Determine type of sort by columnName
        if (textSort.includes(columnToSort)) {
          if (columnSortOrder === true) {
            //Sort by text ascending
            newFilter.sort((nameToCompare1, nameToCompare2) => {
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
            newFilter.sort((nameToCompare1, nameToCompare2) => {
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
        } else {
          if (columnSortOrder === true) {
            //Sort by number ascending
            newFilter.sort((numberToCompare1, NumberToCompare2) => {
              console.log(numberToCompare1);
              console.log(NumberToCompare2);
              return numberToCompare1 - NumberToCompare2;
            });
            console.log("here");
          } else {
            //Sort by number descending
            newFilter.reverse();
            console.log("here");
          }
        }
      }

      //Once done, set the table data
      setSearchTable(newFilter);
      setProjectCount(newFilter.length);
      //console.log(searchTable);
    } else {
      //Sorting here
      //Sorting here
      if (columnToSort !== "") {
        //Determine type of sort by columnName
        if (textSort.includes(columnToSort)) {
          if (columnSortOrder === true) {
            //Sort by text ascending
            filter.sort((nameToCompare1, nameToCompare2) => {
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
            filter.sort((nameToCompare1, nameToCompare2) => {
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
        } else {
          if (columnSortOrder === true) {
            //Sort by number ascending
            filter.sort((numberToCompare1, NumberToCompare2) => {
              return numberToCompare1 - NumberToCompare2;
            });
          } else {
            //Sort by number descending
            filter.reverse();
          }
        }
      }

      //Filter the project Table based on the search box
      setSearchTable(filter);
      console.log(filter);
      setProjectCount(filter.length);
      //console.log(searchTable);
    }
  }, [
    departmentFilter,
    categoryFilter,
    managerFilter,
    projectData,
    searchField,
    searchID,
    showCompleted,
    columnToSort,
    columnSortOrder
  ]);

  useEffect(() => {
    let valid = false;
    if (projectTitleModal !== "") {
      if (categoryModal !== "") {
        if (
          JSON.stringify(manager) !== "{}" &&
          JSON.stringify(manager) !== "[]" &&
          manager.value !== ""
        ) {
          valid = true;
        }
      }
    }
    setIsDisabled(valid);
  }, [projectTitleModal, categoryModal, manager]);

  useEffect(() => {
    let editValid = false;
    if (selectedProjectTitle !== "") {
      if (selectedCategory !== "") {
        if (
          JSON.stringify(selectedManager) !== "{}" &&
          JSON.stringify(selectedManager) !== "[]" &&
          selectedManager.value !== ""
        ) {
          editValid = true;
        }
      }
    }
    setEditIsDisabled(editValid);
  }, [selectedProjectTitle, selectedCategory, selectedManager]);

  return (
    <div>
      {/* Ticket List */}
      <div className="card bg-white mb-3 border-dark text-dark mx-2">
        <div className="card-header bg-light border-bottom border-dark font-weight-bold">
          Projects
        </div>
        <div className="card-body table-responsive">
          <button
            type="button"
            className="btn btn-success"
            data-toggle="modal"
            data-target="#addProject"
          >
            <i className="fas fa-plus mr-1"></i>
            Add New Project
          </button>
          <p className="mb-0 mt-3"> Results: {projectCount}</p>
          <div className="table-responsive">
            <table className="table table-bordered ticketing-system table-fixed table-hover  mt-3">
              <thead className="text-dark font-weight-bold">
                <tr>
                  <th scope="col" className="w-5"></th>
                  <th scope="col" className="w-5">
                    Project ID
                    <i
                      className={(columnToSort === "ProjectID")
                        ? (columnSortOrder === true)
                          ? "fas fa-sort-up fa-lg ml-2"
                          : "fas fa-sort-down fa-lg ml-2"
                        : "fas fa-sort fa-lg ml-2"}
                      onClick={() => handleSortTable("ProjectID")}
                    ></i>
                  </th>
                  <th scope="col" className="w-12">
                    Project Name
                    <i
                      className={(columnToSort === "ProjectName")
                      ? (columnSortOrder === true)
                        ? "fas fa-sort-up fa-lg ml-2"
                        : "fas fa-sort-down fa-lg ml-2"
                      : "fas fa-sort fa-lg ml-2"}
                      onClick={() => handleSortTable("ProjectName")}
                    ></i>
                  </th>
                  <th scope="col" className="w-10">
                    Department
                    <i
                      className={(columnToSort === "Department")
                      ? (columnSortOrder === true)
                        ? "fas fa-sort-up fa-lg ml-2"
                        : "fas fa-sort-down fa-lg ml-2"
                      : "fas fa-sort fa-lg ml-2"}
                      onClick={() => handleSortTable("Department")}
                    ></i>
                  </th>
                  <th scope="col" className="w-10">
                    Category
                    <i
                      className={(columnToSort === "ProjectCategory")
                      ? (columnSortOrder === true)
                        ? "fas fa-sort-up fa-lg ml-2"
                        : "fas fa-sort-down fa-lg ml-2"
                      : "fas fa-sort fa-lg ml-2"}
                      onClick={() => handleSortTable("ProjectCategory")}
                    ></i>
                  </th>
                  <th scope="col" className="w-10">
                    Manager
                    <i
                      className={(columnToSort === "ProjectManager")
                      ? (columnSortOrder === true)
                        ? "fas fa-sort-up fa-lg ml-2"
                        : "fas fa-sort-down fa-lg ml-2"
                      : "fas fa-sort fa-lg ml-2"}
                      onClick={() => handleSortTable("ProjectManager")}
                    ></i>
                  </th>
                  <th scope="col">Status</th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="py-0 clear-all-icon"
                    onClick={handleFilterReset}
                  >
                    <i className="fas fa-times-circle fa-lg pb-2 pl-2"></i>
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <input
                      name="searchID"
                      className="form-control mr-sm-2 border-0"
                      type="search"
                      placeholder="Search ID"
                      value={searchID}
                      onChange={(event) => {
                        setSearchID(event.target.value);
                      }}
                    />
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <input
                      name="searchField"
                      className="form-control mr-sm-2 border-0"
                      type="search"
                      placeholder="Search For Project Name"
                      value={searchField}
                      onChange={(event) => {
                        setSearchField(event.target.value);
                      }}
                    />
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select
                      name="departmentFilter"
                      value={departmentFilter}
                      onChange={(event) => {
                        setDepartmentFilter(event.target.value);
                      }}
                      className="form-control bg-white border-light text-dark rounded-0"
                    >
                      <option value="">Departments</option>
                      {departmentNames.map((departmentName) => (
                        <option value={departmentName.Department}>
                          {departmentName.Department}
                        </option>
                      ))}
                      {/* <option value="ALIO">ALIO</option>
                          <option value="NOVA">Nova</option>
                          <option value="PowerSchool">PowerSchool</option> */}
                    </select>
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select
                      name="categoryFilter"
                      value={categoryFilter}
                      onChange={(event) => {
                        setCategoryFilter(event.target.value);
                      }}
                      className="form-control bg-white border-light text-dark rounded-0"
                    >
                      <option value="">Categories</option>
                      {categoryNames.map((categoryName) => (
                        <option value={categoryName.CategoryName}>
                          {categoryName.CategoryName}
                        </option>
                      ))}
                      {/* <option value="ALIO">ALIO</option>
                          <option value="NOVA">Nova</option>
                          <option value="PowerSchool">PowerSchool</option> */}
                    </select>
                  </th>
                  <th scope="col" className="p-0 rounded-0">
                    <select
                      name="managerFilter"
                      value={managerFilter}
                      onChange={(event) => {
                        setManagerFilter(event.target.value);
                      }}
                      className="form-control bg-white
                      border-light text-dark rounded-0"
                    >
                      <option value="">Managers</option>
                      {managerNames.map((managerName) => (
                        <option value={managerName.ProjectManager}>
                          {managerName.ProjectManager}
                        </option>
                      ))}
                    </select>
                  </th>
                  <th scope="col" className="p-0">
                    <div className="form-check ml-2">
                      <input
                        name="showCompleted"
                        className="form-check-input"
                        type="checkbox"
                        value={showCompleted}
                        onChange={() => setShowCompleted(!showCompleted)}
                        id="showCompleted"
                      />
                      <label
                        className="form-check-label pb-2 font-weight-normal"
                        for="showCompleted"
                      >
                        Show Completed Projects
                      </label>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-dark">
                {searchTable.map((project) => (
                  <ProjectTableEntry
                    key={project.ProjectID}
                    project={project}
                    handleSelectedProject={handleSelectedProject}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ProjectModal
        handleDepartmentSelect={handleDepartmentSelect}
        handleManagerSelect={handleManagerSelect}
        handleSubmitNewProject={handleSubmitNewProject}
        handleModalReset={handleModalReset}
        manager={manager}
        projectTitleModal={projectTitleModal}
        setProjectTitleModal={(event) =>
          setProjectTitleModal(event.target.value.replace(/[^\w\s]/gi, ""))
        }
        departmentModal={departmentModal}
        categoryModal={categoryModal}
        setCategoryModal={(event) => setCategoryModal(event.target.value)}
        isDisabled={isDisabled}
        categoryNames={categoryNames}
        managerNames={managerNamesCreatableSelect}
        departmentNames={departmentNamesCreatableSelect}
      />
      <EditProjectModal
        handleSelectedManagerEdit={handleSelectedManagerEdit}
        handleSubmitEditProject={handleSubmitEditProject}
        selectedProject={selectedProject}
        selectedProjectTitle={selectedProjectTitle}
        setSelectedProjectTitle={(event) =>
          setSelectedProjectTitle(event.target.value.replace(/[^\w\s]/gi, ""))
        }
        selectedDepartment={selectedDepartment}
        handleSelectedDepartmentEdit={handleSelectedDepartmentEdit}
        selectedCategory={selectedCategory}
        setSelectedCategory={(event) => setSelectedCategory(event.target.value)}
        selectedManager={selectedManager}
        isEditDisabled={isEditDisabled}
        categoryNames={categoryNames}
        managerNames={managerNamesCreatableSelect}
        departmentNames={departmentNamesCreatableSelect}
      />
      <AlertModal
        show={show}
        alertTitle={alertTitle}
        alertText={alertText}
        alertColor={alertColor}
        alertIcon={alertIcon}
        handleClose={handleClose}
      />
    </div>
  );
}
