const redux = require('redux');
const createStore = redux.legacy_createStore;
const middleWare = redux.applyMiddleware;
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios');

const initialState = {
  isLoading: false,
  data: [],
  error: ''
}

const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED';
const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED';
const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED';

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users
  }
}
const fetchUserFailed = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        isLoading: true
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        isLoading: false,
        data: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILED:
      return {
        isLoading: false,
        data: [],
        error: action.payload
      }
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest())
    axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      const user = res?.data?.map(user => user.id);
      dispatch(fetchUserSuccess(user))
    }).catch(error => {
      dispatch(fetchUserFailed(error.message))
    })
  }
}

const store = createStore(reducer, middleWare(thunkMiddleWare));
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers());