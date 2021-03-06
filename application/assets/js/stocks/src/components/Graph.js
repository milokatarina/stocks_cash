import React, {useState} from "react";
import styled from 'styled-components';
import {Chart} from "react-charts";

import "../styles.css";
import moment from "moment";
import {Button, IconButton, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export default function Graph({yearsRevenue, isTrial, currentYearRevenue}) {
    const prepareStocksData = () => {
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
                'y': parseFloat(item.stocks_revenue)
            }
        })
    }
    const prepareLastZeroData = () => {
        const lastItem = yearsRevenue[yearsRevenue.length - 1];
        const firstItem = yearsRevenue[0];
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
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
                'y': item.stock_price
            }
        })
    }
    const prepareFloatingAvgPrice = () => {
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
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
    const expectedRateMin = (parseFloat(currentYearRevenue.expected_rate_stocks_revenue)
        - parseFloat(currentYearRevenue.standard_deviation)).toFixed(2);
    const expectedRateMax = (parseFloat(currentYearRevenue.expected_rate_stocks_revenue)
        + parseFloat(currentYearRevenue.standard_deviation)).toFixed(2);
    const renderRisks = () => {
        return (
            <div style={{marginTop: '30px', marginBottom: '30px'}}>
                <div style={{margin: '20px 0'}}>
                    <Tooltip
                        placement="top"
                        arrow
                        title="O??ekivana stopa prinosa pokazuje koliko je iznosio prose??an prinos na akcije u  prethodnom periodu.">
                        <span className="custom-span-tooltip">
                            O??ekivana stopa prinosa
                        </span>
                    </Tooltip> <b>{currentYearRevenue.expected_rate_stocks_revenue}%</b>.
                </div>
                <div style={{margin: '20px 0'}}>
                    <Tooltip
                        placement="top"
                        arrow
                        title="Standardna devijacija pokazuje prose??no odstupanje stvarnih prinosa od o??ekivanih.">
                       <span className="custom-span-tooltip">
                            Standardna devijacija
                       </span>
                    </Tooltip> <b>{currentYearRevenue.standard_deviation}%</b>
                </div>
                <div style={{margin: '20px 0'}}>
                    Stvarni prinosi se kre??u u intervalu od <b>{expectedRateMin}%</b> do <b>{expectedRateMax}%</b>.
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
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0),
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