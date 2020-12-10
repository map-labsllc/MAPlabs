import React from 'react'
import { configure, mount , shallow } from 'enzyme';
import Strength from '../Strength'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() });

const mockFn = jest.fn()

const defaultProps = {
  number: 1,
  strength: 'Bravery',
  isDynamic: true,
  strengthOptions: [{ id: 1, value: 'Bravery' }, { id: 2, value: 'Curiosity' }],
  onUpdateStoreCB: mockFn // call back to save
}

function setup(props) {
  const wrapper = shallow(<Strength {...props} />)
  return { wrapper, props, mockFn }
}

describe('<Strength /> component, ', () => {
  test('should render Strength component', () => {
    const { wrapper, props } = setup(defaultProps);
    expect(wrapper.contains(props.strength)).toEqual(true)
    expect(wrapper.contains('select')).toEqual(true)
  })

  test('should render static Strength component', () => {
    const { wrapper, props } = setup({ ...defaultProps, isDynamic: false });
    expect(wrapper.contains(props.strength)).toEqual(true)
  })

  test('Strength component select triggers callback', () => {
    const { wrapper, props, mockFn } = setup(defaultProps);

    const selectedValue = props.strengthOptions[0].value

    wrapper.find('select').simulate('change', {
      target: { selectedValue }
    });

    expect(mockFn).toHaveBeenCalledWith([props.number, selectedValue])
  })
})