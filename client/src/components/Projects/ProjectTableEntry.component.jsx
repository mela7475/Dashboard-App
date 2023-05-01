import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar'

const ProjectTableEntry = (props) => ( 
    <tr>
        <td onClick={()=> props.handleSelectedProject(props.project)} data-toggle="modal" data-target="#editProject" ><i
                className="fas fa-edit edit-icon w-2"></i></td>
        <th scope="row" className="w-10">{props.project.ProjectID}</th>
        <td>
            <Link className="text-dark" to={{
                pathname: `/App/Tasks`,
                projectName: props.project.ProjectName
                }}>{props.project.ProjectName}
            </Link>
        </td>
        <td>{props.project.Department}</td>
        <td className="w-10">
            <Link className="text-dark" to={{
                pathname: `/App/Tasks`,
                category: props.project.ProjectCategory
                }}>{props.project.ProjectCategory}
            </Link>
        </td>
        <td>{props.project.ProjectManager}</td>
        <td className="w-35">
            Total: {props.project.taskData.count}
            <ProgressBar>
                <ProgressBar 
                    variant="info"  
                    now={(props.project.taskData.statuses[0].count !== 0)
                        ? props.project.taskData.statuses[0].count/props.project.taskData.count*100
                        : 0
                    } 
                    key={1} 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Queued" 
                    label={props.project.taskData.statuses[0].count}
                />
                <ProgressBar 
                    variant="primary" 
                    now={(props.project.taskData.statuses[1].count !== 0)
                        ? props.project.taskData.statuses[1].count/props.project.taskData.count*100
                        : 0
                    } 
                    key={2} 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Assigned" 
                    label={props.project.taskData.statuses[1].count}
                />
                <ProgressBar 
                    variant="warning" 
                    className="text-dark" 
                    now={(props.project.taskData.statuses[2].count !== 0)
                        ? props.project.taskData.statuses[2].count/props.project.taskData.count*100
                        : 0
                    } 
                    key={3} 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="In Progress" 
                    label={props.project.taskData.statuses[2].count}
                />
                <ProgressBar 
                    variant="danger"  
                    now={(props.project.taskData.statuses[3].count !== 0)
                        ? props.project.taskData.statuses[3].count/props.project.taskData.count*100
                        : 0
                    } 
                    key={4} 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Delayed" 
                    label={props.project.taskData.statuses[3].count}
                />
                <ProgressBar 
                    variant="success" 
                    now={(props.project.taskData.statuses[4].count !== 0)
                        ? props.project.taskData.statuses[4].count/props.project.taskData.count*100
                        : 0
                    }  
                    key={5} 
                    data-toggle="tooltip" 
                    data-placement="top" 
                    title="Completed" 
                    label={props.project.taskData.statuses[4].count}
                />
            </ProgressBar>
        </td>
    </tr>
);

export default ProjectTableEntry;