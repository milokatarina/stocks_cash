import axios from 'axios';

const STOCKS = 'stocks';

export const validateUser = (
    {
        name,
        gender,
        age,
        email
    }
) => {
    return axios.post(
        `${STOCKS}/validateUser`,
        {
            params: {
                name, gender, age, email
            }
        }
    );
};
