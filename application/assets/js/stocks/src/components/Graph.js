import React, {useState} from "react";
import styled from 'styled-components';
import {Chart} from "react-charts";
import moment from "moment";
import {Button} from "@material-ui/core";
import "../styles.css";
import {calculateExpectedMaxRate, calculateExpectedMinRate} from "../utils/calculations";

export default function Graph({yearsRevenue, isTrial, currentYearRevenue}) {
    const prepareStocksData = () => {
        pre: {
            Array.isArray(yearsRevenue);
            yearsRevenue.length > 0;
        }
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
                'y': parseFloat(item.stocks_revenue)
            }
        })
        post: {
            Array.isArray(it);
            it.length > 0;
        }
    }

    const prepareLastZeroData = () => {
        const lastItem = yearsRevenue[yearsRevenue.length - 1];
        assert: {
            lastItem !== null;
        }
        const firstItem = yearsRevenue[0];
        assert: {
            firstItem !== null;
        }
        return [
            {
                'x': moment().year(isTrial ? (parseInt(firstItem.year) + 3) : firstItem.year).month(0),
                'y': 0
            },
            {
                'x': moment().year(isTrial ? (parseInt(lastItem.year) + 3) : lastItem.year).month(0),
                'y': 0
            }
        ]
    }
    const prepareStockPriceData = () => {
        pre: {
            Array.isArray(yearsRevenue);
            yearsRevenue.length > 0;
        }
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
                'y': item.stock_price
            }
        })
        post: {
            Array.isArray(it);
            it.length > 0;
        }
    }
    const prepareFloatingAvgPrice = () => {
        pre: {
            Array.isArray(yearsRevenue);
            yearsRevenue.length > 0;
        }
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
                'y': item.floating_avg_stock_price
            }
        })
        post: {
            Array.isArray(it);
            it.length > 0;
        }
    }

    const regenerateStocksPrice = (newGraphState) => {
        pre: {
            typeof newGraphState === 'string';
            newGraphState === 'stocks_price';
        }
        setGraphState(newGraphState);
        if (isFloatingAvgActive) {
            setChartData([{label: '', data: prepareStockPriceData()}, {label: '', data: prepareFloatingAvgPrice()}])
        } else {
            setChartData([{label: '', data: prepareStockPriceData()}]);
        }
    }
    const [graphState, setGraphState] = useState('stocks_price');
    const [graphData, setGraphData] = useState(prepareStockPriceData())
    const [chartData, setChartData] = useState([{label: '', data: graphData}, {
        label: '',
        data: prepareFloatingAvgPrice()
    }]);

    const [isFloatingAvgActive, setIsFloatingAvgActive] = useState(true);

    const series = React.useMemo(
        () => ({
            showPoints: true
        }),
        []
    )

    const axes = React.useMemo(
        () => [
            {
                primary: true,
                position: 'bottom',
                type: 'time'
            },
            {position: 'left', type: 'linear'}
        ],
        []
    )
    const getSeriesStyle = React.useCallback(
        series => ({
            color: graphState === 'stocks' ? (series.index === 0 ? '#0275d8' : '#777') : (series.index === 0 ? 'red' : 'blue')
        }),
        [series.index, graphState]
    )
    const toggleFloatingAvgData = () => {
        if (isFloatingAvgActive) {
            setChartData([{label: '', data: prepareStockPriceData()}])
        } else {
            setChartData([{label: '', data: prepareStockPriceData()}, {label: '', data: prepareFloatingAvgPrice()}])
        }
        setIsFloatingAvgActive(!isFloatingAvgActive);
    }

    const renderRisks = () => {
        let expectedRateMin = calculateExpectedMinRate(
            currentYearRevenue.expected_rate_stocks_revenue,
            currentYearRevenue.standard_deviation
        );

        let expectedRateMax = calculateExpectedMaxRate(
            currentYearRevenue.expected_rate_stocks_revenue,
            currentYearRevenue.standard_deviation
        );
        pre:{
            currentYearRevenue !== null;
            expectedRateMax > 0;
        }
        return (
            <div style={{marginTop: '30px', marginBottom: '30px'}}>
                <div style={{margin: '20px 0'}}>
                    <b>Očekivana stopa prinosa</b> pokazuje koliko je iznosio prosečan prinos na akcije u prethodnom
                    periodu.Za {currentYearRevenue.year}. godinu
                    iznosi <b>{currentYearRevenue.expected_rate_stocks_revenue}%</b>.
                </div>
                <div style={{margin: '20px 0'}}>
                    <b>Standardna devijacija</b> pokazuje prosečno odstupanje stvarnih prinosa od očekivanih.
                    Za {currentYearRevenue.year}. godinu iznosi <b>{currentYearRevenue.standard_deviation}%</b>.
                </div>
                <div style={{margin: '20px 0'}}>
                    To znači da bi se stvarni prinosi mogli kretati u intervalu
                    od <b>{expectedRateMin}%</b> do <b>{expectedRateMax}%</b>.
                </div>
            </div>
        )
    }

    const regenerateStocksData = (newGraphState) => {
        pre: {
            typeof newGraphState === 'string';
            newGraphState === 'stocks';
        }
        setGraphState(newGraphState);
        setChartData([{label: '', data: prepareStocksData()}, {label: '', data: prepareLastZeroData()}])
    }

    const regenerateDepositData = (newGraphState) => {
        pre: {
            typeof newGraphState === 'string';
            newGraphState === 'deposit';
        }
        setGraphState(newGraphState);
        const newData = yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
                'y': item.deposit_revenue
            }
        })
        assert:{
            Array.isArray(newData);
            newData.length > 0
        }
        setChartData([{label: '', data: newData}])
    }

    return (
        <div style={{width: '100%', height: '400px', position: 'relative'}}>
            <div style={{marginBottom: '15px'}}>
                <StyledButton
                    style={{marginRight: '15px'}}
                    variant="contained"
                    className={graphState === 'stocks_price' ? 'active' : ''}
                    onClick={() => regenerateStocksPrice('stocks_price')}
                >
                    CENE AKCIJA
                </StyledButton>
                <StyledButton
                    variant="contained"
                    className={graphState === 'stocks' ? 'active' : ''}
                    onClick={() => regenerateStocksData('stocks')}
                    style={{marginRight: '15px'}}
                >
                    PRINOS I RIZIK ULAGANJA U AKCIJE
                </StyledButton>
                <StyledButton
                    className={graphState === 'deposit' ? 'active' : ''}
                    variant="contained" onClick={() => regenerateDepositData('deposit')}>
                    PRINOS NA DEPOZITE
                </StyledButton>
            </div>
            <div
                style={{
                    height: '300px'
                }}
            >
                {graphState === 'stocks_price' && (
                    <div style={{marginBottom: '15px'}}> Pokretni prosek <input
                        name="Pokretni prosek"
                        type="checkbox"
                        checked={isFloatingAvgActive}
                        onChange={toggleFloatingAvgData}/>
                    </div>)}

                <Chart data={chartData}
                       series={series}
                       axes={axes}
                       getSeriesStyle={getSeriesStyle}
                       secondaryCursor
                />
            </div>
            {graphState === 'stocks' && (
                renderRisks()
            )}
        </div>
    );
}

const StyledButton = styled(Button)`
  &.active {
    background-color: #686666;
    color: white;
  }
`