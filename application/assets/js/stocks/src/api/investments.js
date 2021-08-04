import axios from 'axios';

const STOCKS = 'stocks';

export const logInvestment = (
    {
        userId,
        playId,
        period,
        depositPercent,
        stocksPercent,
        initCashBalance,
        totalCashBalance,
        rpLastPeriod
    }
) => {
    return axios.post(
        `${STOCKS}/logInvestment`,
        {
            params: {
                period,
                playId,
                userId,
                depositPercent,
                stocksPercent,
                initCashBalance,
                totalCashBalance,
                rpLastPeriod
            }
        }
    );
};
