export const calculateBalance = (
    depositRevenuePercentArg,
    stocksRevenuePercentArg,
    currentDepositBalance,
    currentStocksBalance,
    currentCashBalance) => {
    let depositRevenuePercent = parseFloat(depositRevenuePercentArg);
    let stocksRevenuePercent = parseFloat(stocksRevenuePercentArg);
    pre: {
        typeof depositRevenuePercent === 'number';
        depositRevenuePercent <= 100, depositRevenuePercent;
        typeof stocksRevenuePercent === 'number';
        stocksRevenuePercent <= 100, stocksRevenuePercent;
    }
    const depositBalance = calculateNewBalance(currentDepositBalance, depositRevenuePercent);
    const stockBalance = calculateNewBalance(currentStocksBalance, stocksRevenuePercent);

    const lastRevenue = parseFloat((
        depositBalance
        + stockBalance).toFixed(2));
    const calculatedCashBalance = parseFloat((currentCashBalance + lastRevenue).toFixed(2));
    return {
        lastRevenue,
        calculatedCashBalance
    }
    post: {
        typeof calculatedCashBalance === 'number';
        typeof lastRevenue === 'number';
    }
}

export const calculateNewBalance = (currentCashBalance, newBalancePercentArg) => {
    const newBalancePercent = parseFloat(newBalancePercentArg);
    pre:{
        typeof newBalancePercent === 'number';
        newBalancePercent <= 100;
    }
    return currentCashBalance * newBalancePercent / 100;
}

export const calculateExpectedMinRate = (expRateStocks, standardDeviation) => {
    return (parseFloat(expRateStocks)
        - parseFloat(standardDeviation)).toFixedNumber(2)
}

export const calculateExpectedMaxRate = (expRateStocks, standardDeviation) => {
    return (parseFloat(expRateStocks)
        + parseFloat(standardDeviation)).toFixedNumber(2)
    post: {
        it > 0;
    }
}
