import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
    STATICDATA_LOADING,
    STATICDATA_LOAD,
    STATICDATA_ERROR_DB,
} from './constants'

import { loadAllStaticdataAC } from './actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const URL = `end:.json`
const DATA = { section: 'TEST', jsonData: ['TEST']}
const BELIEFS_FN = 'beliefs'
const LIFEDESCRS_FN = 'lifedescrs'
const STRENGTHS_FN = 'strengths'

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  describe('loadAllStaticdataAC', () => {
    it('creates STATICDATA_LOAD when fetching was successful', async () => {
        fetchMock.get(URL, DATA.jsonData)
        const expectedActions = [
            { type: STATICDATA_LOADING },
            { type: STATICDATA_LOAD, payload: {
                [BELIEFS_FN]: DATA.jsonData,
                [LIFEDESCRS_FN]: DATA.jsonData,
                [STRENGTHS_FN]: DATA.jsonData
            }}
        ]
        const store = mockStore()

        await store.dispatch(loadAllStaticdataAC())

        expect(store.getActions()).toEqual(expectedActions)
    }),
    it('creates STATICDATA_ERROR_DB when fetching was not successful', async () => {
        const error = new Error('Fetch failed')
        fetchMock.get(URL, { throws: error })
        const expectedActions = [
            { type: STATICDATA_LOADING },
            { type: STATICDATA_ERROR_DB, payload: error }
        ]
        const store = mockStore()

        await store.dispatch(loadAllStaticdataAC())        

        expect(store.getActions()).toEqual(expectedActions)
    })
  })
})