import React from 'react';


const ToogleSwitch = (props) => ( 
    <div className="btn-group mx-2 mb-2" role="group" aria-label="Basic example">
        <button type="button" onClick={props.handleToggleSelect} className={props.toggleSLTStyle}><small>Total:&nbsp;
                {props.instructionalTotal}</small> <br></br> Instructional</button>
        <button type="button" onClick={props.handleToggleSelect} className={props.toggleObsStyle}><small>Total:&nbsp;
                {props.noninstructionalTotal}</small> <br></br> Noninstructional</button>
    </div>
);

export default ToogleSwitch;
