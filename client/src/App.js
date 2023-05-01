import React, { useState } from "react";
import Axios from 'axios';
import { Route, Switch } from "react-router-dom";

import SideNav from "./components/SideNav/sideNav.component";
import TopNav from "./components/TopNav/topNav.component";
import Categories from "./components/Categories/categories.component";
import Projects from "./components/Projects/Projects.component";
import ProjectTasks from "./components/ProjectTasks/ProjectTasks.component";
import WorkOrders from "./components/WorkOrders/WorkOrders.component";

export default function App() {
  //const [bestShows, setBestShows] = useState([]);
  const [sideNavWidth, setSideNavWidth] = useState(true);

  function handleSideNavToggle() {
    setSideNavWidth(!sideNavWidth);
  }

  // defines width of the sidebar
  function handleSideNavWidth(widthToggle) {
    const prefix = "bg-dark mt-1 rounded-right shadow ";

    if (widthToggle === true) {
      return prefix;
    } else if (widthToggle === false) {
      return prefix + "sidebar-sm";
    }
  }

  return (
    <div className=" App bg-dark-white">
      {/* TopNav **/}
      <TopNav handleSideNavToggle={handleSideNavToggle} />
      <div className="wrapper">
        {/* Sidenav */}
        <SideNav handleSideNavWidth={handleSideNavWidth} sideNavWidth={sideNavWidth} />
        <div className="border-right-0 mx-1 my-1" id="content">
          {/* react router switch */}
          <main>
            <Switch>
              {/* Categories Page */}
              <Route path="/" component={Categories} exact />
              {/* Projects Page */}
              <Route path="/App/Projects" component={Projects} />
              {/* Project Tasks Page */}
              <Route path="/App/Tasks" component={ProjectTasks} />
              {/* Work orders Page */}
              <Route path="/App/WorkOrders" component={WorkOrders} />
              {/* Everything Else */}
              <Route path="*" component={()=> "Error 404 Not Found"} />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  );
}

/* 
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bestShows: [],
      sideNavWidth: true
    };

    this.handleSideNavToggle = this.handleSideNavToggle.bind(this);
    this.handleSideNavWidth = this.handleSideNavWidth.bind(this);

  }

  handleSideNavToggle(event) {
    this.setState( prevState =>({
      sideNavWidth: !prevState.sideNavWidth
    }));
  }

  // defines width of the sidebar
  handleSideNavWidth(widthToggle){
    const prefix = 'bg-dark mt-1 rounded-right shadow '

    if(widthToggle === true) {
      return prefix;
    }
    else if (widthToggle === false) {
      return prefix + 'sidebar-sm';
    }  
  }


  render() {
    return (
      <div className=" App bg-dark-white">
        {/* TopNav /}
        <TopNav handleSideNavToggle={this.handleSideNavToggle}/>
        <div className="wrapper">
          {/* Sidenav /}
          <SideNav handleSideNavWidth={this.handleSideNavWidth} sideNavWidth={this.state.sideNavWidth} />
          <div className="border-right-0 mx-1 my-1" id="content">
            {/* react router switch /}
            <main>
              <Switch>
                {/* Categories Page /}
                <Route path="/" component={Categories} exact />
                {/* Projects Page /}
                <Route path="/App/Projects" component={Projects}/>
                {/* Project Tasks Page /}
                <Route path="/App/Tasks" component={ProjectTasks}/>
                {/* Work orders Page /}
                <Route path="/App/WorkOrders" component={WorkOrders}/>
                {/* Everything Else /}
                <Route path="*" component={() => "Error 404 Not Found"} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
 */
