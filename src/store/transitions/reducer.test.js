import {
    TRANSITIONS_LOADING,
    TRANSITIONS_LOAD,
    TRANSITIONS_UPDATE,
    TRANSITIONS_ERROR_DB
   } from './constants'

import { transitionsRD } from './reducer'
  
const PAYLOAD = { question_code: 'code', transitions: 'transitions'}

describe( 'answers reducer', () => {
    it( 'returns passed in state by default', () => {
        expect( transitionsRD( PAYLOAD, {} ) ).toEqual( PAYLOAD )
    } )
    it( 'returns initial state when no state is passed in', () => {
        expect( transitionsRD( undefined, {} ) ).toEqual( {
            isLoading: true,
            isError: false,
            errorMessage: '',
            questions: {},  
        } )
    } )
    it( 'returns initial state on TRANSITIONS_LOADING', () => {
        expect( transitionsRD( undefined, {type: TRANSITIONS_LOADING} ) ).toEqual( {
            isLoading: true,
            isError: false,
            errorMessage: '',
            questions: {},  
        } )
    } )
    it( 'sets isLoading to false and sets questions to payload on TRANSITIONS_LOAD', () => {
        expect( transitionsRD( undefined, {
            type: TRANSITIONS_LOAD,
            payload: PAYLOAD
        } ) ).toEqual( {
            isLoading: false,
            isError: false,
            errorMessage: '',
            questions: PAYLOAD,  
        } )
    } )
    it( 'sets payload.transitions to payload.question_code on TRANSITIONS_UPDATE', () => {
        expect( transitionsRD( undefined, {
            type: TRANSITIONS_UPDATE,
            payload: PAYLOAD
        } ) ).toEqual( {
            isLoading: true,
            isError: false,
            errorMessage: '',
            questions: { [PAYLOAD.question_code]: PAYLOAD.transitions },  
        } )
    } )
    it( 'sets isError to true, isLoading to false, errorMessage to payload on TRANSITIONS_ERROR_DB', () => {
        expect( transitionsRD( undefined, {
            type: TRANSITIONS_ERROR_DB,
            payload: PAYLOAD
        } ) ).toEqual( {
            isLoading: false,
            isError: true,
            errorMessage: PAYLOAD,
            questions: {},  
        } )
    } )
} )
