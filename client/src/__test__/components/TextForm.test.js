import React from 'react';
import * as renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import TextForm from 'components/TextForm';

describe('TextForm', () => {
  it('generates a snapshot', () => {
    const tree = renderer.create(<TextForm/>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`changes it's input value`, () => {
    const component = shallow(<TextForm/>);
    const textInput = component.find(`input[name="words"]`);
    const inputValue = 'hat';
    textInput.simulate('change', { target: { value: inputValue } });
    const componentState = component.state();

    expect(componentState.words).toEqual(inputValue)
  })
});
