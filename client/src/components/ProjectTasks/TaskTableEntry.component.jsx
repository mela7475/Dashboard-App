import React from 'react';
import { Link } from 'react-router-dom';

const TaskTableEntry = (props) => ( 
    <tr>
        <td onClick={()=> props.handleSelectedTask(props.task)} data-toggle="modal" data-target="#editTask">
         <i className="fas fa-edit edit-icon"></i>
        </td>
        <th scope="row" className="w-10">{props.task.ProjectID}</th>
        <td>{props.task.TaskName}</td>
        <td>
            <Link className="text-dark" to={{
                pathname: `/App/Projects`,
                category: props.task.Category
                }}>{props.task.Category}
            </Link>
        </td>
        <td>
            <Link className="text-dark" to={{
                pathname: `/App/Projects`,
                project: props.task.Project
                }}>{props.task.Project}
            </Link>
        </td>
        <td>
            <i className={props.handleStatusColor(props.task.TaskStatus)}></i>
            {props.task.TaskStatus}
        </td>
        <td>{props.task.TaskAssignees}</td>
        <td>{props.task.TaskStartDate}</td>
        <td>{props.task.TaskEndDate}</td>
    </tr>
);

export default TaskTableEntry;