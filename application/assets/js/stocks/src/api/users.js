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

export const sendRSAnswers2 = (
    {
        userId,
        rs8, rs9, rs10, rs11, rs12, rs13, rs14
    }
) => {
    return axios.post(
        `${STOCKS}/sendRSAnswers2`,
        {
            params: {
                user_id: userId,
                rs8, rs9, rs10, rs11, rs12, rs13, rs14
            }
        }
    );
};

export const sendKSAnswers = (
    {
        userId,
        ks1, ks2, ks3, ks4, ks5, ks6, ks7
    }
) => {
    return axios.post(
        `${STOCKS}/sendKSAnswers`,
        {
            params: {
                user_id: userId,
                ks1, ks2, ks3, ks4, ks5, ks6, ks7
            }
        }
    );
};

export const sendFSAnswers = (
    {
        userId,
        fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12
    }
) => {
    return axios.post(
        `${STOCKS}/sendFSAnswers`,
        {
            params: {
                user_id: userId,
                fs1, fs2, fs3, fs4, fs5, fs6, fs7, fs8, fs9, fs10, fs11, fs12
            }
        }
    );
};
