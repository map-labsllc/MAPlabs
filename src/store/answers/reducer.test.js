import {
    ANSWERS_LOADING,
    ANSWERS_LOAD,
    ANSWERS_ERROR_DB,
    ANSWERS_UPDATE,
    ANSWERS_NO_OP,
  } from './constants'

import { answersRD } from './reducer'
  
const PAYLOAD = { question_code: 'code', answers: 'answers'}

describe( 'answers reducer', () => {
    it( 'returns passed in state by default', () => {
        expect( answersRD( PAYLOAD, {} ) ).toEqual( PAYLOAD )
    } )
    it( 'returns initial state when no state is passed in', () => {
        expect( answersRD( undefined, {} ) ).toEqual( {
            isLoading: true,
            isError: false,
            errorMessage: '',
            questions: {},  
        } )
    } )
    it( 'returns initial state on ANSWERS_LOADING', () => {
        expect( answersRD( undefined, {type: ANSWERS_LOADING} ) ).toEqual( {
            isLoading: true,
            isError: false,
            errorMessage: '',
            questions: {},  
        } )
    } )
    it( 'sets isLoading to false and sets questions to payload on ANSWERS_LOAD', () => {
        expect( answersRD( undefined, {
            type: ANSWERS_LOAD,
            payload: PAYLOAD
        } ) ).toEqual( {
            isLoading: false,
            isError: false,
            errorMessage: '',
            questions: PAYLOAD,  
        } )
    } )
    it( 'sets payload.answers to payload.question_code on ANSWERS_UPDATE', () => {
        expect( answersRD( undefined, {
            type: ANSWERS_UPDATE,
            payload: PAYLOAD
        } ) ).toEqual( {
            isLoading: true,
            isError: false,
            errorMessage: '',
            questions: { [PAYLOAD.question_code]: PAYLOAD.answers },  
        } )
    } )
    it( 'sets isError to true, isLoading to false, errorMessage to payload on ANSWERS_ERROR_DB', () => {
        expect( answersRD( undefined, {
            type: ANSWERS_ERROR_DB,
            payload: PAYLOAD
        } ) ).toEqual( {
            isLoading: false,
            isError: true,
            errorMessage: PAYLOAD,
            questions: {},  
        } )
    } )
    it( 'returns passed in state on ANSWERS_NO_OP', () => {
        expect( answersRD( PAYLOAD, {type: ANSWERS_NO_OP} ) ).toEqual( PAYLOAD )
    } )
} )