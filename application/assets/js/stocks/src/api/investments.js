import axios from 'axios';

const STOCKS = 'stocks';

export const logInvestment = (
    {
        userId,
        depositPercent,
        stockPercent,
        initCashBalance,
        totalCashBalance
    }
) => {
    return axios.post(
        `${STOCKS}/logInvestment`,
        {
            params: {
                userId,
                depositPercent,
                stockPercent,
                initCashBalance,
                totalCashBalance
            }
        }
    );
};
