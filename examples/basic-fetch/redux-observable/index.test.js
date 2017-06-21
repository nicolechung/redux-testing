/* eslint-env jest */
import configureMockStore from 'redux-mock-store'
import { createEpicMiddleware, ActionsObservable } from 'redux-observable';
import nock from 'nock'

import { fetchLyric, fetchLyricEpic, rootEpic, FETCH_LYRIC, FETCH_LYRIC_SUCCESS } from './index'

let epicMiddleware = createEpicMiddleware(rootEpic)
const middlewares = [epicMiddleware]

const mockStore = configureMockStore(middlewares)

test('it creates FETCH_LYRIC_SUCCESS when fetching the lyric has been done', () => {
  const payload = {
      'lyric': "Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no"
  }
  const action$ = ActionsObservable.of({type: FETCH_LYRIC})

  return fetchLyricEpic(action$).toPromise()
           .then((actionReceived) => {
              expect(actionReceived.type).toBe('FETCH_LYRIC_SUCCESS')
              expect(actionReceived.payload).toEqual(payload)
           })
})
