import React from 'react'
import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon'

import Top5 from './Top5'

Enzyme.configure( { adapter: new Adapter() } )
chai.use( chaiEnzyme() )

const {shallow} = Enzyme
const { expect } = chai

const props = {
    id: 'abcd-efgh-ijkl-mnop',
    data: {selected: false, field1: 'knowledge'},
    fields: ['field1']
}

describe('<Top5 />', () => {
    it('renders field attribute when not isDynamic', () => {
        const wrapper = shallow( <Top5 {...props} isDynamic={false}/> )
        const field = props.fields[0]
        expect(wrapper.find('tr').contains([<td>{ props.data[field] }</td>]))
    })

    it( 'renders checkbox and field attribute',  () => {
        const wrapper = shallow( <Top5 {...props} isDynamic={true}/> )
        const field = props.fields[0]
        expect(wrapper.exists({ type: 'checkbox' }))
        expect(wrapper.find('tr').contains([<td>{ props.data[field] }</td>]))
    } )

    it('should check checkbox onChange event', () => {
        const updateCBMock = jest.fn();
        const wrapper = mount(<Top5 updateCB={updateCBMock} {...props} isDynamic={true}/>);
            const viewChildren = wrapper.find('td');
            const checkbox = viewChildren.find({type: 'checkbox'}).first();
            checkbox.simulate('click')
            checkbox.simulate('change', { target: { checked: true } });
            expect(updateCBMock.mock.calls.length).to.equal(1)
            expect(updateCBMock.mock.calls.first().calledWith(props.id, {selected: true, ...props})).to.be.true
            // expect(updateCBMock).toHaveBeenLastCalledWith(props.id, {selected: true, ...props})
        });
} )
