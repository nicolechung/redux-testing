import 'rxjs'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createAction} from 'redux-actions'
import {Observable} from  'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax';

const FETCH_LYRIC = 'FETCH_LYRIC'
const FETCH_LYRIC_SUCCESS = 'FETCH_LYRIC_SUCCESS'
const FETCH_LYRIC_ERROR = 'FETCH_LYRIC_ERROR'


// action creators
const fetchLyric = createAction(FETCH_LYRIC)
const fetchLyricSuccess = createAction(FETCH_LYRIC_SUCCESS)
const fetchLyricFail = createAction(FETCH_LYRIC_ERROR)

// action: worker
const fetchLyricEpic = action$ =>
action$.ofType(FETCH_LYRIC)
  .mergeMap(action =>
    ajax.getJSON('/api/passionfruit')
      .map(response => fetchLyricSuccess(response))
      .catch(error => Observable.of(fetchLyricFail(error)))
  )

// action: watcher (sagas have a worker and a watcher)

// todo: fetch a failed request
const rootEpic = combineEpics(fetchLyricEpic)

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
      console.log('success')
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
store.dispatch(fetchLyric())

