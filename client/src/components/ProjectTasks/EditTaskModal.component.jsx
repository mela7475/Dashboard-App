import React from "react";
import DatePicker from "react-date-picker";
import CreatableSelect from "react-select/creatable";

const EditTaskModal = (props) => (
  <div className="modal fade" id="editTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content border-0 shadow">
        <div className="modal-header bg-light border-dark">
          <h5 className="modal-title text-dark" id="exampleModalLabel">
            Edit Task
          </h5>
          <button type="button" className="close text-dark" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body bg-white border-dark text-dark">
          <div className="row mb-2">
            <div className="col-12">
              <label>Task Title</label>
              <div className="input-group input-group-md">
                <input name="selectedTaskTitle" type="email" required value={props.selectedTaskTitle}
                  onChange={props.setSelectedTaskTitle} className="form-control bg-white border-dark text-dark" 
                  maxLength="50" />
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <label>Status</label>
              <div className="input-group input-group-md">
                <select name="selectedTaskStatus" value={props.selectedTaskStatus}
                  onChange={props.setSelectedTaskStatus} required
                  className="form-control bg-white border-dark text-dark">
                  <option value="">Please select a Status</option>
                  <option value="Queued">Queued</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Delayed">Delayed</option>
                  <option value="Deleted">Deleted</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-12">
              <label>Assigned</label>
              <CreatableSelect className="react-select-container" classNamePrefix="react-select" name="selectedTaskAssigned"
                placeholder="Select an assignee" value={props.selectedTaskAssigned} options={props.assigneeNamesCreatableSelect}
                onChange={props.handleAssigneeSelect} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-md-6">
              <label>Start Date</label>
              <div className="input-group input-group-md">
                <DatePicker name="selectedTaskStartDate" value={props.selectedTaskStartDate}
                  className="form-control border-dark" onChange={props.setSelectedTaskStartDate} />
              </div>
            </div>
            <div className="col-md-6">
              <label>End Date</label>
              <div className="input-group input-group-md text-dark">
                <DatePicker name="selectedTaskEndDate" value={props.selectedTaskEndDate}
                  className="form-control border-dark text-dark" onChange={props.setSelectedTaskEndDate} />
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer bg-light border-dark">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button type="button" className="btn btn-danger" data-dismiss="modal" disabled={!props.isEditDisabled}
            onClick={props.editTask}>
            Edit Task
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default EditTaskModal;
