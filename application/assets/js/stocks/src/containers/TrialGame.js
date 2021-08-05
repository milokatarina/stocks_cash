import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {Col, Row} from "react-styled-flexboxgrid";
import {PieChart} from "react-minimal-pie-chart";
import InputSlider from "../components/Slider";
import {Button} from "@material-ui/core";
import Graph from "../components/Graph";
import styled from "styled-components";
import * as CONST from "../constants";
import {EndGame} from "./EndGame";

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
    console.log({currentYearRevenue});
    const invest = () => {
        const nextNumberOfYearsPlayed = numberOfPeriodsPlayedTrial + 1;
        setNumberOfPeriodsPlayedTrial(nextNumberOfYearsPlayed);
        setCurrentYearRevenue(yearsRevenue[initYearsRange + nextNumberOfYearsPlayed]);
        const lastRevenue = parseFloat((
            currentDepositBalance * currentYearRevenue.deposit_revenue / 100
            + currentStocksBalance * currentYearRevenue.stocks_revenue / 100).toFixed(2));
        setLastRevenue(
            lastRevenue
        );
        const calculatedCashBalance = parseFloat((currentCashBalance + lastRevenue).toFixed(2));
        console.log(calculatedCashBalance);
        setCurrentCashBalance(calculatedCashBalance);
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
                        onNextClick={onScreenChange}/>
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
                IGRA INVESTICIJA - PROBNI PERIOD
            </div>
            <div className="mainHeader" style={{height: '100px'}}>
                <div>
                    Poslednji prihod: {lastRevenue}
                </div>
                <div>
                    Keš balans: {currentCashBalance}
                </div>
            </div>
            <Grid>
                <Row style={{marginLeft: '0px', marginRight: '0px'}}>
                    <Col xs={12} sm={6} style={{border: '1px solid #ccc', padding: '15px', height: '300px'}}>
                        <div>
                            <PieChart
                                data={pieChartData}
                                label={({dataEntry}) => dataEntry.value + " % " + dataEntry.title}
                                labelStyle={() => ({
                                    fill: '#ffff',
                                    fontSize: '5px'
                                })}
                                radius={42}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6}
                         style={{
                             border: '1px solid #ccc',
                             borderLeft: 'none',
                             padding: '15px',
                             position: 'relative'
                         }}>
                        <InputSlider initCashBalance={currentCashBalance} initValue={stocksPercent}
                                     name='Akcije'
                                     handleOnChange={handleStocksOnChange}/>
                        <InputSlider initCashBalance={currentCashBalance} initValue={depositPercent}
                                     name='Depozit'
                                     handleOnChange={handleDepositOnChange}/>
                        <Button
                            variant="contained"
                            onClick={invest}
                            color="primary"
                            style={{position: 'absolute', bottom: '15px'}}
                        >
                            INVESTIRAJ!
                        </Button>
                    </Col>
                </Row>
            </Grid>
            <Grid>
                <Row style={{marginLeft: '0px', marginRight: '0px'}}>
                    <Col xs={12} style={{border: '1px solid #ccc', borderTop: 'none', padding: '15px'}}>
                        <Graph yearsRevenue={yearsRevenue.slice(0, numberOfPeriodsPlayedTrial + initYearsRange)}
                               isTrial/>
                    </Col>
                </Row>
            </Grid>
        </StyledContainer>
    )
}
const StyledContainer = styled.div`
  padding: 50px;
`;
export default TrialGame;