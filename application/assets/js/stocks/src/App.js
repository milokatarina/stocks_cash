import React, {useState} from 'react';
import * as CONST from './constants';
import {EndGame} from "./containers/EndGame";
import DSurvey from "./containers/DSurvey";
import * as api from './api';
import RSSurvey from "./containers/RSSurvey";
import Game from "./containers/Game";

export const App = ({yearsRevenue}) => {
    const initCashBalance = 1000;
    const initYearsRange = 10;

    const [playId, setPlayId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [screenNumber, setScreenNumber] = useState(1);
    const [lastRevenue, setLastRevenue] = useState(0);
    const [currentYearRevenue, setCurrentYearRevenue] = useState(yearsRevenue[initYearsRange]);
    const [currentDepositBalance, setCurrentDepositBalance] = useState(500);
    const [currentStocksBalance, setCurrentStocksBalance] = useState(500);
    const [stocksPercent, setStocksPercent] = useState(50);
    const [depositPercent, setDepositPercent] = useState(50);
    const [numberOfPeriodsPlayed, setNumberOfPeriodsPlayed] = useState(0);
    const [currentCashBalance, setCurrentCashBalance] = useState(initCashBalance);

    const invest = () => {
        const nextNumberOfYearsPlayed = numberOfPeriodsPlayed + 1;
        setNumberOfPeriodsPlayed(nextNumberOfYearsPlayed);
        setCurrentYearRevenue(yearsRevenue[initYearsRange + nextNumberOfYearsPlayed]);
        const lastRevenue = parseFloat((
            currentDepositBalance * currentYearRevenue.deposit_revenue / 100
            + currentStocksBalance * currentYearRevenue.stocks_revenue / 100).toFixed(4));
        setLastRevenue(
            lastRevenue
        );
        const initCashBalance = currentCashBalance;
        const calculatedCashBalance = parseFloat((currentCashBalance + lastRevenue).toFixed(4));
        setCurrentCashBalance(calculatedCashBalance);
        api.logInvestment({
            userId,
            playId,
            period: nextNumberOfYearsPlayed,
            depositPercent,
            stocksPercent,
            initCashBalance,
            totalCashBalance: calculatedCashBalance
        })
    }

    const handleStocksOnChange = (newValue) => {
        setStocksPercent(newValue);
        setCurrentStocksBalance(currentCashBalance * newValue / 100)
        setDepositPercent(100 - newValue);
        setCurrentDepositBalance(currentCashBalance * (100 - newValue) / 100)
    }
    const handleDepositOnChange = (newValue) => {
        setDepositPercent(newValue);
        setCurrentDepositBalance(currentCashBalance * newValue / 100)
        setStocksPercent(100 - newValue);
        setCurrentStocksBalance(currentCashBalance * (100 - newValue) / 100)
    }
    const pieChartData = [
        {title: CONST.STOCKS, value: stocksPercent, color: '#E38627'},
        {title: CONST.DEPOSIT, value: depositPercent, color: '#C13C37'}
    ];
    if (numberOfPeriodsPlayed === CONST.MAX_PERIODS) {
        return <EndGame/>
    }
    const onNextRSSurvey = ({rs11, rs12, rs13}) => {
        console.log(rs11, rs12, rs13);
        api.sendRSAnswers({
            userId, rs11, rs12, rs13
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }
    switch (screenNumber) {
        case 1:
            return <DSurvey onNextChange={(gender, age, studies) => {
                api.initGame({
                    studies, gender, age
                }).then((response) => {
                    setScreenNumber(screenNumber + 1);
                    setPlayId(response.data.data.playId);
                    setUserId(response.data.data.userId);
                })
            }}/>
        case 2:
            return <RSSurvey
                onNextChange={onNextRSSurvey}
            />
        default: {
            return <Game
                lastRevenue={lastRevenue}
                currentCashBalance={currentCashBalance}
                pieChartData={pieChartData}
                stocksPercent={stocksPercent}
                handleStocksOnChange={handleStocksOnChange}
                depositPercent={depositPercent}
                handleDepositOnChange={handleDepositOnChange}
                yearsRevenue={yearsRevenue}
                numberOfPeriodsPlayed={numberOfPeriodsPlayed}
                initYearsRange={initYearsRange}
                invest={invest}
            />
        }
    }
}
