import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'

const FETCHING_LYRIC = 'FETCHING_LYRIC'
const FETCH_FAILED = 'FETCH_FAILED'
const FETCH_SUCCESS = 'FETCH_SUCCESS'

// action
function fetchLyric () {
  const request = axios.get('/api/passionfruit')

  return (dispatch, getState) => {
    dispatch(createAction(`FETCHING_LYRIC`)())

    return request.then(response => response.data)
    .then((response) => {
      // FETCH_SUCCESS
      console.log('----fetch success----')
      dispatch(createAction(`FETCH_SUCCESS`)(response))
    })
    .catch((error) => {
      // FETCH_FAILED
      dispatch(createAction(`FETCH_FAILED`)(error))
    })
  }
}

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

