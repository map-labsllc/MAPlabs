import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

import Top5 from './Top5'

Enzyme.configure( { adapter: new Adapter() } )
chai.use( chaiEnzyme() )

const shallow = Enzyme.shallow
const { expect } = chai

const props = {
    data: {selected: true, field1: 'knowledge'},
    question: {
        code: Math.floor( Math.random() * 100 ),
        text: 'Select top 5',
        promptCode: Math.floor( Math.random() * 100 )
    },
}

describe( '<Top 5 /> with isDynamic=true', () => {

    it( 'requires a data prop', () => {
        expect( () => shallow( <Top5 />) ).to.throw( 'Warning: Failed prop type: The prop `data` is marked as required' )
    } )
    it( 'requires a question prop', () => {
        expect( () => shallow( <Top5
                                data={props.data} fields={props.fields} /> ) ).to.throw( 'Warning: Failed prop type: The prop `question` is marked as required' )
    } )
    it( 'renders question.text in a p with id question.code',  () => {
        const wrapper = shallow( <Bracket {...props} isDynamic={true}/> )
        expect( wrapper.find( 'p#question' + props.question.code ) ).to.have.lengthOf( 1 )
        expect( wrapper.find( 'p#question' + props.question.code ).text() ).to.equal( props.question.text )
    } )
    it( 'renders two children in a p with prompts class if isDynamic',  () => {
        const wrapper = shallow( <Bracket {...props} isDynamic={true}/> )
        expect( wrapper.find( 'p.prompts' ).children() ).to.have.lengthOf( 2 )
    } )
    it( 'handles click on first prompt and re-renders with second prompt replaced',  () => {
        const wrapper = shallow( <Bracket {...props } isDynamic={true}/> )
        const prompts = wrapper.find( '.prompts' )

        const firstChild = prompts.childAt( 0 )
        const secondChild = prompts.childAt( 1 )

        //check initial values of children
        expect( firstChild.text() ).to.equal( props.prompts[0] )
        expect( secondChild.text() ).to.equal( props.prompts[1] )

        //click first child
        firstChild.simulate( "click", {} )

        //expect first child is still first child
        expect( wrapper.find( '.prompts' ).childAt( 0 ).text() ).to.equal( props.prompts[0] )
        //expect second child third prompt
        expect( wrapper.find( '.prompts' ).childAt( 1 ).text() ).to.equal( props.prompts[2] )
    } )
    it( 'handles click on second prompt and re-renders with second prompt in place of first, and new prompt in place of second',  () => {
        const wrapper = shallow( <Bracket {...props} isDynamic={true}/> )
        const prompts = wrapper.find( '.prompts' )

        const firstChild = prompts.childAt( 0 )
        const secondChild = prompts.childAt( 1 )

        //check initial values of children
        expect( firstChild.text() ).to.equal( props.prompts[0] )
        expect( secondChild.text() ).to.equal( props.prompts[1] )

        secondChild.simulate( "click", {} )

        //expect first child is prior second child
        expect( wrapper.find( '.prompts' ).childAt( 0 ).text() ).to.equal( props.prompts[1] )
        //expect second child is third prompt
        expect( wrapper.find( '.prompts' ).childAt( 1 ).text() ).to.equal( props.prompts[2] )
    } )
    // it( 'invokes onUpdateStoreCB with the userId, promptCode, prompts when a prompt is clicked',  () => {
    //     const wrapper = shallow( <Bracket {...props} isDynamic={true} prompts={props.prompts.slice( 1 )}/> )
    //
    //     wrapper.find( '.prompts' ).childAt( 0 ).simulate( "click", {} )
    //
    //     expect( props.onUpdateStoreCB.callCount ).to.equal( 1 )
    //     expect( props.onUpdateStoreCB.calledWith( props.userId, props.question.promptCode, [props.prompts[1]] ) ).to.be.true
    // } )
} )
