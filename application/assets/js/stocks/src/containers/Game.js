import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Col, Row} from "react-styled-flexboxgrid";
import {PieChart} from "react-minimal-pie-chart";
import InputSlider from "../components/Slider";
import {Button} from "@material-ui/core";
import Graph from "../components/Graph";
import styled from "styled-components";
import * as api from "../api";
import * as CONST from "../constants";
import {EndGame} from "./EndGame";
import {Auto5RadioQuestion} from "../components/Auto5RadioQuestion";
import PeriodYieldsGraph from "../components/PeriodYieldsGraph";
import ConfidenceSurvey from "./ConfidenceSurvey";
import OptSurvey from "./OptSurvey";
import {calculateBalance, calculateNewBalance} from "../utils/calculations";

const Game = ({yearsRevenue, userId, playId, onScreenChange}) => {
    const initCashBalance = 1000;
    const initYearsRange = 21;
    const [lastRevenue, setLastRevenue] = useState(0);
    const [currentYearRevenue, setCurrentYearRevenue] = useState(yearsRevenue[initYearsRange]);
    const [currentDepositBalance, setCurrentDepositBalance] = useState(500);
    const [currentStocksBalance, setCurrentStocksBalance] = useState(500);
    const [stocksPercent, setStocksPercent] = useState(50);
    const [depositPercent, setDepositPercent] = useState(50);
    const [numberOfPeriodsPlayed, setNumberOfPeriodsPlayed] = useState(0);
    const [currentCashBalance, setCurrentCashBalance] = useState(initCashBalance);
    const [rp, setRp] = useState(null);
    const [isRiskPercVisible, setIsRiskPercVisible] = useState(false);
    const [periodYieldsData, setPeriodYieldsData] = useState([]);

    const [isConfidenceSurveyDone, setIsConfidenceSurveyDone] = useState(false);
    const [isOptSurveyDone, setIsOptSurveyDone] = useState(false);

    const invest = ({risk}) => {
        //provera da je risk izmedju 1 i 4
        const nextNumberOfYearsPlayed = numberOfPeriodsPlayed + 1;
        //provera da nextNumberOfYearsPlayed nije veci od 15
        setNumberOfPeriodsPlayed(nextNumberOfYearsPlayed);

        setCurrentYearRevenue(yearsRevenue[initYearsRange + nextNumberOfYearsPlayed]);
        const preparedBalanceData = calculateBalance(
            currentYearRevenue.deposit_revenue,
            currentYearRevenue.stocks_revenue,
            currentCashBalance
        );
        //provera da je preparedBalanceData broj i da je veci od 0
        const depositBalance = calculateNewBalance(currentCashBalance, currentYearRevenue.deposit_revenue);
        const stockBalance = calculateNewBalance(currentCashBalance, currentYearRevenue.stocks_revenue);
        setLastRevenue(
            preparedBalanceData.lastRevenue
        );
        const initCashBalance = currentCashBalance;
        const calculatedCashBalance = preparedBalanceData.calculatedCashBalance;
        setCurrentCashBalance(calculatedCashBalance);
        setDepositPercent(50);
        setStocksPercent(50);
        //pre:provera da je userId number i veci od 0, playId number i veci od 0
        //period veci od 0 i manji od 15
        //pre:risk - izmedju 1 i 5
        api.logInvestment({
            userId,
            playId,
            period: nextNumberOfYearsPlayed,
            depositPercent,
            stocksPercent,
            initCashBalance,
            totalCashBalance: calculatedCashBalance,
            rpLastPeriod: risk
        })
        updatePeriodYieldsData(nextNumberOfYearsPlayed, depositBalance, stockBalance, preparedBalanceData.lastRevenue);
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

    const handleStocksOnChange = (stocksPercent) => {
        setStocksPercent(stocksPercent);
        const depositPercent = 100 - stocksPercent;
        setCurrentStocksBalance(calculateNewBalance(currentCashBalance, stocksPercent));
        setDepositPercent(depositPercent);
        setCurrentDepositBalance(calculateNewBalance(currentCashBalance, depositPercent));
    }

    const handleDepositOnChange = (depositPercent) => {
        setDepositPercent(depositPercent);
        const stocksPercent = 100 - depositPercent;
        setCurrentDepositBalance(calculateNewBalance(currentCashBalance, depositPercent));
        setStocksPercent(stocksPercent);
        setCurrentStocksBalance(calculateNewBalance(currentCashBalance, stocksPercent));
    }
    const pieChartData = [
        {title: CONST.STOCKS, value: stocksPercent, color: '#E38627'},
        {title: CONST.DEPOSIT, value: depositPercent, color: '#C13C37'}
    ];
    if (isRiskPercVisible) {
        return (
            <StyledContainer>
                <div className="mainHeader" style={{
                    borderTop: 'none',
                    borderBottom: 'white',
                    border: '1px solid',
                    borderLeft: 'none',
                    borderRight: 'none'
                }}>
                    IGRA INVESTICIJA ({currentYearRevenue.year}.GODINA)
                </div>
                <Auto5RadioQuestion
                    question="Koliko rizicnim percipirate vase prethodno ulaganje"
                    value={null}
                    handleInputChange={(value) => {
                        setRp(value);
                        setIsRiskPercVisible(false)
                        invest({risk: value});
                    }}
                />
            </StyledContainer>
        )
    }

    if (numberOfPeriodsPlayed === CONST.MAX_PERIODS) {
        return <EndGame title="Kraj igre. Kliknite dalje da predjete na upitnike." onNextClick={onScreenChange}
                        hasNextButton={true}
                        gain={currentCashBalance}/>
    }
    if (numberOfPeriodsPlayed === 11 && !isConfidenceSurveyDone && !isRiskPercVisible) {
        return <ConfidenceSurvey onNextChange={({cs1, cs2, cs3, cs4, cs5}) => {
            api.sendConfidenceAnswers({
                userId, cs1, cs2, cs3, cs4, cs5
            })
            setIsConfidenceSurveyDone(true);
        }}/>
    }

    if (numberOfPeriodsPlayed === 11 && isConfidenceSurveyDone && !isOptSurveyDone && !isRiskPercVisible) {
        return <OptSurvey onNextChange={({os1, os2, os3, os4, os5}) => {
            api.sentOptAnswers({userId, os1, os2, os3, os4, os5})
            setIsOptSurveyDone(true);
        }}/>
    }

    return (
        <StyledContainer>
            <div className="mainHeader" style={{
                borderTop: 'none',
                borderBottom: 'white',
                border: '1px solid',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
                IGRA INVESTICIJA ({currentYearRevenue.year}.GODINA)
            </div>
            <div>
                <div className="mainHeader" style={{height: '100px'}}>
                    <div>
                        Poslednji prihod: {lastRevenue}
                    </div>
                    <div>
                        Bilans: {currentCashBalance}
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
                                style={{position: 'absolute', bottom: '50%'}}
                            >
                                INVESTIRAJ!
                            </Button>
                        </Col>
                    </Row>
                </Grid>
                <Grid>
                    <Row style={{marginLeft: '0px', marginRight: '0px', height: '600px'}}>
                        <Col xs={8} style={{border: '1px solid #ccc', borderTop: 'none', padding: '15px'}}>
                            <div style={{marginLeft: '15px'}}>
                                <Graph
                                    yearsRevenue={yearsRevenue.slice(0, numberOfPeriodsPlayed + initYearsRange)}
                                    isTrial={false}
                                    currentYearRevenue={currentYearRevenue}
                                />
                            </div>
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
export default Game;