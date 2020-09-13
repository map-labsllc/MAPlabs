import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
    LISTS_LOADING,
    LISTS_LOAD,
    LISTS_ERROR_DB,
} from './constants'

import { loadListsAC } from './actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore( middlewares )
const URL = `end:.json`
const DATA = { section: 'TEST', jsonData: ['TEST']}
const BELIEFS_FN = 'beliefs'
const RELATIONSHIPS_FN = 'relationships'
const STRENGTHS_FN = 'strengths'

describe( 'async actions', () => {
  afterEach( () => {
    fetchMock.restore()
  } )
  describe( 'loadListsAC', () => {
    it( 'creates lists when fetching was successful', async () => {
        fetchMock.get( URL, DATA.jsonData )
        const expectedActions = [
            { type: LISTS_LOADING },
            { type: LISTS_LOAD, payload: {
                [BELIEFS_FN]: DATA.jsonData,
                [RELATIONSHIPS_FN]: DATA.jsonData,
                [STRENGTHS_FN]: DATA.jsonData
            }}
        ]
        const store = mockStore()

        await store.dispatch( loadListsAC() )

        expect( store.getActions() ).toEqual( expectedActions )
    } )
    it( 'creates LISTS_ERROR_DB when fetching was not successful', async () => {
        const error = new Error( 'Fetch failed' )
        fetchMock.get( URL, { throws: error } )
        const expectedActions = [
            { type: LISTS_LOADING },
            { type: LISTS_ERROR_DB, payload: error }
        ]
        const store = mockStore()

        await store.dispatch( loadListsAC() )

        expect( store.getActions() ).toEqual( expectedActions )
    } )
  } )
} )