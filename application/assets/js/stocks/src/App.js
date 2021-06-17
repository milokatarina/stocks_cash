import React, {useState} from 'react';
import styled from 'styled-components';
import Graph from "./components/Graph";
import {Col, Row} from "react-styled-flexboxgrid";
import InputSlider from "./components/Slider";
import {PieChart} from 'react-minimal-pie-chart';
import {Button} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

export const App = ({yearsRevenue}) => {
    const initCashBalance = 1000;
    const [currentYearRevenue, setCurrentYearRevenue] = useState(yearsRevenue[10]);
    const [currentDepositBalance, setCurrentDepositBalance] = useState(500);
    const [currentStocksBalance, setCurrentStocksBalance] = useState(500);
    const [stocksPercent, setStocksPercent] = useState(50);
    const [depositPercent, setDepositPercent] = useState(50);
    const [investmentPeriods, setInvestmentPeriod] = useState([]);
    const [numberOfPeriodsPlayed, setNumberOfPeriodsPlayed] = useState(0);

    const invest = () => {
        setNumberOfPeriodsPlayed(numberOfPeriodsPlayed + 1);
    }
    const handleStocksOnChange = (newValue) => {
        setStocksPercent(newValue);
        setCurrentStocksBalance(initCashBalance * newValue / 100)
        setDepositPercent(100 - newValue);
        setCurrentDepositBalance(initCashBalance * (100 - newValue) / 100)
    }
    const handleDepositOnChange = (newValue) => {
        setDepositPercent(newValue);
        setCurrentDepositBalance(initCashBalance * newValue / 100)
        setStocksPercent(100 - newValue);
        setCurrentStocksBalance(initCashBalance * (100 - newValue) / 100)
    }
    const pieChartData = [
        {title: 'Stocks', value: stocksPercent, color: '#E38627'},
        {title: 'Deposit', value: depositPercent, color: '#C13C37'}
    ];
    return (
        <StyledContainer>
            <div className="mainHeader">
                THE INVESTMENT GAME
            </div>
            <Grid>
                <Row style={{marginLeft: '0px', marginRight: '0px'}}>
                    <Col xs={12} sm={6} style={{border: '1px solid #ccc', padding: '15px', height:'300px'}}>
                        <div>
                            <PieChart
                                data={pieChartData}
                                label={({dataEntry}) => dataEntry.value + " % " + dataEntry.title}
                                labelStyle={(index) => ({
                                    fill: '#ffff',
                                    fontSize: '5px',
                                    fontFamily: 'sans-serif',
                                })}
                                radius={42}
                            />
                        </div>
                    </Col>
                    <Col xs={12} sm={6}
                         style={{border: '1px solid #ccc', borderLeft: 'none', padding: '15px', position: 'relative'}}>
                        <InputSlider initCashBalance={initCashBalance} initValue={stocksPercent} name='STOCKS'
                                     handleOnChange={handleStocksOnChange}/>
                        <InputSlider initCashBalance={initCashBalance} initValue={depositPercent} name='DEPOSIT'
                                     handleOnChange={handleDepositOnChange}/>
                        <Button
                            variant="contained"
                            onClick={invest}
                            color="primary"
                            style={{position: 'absolute', bottom: '15px'}}
                        >
                            Invest!
                        </Button>
                    </Col>
                </Row>
            </Grid>
            <Grid>
                <Row style={{marginLeft: '0px', marginRight: '0px'}}>
                    <Col xs={12} sm={6} style={{border: '1px solid #ccc', borderTop: 'none', padding: '15px'}}>
                        <Graph yearsRevenue={yearsRevenue.slice(numberOfPeriodsPlayed, numberOfPeriodsPlayed + 11)}/>
                    </Col>
                </Row>
            </Grid>
        </StyledContainer>
    )
}


const StyledContainer = styled.div`
  padding: 50px;
`;