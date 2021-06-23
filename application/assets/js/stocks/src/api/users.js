import axios from 'axios';

const STOCKS = 'stocks';

export const initGame = (
    {
        name,
        gender,
        age,
        email
    }
) => {
    return axios.post(
        `${STOCKS}/initGame`,
        {
            params: {
                name, gender, age, email
            }
        }
    );
};
