import {calculateBalance} from '../src/utils/calculations';

test('calculateBalance function', () => {
    expect(calculateBalance(
        50,
        50,
        500,
        500,
        1000)).toMatchObject(
        {"calculatedCashBalance": 1500, "lastRevenue": 500}
    );
});

//expect calculatenewBalance

