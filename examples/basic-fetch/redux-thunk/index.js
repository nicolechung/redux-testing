import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'

export const FETCHING_LYRIC = 'FETCHING_LYRIC'
export const FETCH_FAILED = 'FETCH_FAILED'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'

// test function
export function sum (a, b) {
  return a + b
}

// action
export function fetchLyric () {
  const request = axios.get('/api/passionfruit')

  return (dispatch, getState) => {
    dispatch(createAction(`FETCHING_LYRIC`)())

    return request.then(response => response.data)
    .then((response) => {
      // FETCH_SUCCESS
      // using `createAction` creates a payload key with the value of response
      dispatch(createAction(`FETCH_SUCCESS`)(response))
    })
    .catch((error) => {
      // FETCH_FAILED
      dispatch(createAction(`FETCH_FAILED`)(error))
    })
  }
}

/*
  How do you tests these?
  send a promise resolve, also a promise reject
*/

// todo: fetch a failed request

// reducer
const initialState = {
  isFetching: false,
  didError: false,
  lyric: ''
}



function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_LYRIC:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_FAILED:
      return {
        ...state,
        didError: true,
        isFetching: false
      }
    case FETCH_SUCCESS:
      return {
        lyric: action.payload,
        didError: false,
        isFetching: false
      }
    default:
      return state
  }
}

// setup store with redux-thunk middleware, also
// setup redux dev tool
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware
  ))
)

// initial state
console.log(store.getState())
// dispatch the action we created
store.dispatch(fetchLyric()).then(() => {
  console.log(store.getState())
})

