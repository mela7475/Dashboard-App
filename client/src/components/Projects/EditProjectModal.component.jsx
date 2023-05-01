import React from 'react';
import CreatableSelect from "react-select/creatable";

const EditProjectModal = (props) => ( 
   <div className="modal fade" id="editProject" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
       <div className="modal-dialog" role="document">
           <div className="modal-content border-0 shadow">
               <div className="modal-header bg-light border-dark">
                   <h5 className="modal-title text-dark" id="exampleModalLabel">Edit Project </h5>
                   <button type="button" className="close text-dark" data-dismiss="modal" aria-label="Close">
                       <span aria-hidden="true">&times;</span>
                   </button>
               </div>
               <div className="modal-body bg-white border-dark text-dark">
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Project Title</label>
                           <div className="input-group input-group-md">
                               <input name="selectedProjectTitle" value={props.selectedProjectTitle} type="text"
                                   onChange={props.setSelectedProjectTitle}
                                   className="form-control bg-white border-dark text-dark" maxLength="100" />
                           </div>
                       </div>
                   </div>
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Department</label>
                           <CreatableSelect className='react-select-container text-dark' classNamePrefix="react-select"
                               name="departmentModal" placeholder="Select a department" value={props.selectedDepartment} options={props.departmentNames}
                               onChange={props.handleSelectedDepartmentEdit} maxLength="50"/>
                       </div>
                   </div>
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Category</label>
                           <div className="input-group input-group-md">
                               <select name="selectedCategory" value={props.selectedCategory}
                                   onChange={props.setSelectedCategory} required
                                   className="form-control bg-white border-dark text-dark">
                                   <option value="">Please select a category</option>
                                   {props.categoryNames.map((categoryName)=>(
                                   <option value={categoryName.CategoryName}>{categoryName.CategoryName}</option>
                                   ))}
                               </select>
                           </div>
                       </div>
                   </div>
                   <div className="row mb-2">
                       <div className="col-12">
                           <label>Manager</label>
                           <CreatableSelect className='react-select-container text-dark' classNamePrefix="react-select"
                               name="manager" placeholder="Select a manager" value={props.selectedManager} options={props.managerNames}
                               onChange={props.handleSelectedManagerEdit} maxLength="50" />
                       </div>
                   </div>
               </div>
               <div className="modal-footer bg-light border-dark">
                   <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                   <button type="button" className="btn btn-danger" data-dismiss="modal"
                       disabled={!props.isEditDisabled} onClick={props.handleSubmitEditProject}>Edit Project</button>
               </div>
           </div>
       </div>
   </div>
);

export default EditProjectModal;