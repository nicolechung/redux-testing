import 'rxjs'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'
import {Observable} from  'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax';

export const FETCH_LYRIC = 'FETCH_LYRIC'
export const FETCH_LYRIC_SUCCESS = 'FETCH_LYRIC_SUCCESS'
export const FETCH_LYRIC_ERROR = 'FETCH_LYRIC_ERROR'


// action creators
export const fetchLyric = createAction(FETCH_LYRIC)
const fetchLyricSuccess = createAction(FETCH_LYRIC_SUCCESS)
const fetchLyricFail = createAction(FETCH_LYRIC_ERROR)

export const fetchLyricEpic = action$ =>
action$.ofType(FETCH_LYRIC)
  .mergeMap(action =>
    ajax.getJSON('http://tranquil-fortress-99747.herokuapp.com/api/passionfruit')
      .map(response => fetchLyricSuccess(response))
      .catch(error => Observable.of(fetchLyricFail(error)))
  )


// todo: fetch a failed request
export const rootEpic = combineEpics(fetchLyricEpic)

// reducer
const initialState = {
  lyric: ''
}


/*
  Instead of actions for each state (pending, success, error)
  redux promise just returns the response (for a successfully resolved promise)
  or the error object
*/
function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_LYRIC_SUCCESS:
      let lyric = action.payload.lyric
      return {
        ...state,
        lyric: lyric
      }
    default:
      return state
  }
}

const epicMiddleware = createEpicMiddleware(rootEpic)
// setup store with redux-thunk middleware, also
// setup redux dev tool
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    epicMiddleware
  ))
)

// initial state
console.log(store.getState())
// dispatch the action we created
store.dispatch({type: FETCH_LYRIC})
setTimeout(function() {
  console.log('later')
  console.log(store.getState())
}, 2000)


