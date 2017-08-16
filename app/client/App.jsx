import React from 'react';
import { Search, SearchUsers, DropDown, Issues, IssueBoard, User, SearchRepo } from './components';
import './App.less';
import { github } from './api';
import Switch from 'react-router-dom/Switch';
import Router from 'react-router-dom/Route';
import Route from 'react-router-dom/Router';
import PropTypes from 'prop-types';



class App extends React.Component {

  constructor(props) {
    super(props)
  }

  static childContextTypes = {
    history: PropTypes.object,
  };

  getChildContext = () => {
   const { history } = this.props;
   return {
     history
   };
  }

  render() {
    const { errors, loading } = this.props;

    return (
        <div className="main">
          <div className="main-title">
            <h1>Repository Issues</h1>
          </div>
          <div className="main-body">
            <Search>
                <Router exact path="/" component={SearchUsers} />
                <Router path="/:login" component={SearchRepo} />
                <Router exact path="/:login/:repo" component={Issues}/>
                <Router exact path="/:login/:repo/issue/:id" component={IssueBoard} />
            </Search>
          </div>
        </div>
    )
  }
}

export default App;
