import React from 'react';
import renderer from 'react-test-renderer';
import {MOCK_YEAR_REVENUE} from "../constants";
import Graph from "../src/components/Graph";

it('renders correctly', () => {
    const tree = renderer
        .create(
            <Graph yearsRevenue={MOCK_YEAR_REVENUE.slice(0, 1 + 10)}
                   isTrial={false}
                   currentYearRevenue={MOCK_YEAR_REVENUE[10]}
            />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});