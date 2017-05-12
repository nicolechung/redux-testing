/* eslint-env jest */
import axios from 'axios'
import { call, put } from 'redux-saga/effects'
import { fetchLyric, FETCH_SUCCEDED } from './index'

test('fetchLyric Saga test', () => {
  const gen = fetchLyric()

  expect(gen.next().value).toEqual(call(axios.get, '/api/passionfruit'))
  expect(gen.next().value).toEqual(put({type: FETCH_SUCCEDED}))
})