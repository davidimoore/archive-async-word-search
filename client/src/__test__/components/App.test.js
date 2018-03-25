jest.mock('reducers/index')
import React from 'react';
import App from 'components/App';
import {shallow} from 'enzyme';

describe('App', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);

    expect(component.exists()).toBeTruthy();
  });
});
