import React, {Component} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateTodo from './CreateTodo';
import moment from 'moment';

const Todos = ({ todos })=>{
  return (
    <div id='content'>
      <CreateTodo />
      <ul>
        {
          todos.map( todo => {
            return (
              <li key={ todo.id }>
                Task: { todo.taskName }
                <p>
                assigned by { todo.assignee }
                <br />
                on { moment(todo.createdOn).format('MM/DD/YYYY hh:mm:ss a')}
                </p>
              </li>
            );
          })

        }
      </ul>
    </div>
  );
};

export default connect(({ todos })=> {
  return {
    todos
  };
})(Todos);


