import React, {useState} from 'react';
import styled from 'styled-components';
import Graph from "./components/Graph";
import {Col, Row} from "react-styled-flexboxgrid";
import InputSlider from "./components/Slider";
import {PieChart} from 'react-minimal-pie-chart';

export const App = ({yearsRevenue}) => {
    const initCashBalance = 1000;
    const [stocksPercent, setStocksPercent] = useState(50);
    const [depositPercent, setDepositPercent] = useState(50);

    const handleStocksOnChange = (newValue) => {
        setStocksPercent(newValue);
        setDepositPercent(100 - newValue);
    }
    const handleDepositOnChange = (newValue) => {
        setStocksPercent(100 - newValue);
        setDepositPercent(newValue);
    }
    const pieChartData = [
        {title: 'Stocks', value: stocksPercent, color: '#E38627'},
        {title: 'Deposit', value: depositPercent, color: '#C13C37'}
    ];
    return (
        <StyledContainer>
            <Row>
                <Col>
                    <PieChart
                        data={pieChartData}
                        label={({dataEntry}) => dataEntry.value + " % " + dataEntry.title}
                        labelStyle={(index) => ({
                            fill: pieChartData[index].color,
                            fontSize: '5px',
                            fontFamily: 'sans-serif',
                        })}
                        radius={42}
                        labelPosition={112}
                    />
                </Col>
                <Col>
                    <InputSlider initCashBalance={initCashBalance} initValue={stocksPercent} name='Stocks'
                                 handleOnChange={handleStocksOnChange}/>
                    <InputSlider initCashBalance={initCashBalance} initValue={depositPercent} name='Deposit'
                                 handleOnChange={handleDepositOnChange}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Graph yearsRevenue={yearsRevenue}/>
                </Col>
            </Row>
        </StyledContainer>
    )
}


const StyledContainer = styled.div`
  padding: 50px;
`;