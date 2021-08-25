export const calculateBalance = (
    depositRevenuePercent, stocksRevenuePercent, currentCashBalance) => {
    //50 50 500 500 1000
    //pre:
    // depositPercent izmedju 0 i 100
    //stocksPercent izmedju 0 i 100
    const depositBalance = calculateNewBalance(currentCashBalance, depositRevenuePercent);
    const stockBalance = calculateNewBalance(currentCashBalance, stocksRevenuePercent);
    const lastRevenue = parseFloat((
        depositBalance
        + stockBalance).toFixed(2));
    const calculatedCashBalance = parseFloat((currentCashBalance + lastRevenue).toFixed(2));
    return {
        lastRevenue,
        calculatedCashBalance
    }
}

export const calculateNewBalance = (currentCashBalance, newBalancePercent) => {
    return currentCashBalance * newBalancePercent / 100;
}

export const calculateExpectedMinRate = (expRateStocks, standardDeviation) => {
    return (parseFloat(expRateStocks)
        - parseFloat(standardDeviation)).toFixed(2)
}

export const calculateExpectedMaxRate = (expRateStocks, standardDeviation) => {
    return (parseFloat(expRateStocks)
        + parseFloat(standardDeviation)).toFixed(2)
}
