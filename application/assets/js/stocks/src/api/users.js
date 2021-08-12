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

export const sentOptAnswers = (
    {userId, os1, os2, os3, os4, os5}
) => {
    return axios.post(
        `${STOCKS}/sendOptAnswers`,
        {
            params: {
                user_id: userId,
                os1, os2, os3, os4, os5
            }
        }
    );
};

export const sendConfidenceAnswers = (
    {
        userId,
        cs1, cs2, cs3, cs4, cs5
    }
) => {
    return axios.post(
        `${STOCKS}/sendCSAnswers`,
        {
            params: {
                user_id: userId,
                cs1, cs2, cs3, cs4, cs5
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
