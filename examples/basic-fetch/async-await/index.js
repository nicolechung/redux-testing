import axios from 'axios'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'

export const FETCHING_LYRIC = 'FETCHING_LYRIC'
export const FETCH_LYRIC_FAILED = 'FETCH_LYRIC_FAILED'
export const FETCH_LYRIC_SUCCESS = 'FETCH_LYRIC_SUCCESS'

// action
export function fetchLyric () {
  return async (dispatch, getState) => {
    dispatch(createAction(FETCHING_LYRIC))
    try {
      const response = await axios.get('/api/passionfruit')
      const json = await response.data
      dispatch(createAction(FETCH_LYRIC_SUCCESS)(json))
    } catch (e) {
      dispatch(createAction(FETCH_LYRIC_FAILED)(e))
    }
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
    case FETCH_LYRIC_FAILED:
      return {
        ...state,
        didError: true,
        isFetching: false
      }
    case FETCH_LYRIC_SUCCESS:
      let lyric = action.payload.lyric
      return {
        lyric: lyric,
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

