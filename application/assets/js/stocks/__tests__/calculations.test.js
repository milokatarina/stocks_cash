import {calculateBalance, calculateExpectedMaxRate, calculateExpectedMinRate} from '../src/utils/calculations';

Number.prototype.toFixedNumber = function (digits, base) {
    var pow = Math.pow(base || 10, digits);
    return Math.round(this * pow) / pow;
}
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

test('calculateExpectedMinRate function', () => {
    expect(calculateExpectedMinRate(
        30,
        5)).toBe(25);
});

test('calculateExpectedMinRate function', () => {
    expect(calculateExpectedMaxRate(
        30,
        5)).toBe(35);
});


