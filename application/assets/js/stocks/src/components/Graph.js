import React, {useState} from "react";
import styled from 'styled-components';
import {Chart} from "react-charts";

import "../styles.css";
import moment from "moment";
import {Button} from "@material-ui/core";


export default function Graph({yearsRevenue, isTrial}) {
    const prepareStocksData = () => {
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0).date(1),
                'y': item.stocks_revenue
            }
        })
    }
    const prepareLastZeroData = () => {
        const lastItem = yearsRevenue[yearsRevenue.length - 1];
        const firstItem = yearsRevenue[0];
        return [
            {
                'x': moment().year(isTrial ? (parseInt(firstItem.year) + 3) : firstItem.year).month(0).date(1),
                y: 0
            },
            {
                'x': moment().year(isTrial ? (parseInt(lastItem.year) + 3) : lastItem.year).month(0).date(1),
                'y': 0
            }
        ]
    }
    const prepareStockPriceData = () => {
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(item.year).month(0),
                'y': item.stock_price
            }
        })
    }
    const prepareFloatingAvgPrice = () => {
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(item.year).month(0),
                'y': item.floating_avg_stock_price
            }
        })
    }

    const regenerateStocksPrice = () => {
        setGraphState('stocks_price');
        if (isFloatingAvgActive) {
            setChartData([{label: '', data: prepareStockPriceData()}, {label: '', data: prepareFloatingAvgPrice()}])
        } else {
            setChartData([{label: '', data: prepareStockPriceData()}]);
        }
    }
    const [graphState, setGraphState] = useState('stocks_price');
    const [graphData, setGraphData] = useState(prepareStockPriceData())
    const [zeroData, setZeroData] = useState([]);
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
        return (
            <div style={{marginTop: '30px'}}>
                <div style={{margin: '20px 0'}}>
                    <b>Očekivana stopa prinosa</b> pokazuje koliko je iznosio prosečan prinos na akcije u prethodnom
                    periodu.
                </div>
                <div style={{margin: '20px 0'}}>
                    <b>Standardna devijacija</b> pokazuje prosečno odstupanje stvarnih prinosa od očekivanih.
                </div>
            </div>
        )
    }

    const regenerateStocksData = () => {
        setGraphState('stocks');
        setChartData([{label: '', data: prepareStocksData()}, {label: '', data: prepareLastZeroData()}])
    }

    const regenerateDepositData = () => {
        setGraphState('deposit');
        const newData = yearsRevenue.map((item) => {
            return {
                'x': moment().year(item.year).month(0),
                'y': item.deposit_revenue
            }
        })
        setChartData([{label: '', data: newData}])
    }


    return (
        <div style={{width: '100%', height: '400px', position: 'relative'}}>
            <div style={{marginBottom: '15px'}}>
                <StyledButton
                    style={{marginRight: '15px'}}
                    variant="contained"
                    className={graphState === 'stocks_price' ? 'active' : ''}
                    onClick={() => regenerateStocksPrice()}
                >
                    CENE AKCIJA
                </StyledButton>
                <StyledButton
                    variant="contained"
                    className={graphState === 'stocks' ? 'active' : ''}
                    onClick={() => regenerateStocksData()}
                    style={{marginRight: '15px'}}
                >
                    PRINOS I RIZIK ULAGANJA U AKCIJE
                </StyledButton>
                <StyledButton
                    className={graphState === 'deposit' ? 'active' : ''}
                    variant="contained" onClick={() => regenerateDepositData()}>
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