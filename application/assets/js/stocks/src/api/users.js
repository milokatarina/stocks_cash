import axios from 'axios';

const STOCKS = 'stocks';

export const initGame = (
    {
        studies,
        gender,
        age,
    }
) => {
    return axios.post(
        `${STOCKS}/initGame`,
        {
            params: {
                gender, age, studies
            }
        }
    );
};

export const sendRSAnswers = (
    {
        userId,
        rs11,
        rs12,
        rs13,
    }
) => {
    return axios.post(
        `${STOCKS}/sendRSAnswers`,
        {
            params: {
                user_id: userId,
                rs11,
                rs12,
                rs13
            }
        }
    );
};
