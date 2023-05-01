import React from 'react';

import teachers from './teachers.json';
import data from './data.json';

class WorkOrders extends React.Component
{
    constructor(props) {
        super(props);

        this.state = {
            teachers: teachers,
            data: data,
            selectedTeacher: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectTeacher = this.handleSelectTeacher.bind(this);
    }

    //Universal change handler cause we are good coders who definetely didn't google this
    //Credit: Tom Kelly at https://medium.com/better-programming/handling-multiple-form-inputs-in-react-c5eb83755d15
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // Selects a teacher from the scrollable list
    handleSelectTeacher(index) {
        this.setState({
            selectedTeacher: this.state.teachers[index].label
        })
    }

    //colors the badge based on the value of the count
    handleCountBadge(count) {
        const prefix = 'float-right badge badge-pill badge-'

        if (count === 0) {
            return prefix + 'danger';
        }
        else if(count >= 3) {
            return prefix + 'success';
        }
        else {
            return prefix + 'warning';
        }
    }
    
    render()
    {

        return(
            <div>
                <div className="card bg-light mb-3 border-dark text-white mx-2">
                        <div className="card-header bg-dark border-bottom border-dark">
                            Report 4
                        </div>
                        <div className="card-body bg-white text-dark float-none">
                            <div className="card-group">
                                <div className="card w-25 float-left border-left-0 border-right-0 border-bottom-0">
                                    <div className="card-header h6 border-top-0 border-bottom-0">
                                        Teacher List
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Please select a teacher</h5>
                                        <ul className="list-group list-group-scroll">
                                            {this.state.teachers.map((teacher, index) => (
                                                <li key={index} className="list-group-item list-hover" onClick={() => this.handleSelectTeacher(index)}>{teacher.label}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="card w-75 float-right border-left-0 border-right-0 border-bottom-0">
                                    <div className="card-header h6 border-top-0 border-bottom-0">
                                        Results
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{this.state.selectedTeacher}</h5>
                                        <ul className="list-group list-group-flush">
                                            {this.state.data.map((info, index) => (
                                                <li className="list-group-item text-left">
                                                    {info.status}
                                                    <span className={this.handleCountBadge(info.count)}>{info.count}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}

export default WorkOrders;