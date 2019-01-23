import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

import {
    TRANSITIONS_LOADING,
    TRANSITIONS_LOAD,
    TRANSITIONS_ERROR_DB,
    TRANSITIONS_PERSIST
} from './constants'

import { 
    loadAllTransitionsAC, 
    persistTransitionsAC
} from './actions'

const middlewares = [ thunk ]
const mockStore = configureMockStore( middlewares )
const TRANSITIONS = ['TRANSITIONS']
const ID = 1
const URL = `${process.env.REACT_APP_DB_URL}/transitions/${ID}`

describe( 'async actions', () => {
    afterEach( () => {
      fetchMock.restore()
    } )
  
    describe( 'loadAllAnswersAC', () => {
      it( 'creates TRANSITIONS_LOAD when fetching answers was successful', async () => {
          fetchMock.get( URL, TRANSITIONS )
          const expectedActions = [
              { type: TRANSITIONS_LOADING },
              { type: TRANSITIONS_LOAD, payload: TRANSITIONS }
          ]
          const store = mockStore()
  
          await store.dispatch( loadAllTransitionsAC( ID ) )
  
          expect( store.getActions() ).toEqual( expectedActions )
      } )
      it( 'creates TRANSITIONS_ERROR_DB when fetching answers was not successful', async () => {
          const error = new Error( 'Fetch failed' )
          fetchMock.get( URL, { throws: error } )
          const expectedActions = [
              { type: TRANSITIONS_LOADING },
              { type: TRANSITIONS_ERROR_DB, payload: error }
          ]
          const store = mockStore()
  
          await store.dispatch( loadAllTransitionsAC( ID ) )
  
          expect( store.getActions() ).toEqual( expectedActions )
      } )
    } )
    describe( 'persistTransitionsAC', () => {
        it( 'creates ANSWERS_PERSIST when posting answers was successful', async () => {
            fetchMock.post( `${URL}/${ID}`, TRANSITIONS )
            const expectedActions = [
                { type: TRANSITIONS_PERSIST }
            ]
            const store = mockStore()
    
            await store.dispatch( persistTransitionsAC( ID, ID, TRANSITIONS ) )
    
            expect( store.getActions() ).toEqual( expectedActions )
        } )
        it( 'creates ANSWERS_ERROR_DB when posting answers was not successful', async () => {
            const error = new Error( 'Fetch failed' )
            fetchMock.post( `${URL}/${ID}`, { throws: error } )
            const expectedActions = [
                { type: TRANSITIONS_ERROR_DB, payload: error }
            ]
            const store = mockStore()
    
            await store.dispatch( persistTransitionsAC( ID, ID, TRANSITIONS ) )
    
            expect( store.getActions() ).toEqual( expectedActions )
        } )
      } )
} )   