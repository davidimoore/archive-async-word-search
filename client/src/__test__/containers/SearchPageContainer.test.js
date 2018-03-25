import React from 'react';
import { SearchPageContainer } from 'containers/SearchPageContainer';
import { shallow } from 'enzyme';

describe('SearchPageContainer', () => {
  it('renders the TextForm', () => {
    const container = shallow(<SearchPageContainer/>);
    const textFormComponent = container.find('SearchPage');

    expect(textFormComponent.length).toEqual(1)
  })

});
