import axios from 'axios';

const STOCKS = 'stocks';

export const initGame = (
    {
        ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10
    }
) => {
    return axios.post(
        `${STOCKS}/initGame`,
        {
            params: {
                ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10
            }
        }
    );
};

export const sendRSAnswers = (
    {
        userId,
        rs1, rs2, rs3, rs4, rs5, rs6, rs7
    }
) => {
    return axios.post(
        `${STOCKS}/sendRSAnswers`,
        {
            params: {
                user_id: userId,
                rs1, rs2, rs3, rs4, rs5, rs6, rs7
            }
        }
    );
};
