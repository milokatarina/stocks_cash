import React from 'react';
import "babel-polyfill";
import renderer from 'react-test-renderer';
import Game from "../src/containers/Game";
import {MOCK_YEAR_REVENUE} from "../constants";

it('renders correctly', async() => {
    const tree = renderer
        .create(<Game
            yearsRevenue={MOCK_YEAR_REVENUE}
            userId={22}
            playId={22}
            onScreenChange={() => {
            }}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});