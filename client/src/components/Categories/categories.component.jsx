import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import ToggleSwitch from '../ToggleSwitch/toggleSwitch.component';
import CategoryModal from './categoryModal.component';
import AlertModal from '../AlertModal/AlertModal.component';


export default function Categories() {
  const [open, setOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [toggleButton, setToggleButton] = useState(1);
  const [toggleSLTStyle, setToggleSLTStyle] = useState(
    "font-weight-bold btn btn-info"
  );
  const [toggleObsStyle, setToggleObsStyle] = useState(
    "font-weight-bold btn border-info bg-dark-white text-info"
  );
  const [categoryName, setCategoryName] = useState("");
  const [instructionalTotal, setInstructionalTotal] = useState(0);
  const [noninstructionalTotal, setNoninstructionalTotal] = useState(0);

  // Alert Modal
  const [show, setShow] = useState(false);
  const [alertIcon, setalertIcon] = useState("");
  const [alertTitle, setalertTitle] = useState("");
  const [alertText, setalertText] = useState("");
  const [alertColor, setalertColor] = useState("");
  const handleClose = () => setShow(false);

  useEffect(() => {
    Axios.get("/api/getInfo/getInstructionalCategories").then((response) => {
      setCategoryData(response.data);
    });

    //Get Totals for the slider
    Axios.get("/api/getInfo/getTotals").then(response=>{
      setInstructionalTotal(response.data.instructionalTotal);
      setNoninstructionalTotal(response.data.noninstructionalTotal)
    });
  }, []);

  function getInstructionalCategories() {
    Axios.get("/api/getInfo/getInstructionalCategories").then((response) => {
      setCategoryData(response.data);
    });
  }

  function getNoninstructionalCategories() {
    Axios.get("/api/getInfo/getNoninstructionalCategories").then((response) => {
      setCategoryData(response.data);
    });
  }

  function handleCollapse() {
    setOpen(!open);
  }

  function calculateTotal(tableData) {
    let total = 0;
    tableData.forEach((tableEntry) => {
      total += tableEntry.taskCount;
    });

    return total;
  }

  function handleToggleSelect() {
    if (toggleButton === 1) {
      setToggleButton(2);
      handleToggleStyle(false);
      getNoninstructionalCategories();
    } else {
      setToggleButton(1);
      handleToggleStyle(true);
      getInstructionalCategories();
    }
  }

  function handleToggleStyle(status) {
    if (status === true) {
      setToggleSLTStyle("font-weight-bold btn btn-info active-toggle");
      setToggleObsStyle(
        "font-weight-bold btn border-info bg-dark-white text-info active-toggle"
      );
    } else {
      setToggleObsStyle("font-weight-bold btn btn-info active-toggle");
      setToggleSLTStyle(
        "font-weight-bold btn border-info bg-dark-white text-info active-toggle"
      );
    }
  }

  function addNewCategory() {
    Axios.post("/api/createCategory", {
      masterCategory: toggleButton,
      categoryName: categoryName,
    }).then(() => {
      setCategoryName("");
      setShow(true);
      setalertTitle("Success");
      setalertText("Category has been successfully added");
      setalertIcon("fas fa-check mr-3 text-light");
      setalertColor("bg-alert-success");
      if (toggleButton === 1) {
        getInstructionalCategories();
        //Get Totals for the slider
        Axios.get("/api/getInfo/getTotals").then((response) => {
          setInstructionalTotal(response.data.instructionalTotal);
          setNoninstructionalTotal(response.data.noninstructionalTotal);
        });
      } else {
        getNoninstructionalCategories();
        //Get Totals for the slider
        Axios.get("/api/getInfo/getTotals").then((response) => {
          setInstructionalTotal(response.data.instructionalTotal);
          setNoninstructionalTotal(response.data.noninstructionalTotal);
        });
      }
    });
  }

  return (
    <div>
      {/* Statistics Search Parameters */}
      <div className="card bg-white mb-3 border-dark text-dark mx-2">
        <div className="card-header bg-light border-bottom border-dark text-dark font-weight-bold">
          Categories
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-3">
              <ToggleSwitch handleToggleSelect={handleToggleSelect} toggleSLTStyle={toggleSLTStyle}
                toggleObsStyle={toggleObsStyle} instructionalTotal={instructionalTotal}
                noninstructionalTotal={noninstructionalTotal} />
            </div>
            <div className="col">
              <button type="button" className="btn btn-info mb-3 float-right" data-toggle="modal"
                data-target="#categoryModal">
                <i className="fas fa-plus mr-1"></i>
                Add New Category
              </button>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="card-columns">
                {categoryData.map((category) => (
                <div className="card text-center border-dark bg-light text-dark">
                  <div className="card-header">
                    <button className="btn btn-link text-dark  " onClick={handleCollapse} aria-expanded="true"
                      aria-controls="collapseOne">
                      <h5 className="card-title">{category.category}</h5>
                      <ul className="list-group list-group-horizontal border-0">
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center text-dark bg-transparent border-0">
                          <span className="badge badge-success badge-pill">
                            Projects: {category.tableData.length}
                          </span>
                        </li>
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center text-dark bg-transparent border-0">
                          <span className="badge badge-primary badge-pill">
                            Tasks: {calculateTotal(category.tableData)}
                          </span>
                        </li>
                      </ul>
                    </button>
                  </div>
                  <Collapse in={open}>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        {category.tableData.map((data) => (
                        <li
                          className="list-group-item d-flex justify-content-between align-items-center text-dark bg-transparent">
                          <Link className="text-dark" to={{pathname: `/App/Projects`,
                                              project: data.projectName}}>{data.projectName}</Link>
                          <span className="badge badge-primary badge-pill">
                            Tasks:&nbsp;
                            {data.taskCount}
                          </span>
                        </li>
                        ))}
                      </ul>
                    </div>
                  </Collapse>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryModal 
        categoryName={categoryName} 
        setCategoryName={setCategoryName} 
        addNewCategory={addNewCategory} 
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
