import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

import Bracket from './Bracket'

Enzyme.configure({ adapter: new Adapter() })
chai.use(chaiEnzyme())

const shallow = Enzyme.shallow
const { expect } = chai 

const props = {
    prompts: ['Rich/Poor', 'Happy/Sad', 'Love/Hate'],
    question: {
        code: Math.random(),
        text: 'How do you feel?'
    },
    onUpdateStoreCB: () => {}
}

describe('<Bracket />', () => {
    let stub 
    beforeAll(() => {
        stub = sinon.stub(console, 'error')
        stub.throwsArg(0)
    })
    afterEach(() => {
        stub.resetHistory()
    }) 

    it('requires a prompts prop', () => {
        expect(() => shallow(<Bracket />)).to.throw('Warning: Failed prop type: The prop `prompts` is marked as required')
    })
    it('requires a question prop', () => {
        expect(() => shallow(<Bracket 
                                prompts={props.prompts}/>)).to.throw('Warning: Failed prop type: The prop `question` is marked as required')
    })
    it('requires an onUpdateStoreCB prop', () => {
        expect(() => shallow(<Bracket 
                                prompts={props.prompts} 
                                question={props.question}/>)).to.throw('Warning: Failed prop type: The prop `onUpdateStoreCB` is marked as required')
    })
    it('renders all prompts',  () => {
        const wrapper = shallow(<Bracket {...props}/>)
        wrapper.find.to.equal(props.prompts.length)
    })
})