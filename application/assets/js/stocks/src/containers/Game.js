import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Col, Row} from "react-styled-flexboxgrid";
import {PieChart} from "react-minimal-pie-chart";
import InputSlider from "../components/Slider";
import {Button} from "@material-ui/core";
import Graph from "../components/Graph";
import styled from "styled-components";

const Game = ({
                  lastRevenue, currentCashBalance, pieChartData,
                  stocksPercent, handleStocksOnChange, depositPercent, handleDepositOnChange,
                  yearsRevenue, numberOfPeriodsPlayed, initYearsRange, invest
              }) => {
    return (
        <StyledContainer>
            <div className="mainHeader" style={{
                borderTop: 'none',
                borderBottom: 'white',
                border: '1px solid',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
                THE INVESTMENT GAME
            </div>
            <div className="mainHeader" style={{height: '100px'}}>
                <div>
                    Revenue: {lastRevenue}
                </div>
                <div>
                    Total cash balance: {currentCashBalance}
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
                                     name='STOCKS'
                                     handleOnChange={handleStocksOnChange}/>
                        <InputSlider initCashBalance={currentCashBalance} initValue={depositPercent}
                                     name='DEPOSIT'
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
                    <Col xs={12} style={{border: '1px solid #ccc', borderTop: 'none', padding: '15px'}}>
                        <Graph yearsRevenue={yearsRevenue.slice(0, numberOfPeriodsPlayed + initYearsRange)}/>
                    </Col>
                </Row>
            </Grid>
        </StyledContainer>
    )
}
const StyledContainer = styled.div`
  padding: 50px;
`;
export default Game;