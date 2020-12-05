import React from 'react'
import { configure, mount , shallow } from 'enzyme';
import ErrorAlert from '../ErrorAlert'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

describe('<ErrorAlert /> component, ', () => {
  test('should render ErrorAlert component', () => {
    const message = 'This is a test.'
    const wrapper = shallow(<ErrorAlert>{message}</ErrorAlert>)

    expect(wrapper.find('.alert').length).toBe(1)
    expect(wrapper.contains(message)).toEqual(true)
  })
})