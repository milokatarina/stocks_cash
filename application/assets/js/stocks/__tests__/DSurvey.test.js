import React from 'react';
import renderer from 'react-test-renderer';
import DSurvey from "../src/containers/DSurvey";

it('renders correctly', () => {
    const tree = renderer
        .create(<DSurvey onNextChange={() => {
        }}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});