import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {Chart} from "react-charts";

import "../styles.css";
import moment from "moment";
import {Button} from "@material-ui/core";
import {useChartConfig} from "../utils/charts";

export default function Graph({yearsRevenue, isTrial}) {
    const prepareChartData = () => {
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
    const regenerateStocksPrice = () => {
        setGraphState('stocks_price');
        const newData = prepareStockPriceData();
        setGraphData(newData);
        setZeroData([]);
    }
    const [graphState, setGraphState] = useState('stocks_price');
    const [graphData, setGraphData] = useState(prepareStockPriceData())
    const [zeroData, setZeroData] = useState(prepareLastZeroData());
    useEffect(() => {
        setGraphData(prepareStockPriceData());
    }, [yearsRevenue])

    const series = React.useMemo(
        () => ({
            showPoints: true
        }),
        []
    )
    const {
        primaryAxisShow,
        secondaryAxisShow
    } = useChartConfig({
        series: 2,
        show: ['primaryAxisShow', 'secondaryAxisShow']
    })
    const axes = React.useMemo(
        () => [
            {
                primary: true,
                position: 'bottom',
                type: 'time',
                show: primaryAxisShow
            },
            {position: 'left', type: 'linear', show: secondaryAxisShow}
        ],
        [primaryAxisShow, secondaryAxisShow]
    )
    const getSeriesStyle = React.useCallback(
        series => ({
            color: series.index === 0 ? '#0275d8' : '#777'
        }),
        []
    )
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
        const newData = prepareChartData();
        setGraphData(newData);
        setZeroData(prepareLastZeroData);
    }

    const regenerateDepositData = () => {
        setGraphState('deposit');
        const newData = yearsRevenue.map((item) => {
            return {
                'x': moment().year(item.year).month(0),
                'y': item.deposit_revenue
            }
        })
        setGraphData(newData);
        setZeroData([]);
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
                <Chart data={[{label: 'akcije', data: graphData}, {label: 'referentna', data: zeroData}]}
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