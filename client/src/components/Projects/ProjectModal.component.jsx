import React from 'react';
import CreatableSelect from "react-select/creatable";

const ProjectModal = (props) => ( 
   <div className="modal fade" id="addProject" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
       <div className="modal-dialog" role="document">
           <div className="modal-content border-0 shadow">
               <div className="modal-header bg-light border-dark">
                   <h5 className="modal-title text-dark" id="exampleModalLabel">Create New Project</h5>
                   <button type="button" className="close text-dark" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                   </button>
               </div>
               <div className="modal-body bg-white border-dark text-dark">
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Project Title</label>
                           <div className="input-group input-group-md">
                               <input name="projectTitleModal" type="text"
                                   className="form-control bg-white border-dark text-dark"
                                   value={props.projectTitleModal} onChange={props.setProjectTitleModal}
                                   maxLength="100" />
                           </div>
                       </div>
                   </div>
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Department</label>
                           <CreatableSelect className='react-select-container text-dark' classNamePrefix="react-select"
                               name="departmentModal" placeholder="Select a department" value={props.departmentModal} options={props.departmentNames}
                               onChange={props.handleDepartmentSelect} maxLength="50"/>
                       </div>
                   </div>
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Category</label>
                           <div className="input-group input-group-md">
                               <select name="categoryModal" value={props.categoryModal}
                                   onChange={props.setCategoryModal} required
                                   className="form-control bg-white border-dark text-dark">
                                   <option value="">Please select a category</option>
                                   {props.categoryNames.map((categoryName)=>(
                                   <option value={categoryName.CategoryName}>{categoryName.CategoryName}</option>
                                   ))}
                                   {/* <option value="ALIO">ALIO</option>
                                   <option value="Nova">Nova</option>
                                   <option value="PowerSchool">PowerSchool</option> */}
                               </select>
                           </div>
                       </div>
                   </div>
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Manager</label>
                           <CreatableSelect className='react-select-container text-dark' classNamePrefix="react-select"
                               name="manager" placeholder="Select a manager" value={props.manager} options={props.managerNames}
                               onChange={props.handleManagerSelect} maxLength="50" />
                       </div>
                   </div>
               </div>
               <div className="modal-footer bg-light border-dark">
                   <button type="button" className="btn btn-secondary" data-dismiss="modal"
                       onClick={props.handleModalReset}>Close</button>
                   <button type="button" className="btn btn-success" data-dismiss="modal" disabled={!props.isDisabled}
                       onClick={props.handleSubmitNewProject}>Add Project</button>
               </div>
           </div>
       </div>
   </div>
);

export default ProjectModal;