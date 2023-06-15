import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const CREATE_TODO = 'CREATE_TODO';
const SET_TODOS = 'SET_TODOS';

const todosReducer = (state = [], action)=> {
  if(action.type === SET_TODOS){
    return action.todos;
  }
  if(action.type === CREATE_TODO){
    return [...state, action.todo];
  }
  return state;
};

const _createTodo = (todo)=> {
  return {
    type: CREATE_TODO,
    todo
  };
};

const createTodo = (todo)=> {
  return async(dispatch)=> {
    const created = (await axios.post('/api/todos', todo)).data;
    dispatch(_createTodo(created));
  };
};

const setTodos = (todos)=> {
  return {
    type: SET_TODOS,
    todos
  };
};

const fetchTodos = ()=> {
  return async(dispatch)=> {
    const todos = (await axios.get('/api/todos')).data;
    dispatch(setTodos(todos));
  };
};

const reducer = combineReducers({
  todos: todosReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { createTodo, fetchTodos };
