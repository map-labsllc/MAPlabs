import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
    STATICDATA_LOADING,
    STATICDATA_LOAD,
    STATICDATA_ERROR_DB,
} from './constants'

import {
    loadstaticJSON,
    loadAllStaticdataAC   
} from './actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const URL = `end:.json`
const DATA = { section: 'TEST', jsonData: ['TEST']}

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  describe('loadstaticJSON', () => {
    it('returns object with section and jsonData when fetching was successful', async () => {
        fetchMock.get(URL, DATA.jsonData)
        const expectedActions = []
        const store = mockStore()

        const expectedReturn = await loadstaticJSON(store.dispatch, DATA.section)

        expect(store.getActions()).toEqual(expectedActions)
        expect(expectedReturn).toEqual(DATA)
    }),
    it('creates STATICDATA_ERROR_DB when fetching answers was not successful', async () => {
        const error = new Error('Fetch failed')
        fetchMock.get(URL, { throws: error })
        const expectedActions = [
            { type: STATICDATA_ERROR_DB, payload: error }
        ]
        const store = mockStore()

        await loadstaticJSON(store.dispatch, DATA.section)

        expect(store.getActions()).toEqual(expectedActions)
    })
  })
})