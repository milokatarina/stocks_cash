import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Col, Row} from "react-styled-flexboxgrid";
import {PieChart} from "react-minimal-pie-chart";
import InputSlider from "../components/Slider";
import {Button} from "@material-ui/core";
import Graph from "../components/Graph";
import styled from "styled-components";
import * as CONST from "../constants";
import {EndGame} from "./EndGame";
import PeriodYieldsGraph from "../components/PeriodYieldsGraph";
import {RiskPerception} from "../components/RiskPerception";
import * as api from "../api";

const TrialGame = ({yearsRevenue, onScreenChange}) => {
    const initCashBalance = 1000;
    const initYearsRange = 18;
    const [lastRevenue, setLastRevenue] = useState(0);
    const [currentYearRevenue, setCurrentYearRevenue] = useState(yearsRevenue[initYearsRange]);
    const [currentDepositBalance, setCurrentDepositBalance] = useState(500);
    const [currentStocksBalance, setCurrentStocksBalance] = useState(500);
    const [stocksPercent, setStocksPercent] = useState(50);
    const [depositPercent, setDepositPercent] = useState(50);
    const [numberOfPeriodsPlayedTrial, setNumberOfPeriodsPlayedTrial] = useState(0);
    const [currentCashBalance, setCurrentCashBalance] = useState(initCashBalance);
    const [rp, setRp] = useState(null);
    const [isRiskPercVisible, setIsRiskPercVisible] = useState(false);
    const [periodYieldsData, setPeriodYieldsData] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const invest = () => {
        const depositBalance = currentDepositBalance * currentYearRevenue.deposit_revenue / 100;
        const stockBalance = currentStocksBalance * currentYearRevenue.stocks_revenue / 100;

        const lastRevenue = parseFloat((
            depositBalance
            + stockBalance).toFixed(2));
        setLastRevenue(
            lastRevenue
        );

        const calculatedCashBalance = parseFloat((currentCashBalance + lastRevenue).toFixed(2));
        setCurrentCashBalance(calculatedCashBalance);
        updatePeriodYieldsData(numberOfPeriodsPlayedTrial + 1, depositBalance, stockBalance, lastRevenue);
        setDepositPercent(50);
        setStocksPercent(50);
        setCurrentDepositBalance(calculatedCashBalance / 2);
        setCurrentStocksBalance(calculatedCashBalance / 2);
        const nextNumberOfYearsPlayed = numberOfPeriodsPlayedTrial + 1;

        setNumberOfPeriodsPlayedTrial(nextNumberOfYearsPlayed);

        if (nextNumberOfYearsPlayed < CONST.MAX_PERIODS) {
            setCurrentYearRevenue(yearsRevenue[initYearsRange + nextNumberOfYearsPlayed]);
        }
        if (nextNumberOfYearsPlayed === CONST.MAX_PERIODS) {
            setCurrentYearRevenue(yearsRevenue[initYearsRange + nextNumberOfYearsPlayed -1]);
        }
    }
    const updatePeriodYieldsData = (
        nextNumberOfYearsPlayed, depositBalance, stockBalance, lastRevenue
    ) => {
        let oldPeriodYieldData = periodYieldsData;
        oldPeriodYieldData.push({
            'period': nextNumberOfYearsPlayed,
            'stock_yields': parseFloat(stockBalance.toFixed(2)),
            'deposit_yields': parseFloat(depositBalance.toFixed(2)),
            'cash_balance': parseFloat(lastRevenue.toFixed(2))
        })
        setPeriodYieldsData(oldPeriodYieldData);
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
    if (numberOfPeriodsPlayedTrial === CONST.MAX_PERIODS_TRIAL) {
        return <EndGame gain={currentCashBalance} title="Probni period je gotov. Klikni 'Dalje' da bi počeo igru."
                        onNextClick={onScreenChange} hasNextButton/>
    }
    if (isRiskPercVisible) {
        return (
            <RiskPerception
                currentYear={parseInt(currentYearRevenue.year) + 3}
                setIsRiskPercVisible={setIsRiskPercVisible}
                setRp={setRp}
                invest={invest}
                onBack={() => {
                    setIsRiskPercVisible(false)
                }}
                text={"EKSPERIMENTALNO ULAGANJE - PROBNI PERIOD"}
            />
        )
    }
    return (
        <StyledContainer>
            <div className="mainHeader" style={{borderBottom: '1px solid'}}>
                EKSPERIMENTALNO ULAGANJE - PROBNI PERIOD ({parseInt(currentYearRevenue.year) + 3}.GODINA)
            </div>
            <div>
                <div className="mainHeader" style={{height: '100px'}}>
                    <div>
                        Prinos u prethodnom periodu: {lastRevenue}
                    </div>
                    <div>
                        Ukupan iznos: {currentCashBalance}
                    </div>
                </div>
                <Grid>
                    <Row style={{marginLeft: '0px', marginRight: '0px'}}>
                        <Col xs={6} style={{border: '1px solid #ccc', padding: '15px', height: '400px'}}>
                            <div>
                                <PieChart
                                    data={pieChartData}
                                    label={({dataEntry}) => dataEntry.value + " % " + dataEntry.title}
                                    labelStyle={() => ({
                                        fill: '#ffff',
                                        fontSize: '5px'
                                    })}
                                    segmentsShift={(index) => (index === 0 ? 2 : 0.5)}
                                    radius={42}
                                    startAngle={90}
                                />
                            </div>
                        </Col>
                        <Col xs={6}
                             style={{
                                 border: '1px solid #ccc',
                                 borderLeft: 'none',
                                 padding: '15px',
                                 position: 'relative'
                             }}>
                            <InputSlider initCashBalance={currentCashBalance} initValue={stocksPercent}
                                         name='AKCIJE'
                                         handleOnChange={handleStocksOnChange}/>
                            <InputSlider initCashBalance={currentCashBalance} initValue={depositPercent}
                                         name='DEPOZIT'
                                         handleOnChange={handleDepositOnChange}/>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setIsRiskPercVisible(true)
                                }}
                                color="primary"
                                style={{position: 'absolute', bottom: '15px'}}
                            >
                                INVESTIRAJ!
                            </Button>
                        </Col>
                    </Row>
                </Grid>
                <Grid>
                    <Row style={{marginLeft: '0px', marginRight: '0px', height: '500px'}}>
                        <Col xs={8} style={{border: '1px solid #ccc', borderTop: 'none', padding: '15px'}}>
                            <Graph yearsRevenue={yearsRevenue.slice(0, numberOfPeriodsPlayedTrial + initYearsRange)}
                                   isTrial
                                   currentYearRevenue={currentYearRevenue}
                            />
                        </Col>
                        <Col xs={4} style={{
                            border: '1px solid #ccc',
                            borderLeft: 'none',
                            borderTop: 'none',
                            padding: '15px'
                        }}>
                            <PeriodYieldsGraph data={periodYieldsData}/>
                        </Col>
                    </Row>
                </Grid>
            </div>
        </StyledContainer>
    )
}
const StyledContainer = styled.div`
  padding: 50px;
`;
export default TrialGame;