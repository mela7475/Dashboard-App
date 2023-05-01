import React from "react";
import DatePicker from 'react-date-picker';
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import employees from "../employees.json";

const TaskModal = (props) => (
<div className="modal fade" id="addTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content border-0 shadow">
            <div className="modal-header bg-light border-dark">
                <h5 className="modal-title text-dark" id="exampleModalLabel">
                    Create New Task
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
                            <input name="taskTitleModal" type="email" required value={props.taskTitleModal}
                                onChange={props.setTaskTitleModal}
                                className="form-control bg-white border-dark text-dark"
                                maxLength="50" />
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <label>Project</label>
                        <div className="input-group input-group-md">
                            <select name="projectModal" value={props.projectModal} onChange={props.setProjectModal}
                                required className="form-control bg-white border-dark text-dark">
                                <option value="">All Projects</option>
                                {props.projectDropdownArray.map((projectName) => (
                                <option value={projectName.ProjectName}>
                                    {projectName.ProjectName}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-12">
                        <label>Status</label>
                        <div className="input-group input-group-md">
                            <select name="statusModal" value={props.statusModal} onChange={props.setStatusModal}
                                required className="form-control bg-white border-dark text-dark">
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
                        <CreatableSelect className="react-select-container" classNamePrefix="react-select" name="assignees"
                            placeholder="Select an assignee" value={props.assignees} options={props.assigneeNamesCreatableSelect}
                            onChange={props.handleassignees}
                            maxLength="50" />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <label>Start Date</label>
                        <div className="input-group input-group-md">
                            <DatePicker name="startDate" onChange={props.handleStartDateChange} value={props.startDate}
                                className="form-control border-dark" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label>End Date</label>
                        <div className="input-group input-group-md text-dark">
                            <DatePicker name="endDate" onChange={props.handleEndDateChange} value={props.endDate}
                                className="form-control border-dark text-dark" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer bg-light border-dark">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                    onClick={props.handleResetTaskModal}>
                    Close
                </button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" disabled={!props.isDisabled}
                    onClick={props.handlePostTask}>
                    Save Changes
                </button>
            </div>
        </div>
    </div>
</div>
);

export default TaskModal;
