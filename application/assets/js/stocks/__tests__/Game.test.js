import React from 'react';
import renderer from 'react-test-renderer';
import Game from "../src/containers/Game";
import {MOCK_YEAR_REVENUE} from "../constants";

it('renders correctly', () => {
    const tree = renderer
        .create(<Game
            yearsRevenue={MOCK_YEAR_REVENUE}
            userId={1}
            playId={1}
            onScreenChange={() => {
            }}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});