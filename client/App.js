import React, {Component} from 'react'
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Todos from './Todos'
import { connect } from 'react-redux';
import { fetchTodos } from './store';


class App extends Component {
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <Router>
        <div id='main'>
          <h1><Link to='/'>Universal Todos ({this.props.todos.length})</Link></h1>
            <Route exact path='/' component={Todos} />
        </div>
      </Router>
    );
  }
}

export default connect(
  ({ todos })=> {
    return {
      todos
    };
  },
  (dispatch)=> {
    return {
      load: ()=> dispatch(fetchTodos()) 
    };
  },
)(App);
