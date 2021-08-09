import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
// import { timeDay } from "d3";

import {Chart} from "react-charts";

import "../styles.css";
import moment from "moment";
import {Button} from "@material-ui/core";

export default function Graph({yearsRevenue, isTrial}) {
    console.log({yearsRevenue})
    const prepareChartData = () => {
        return yearsRevenue.map((item) => {
            return {
                'x': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0).date(1),
                'y': item.stocks_revenue
            }
        })
    }
    const series = React.useMemo(
        () => ({
            type: 'line',
            showPoints: true
        }),
        ['line']
    )
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
    const [graphState, setGraphState] = useState('stocks');
    const [graphData, setGraphData] = useState(prepareChartData())
    const [zeroData, setZeroData] = useState(prepareLastZeroData());
    useEffect(() => {
        setGraphData(prepareChartData());
    }, [yearsRevenue])

    const axes = React.useMemo(
        () => [
            {
                primary: true,
                type: "time",
                position: "bottom",
                // filterTicks: (ticks) =>
                //   ticks.filter((date) => +timeDay.floor(date) === +date),
            },
            {type: "linear", position: "left"},
        ],
        []
    );
    const getSeriesStyle = React.useCallback(
        series => ({
            color: series.index === 0 ? '#0275d8' : '#000'
        }),
        []
    )
    const renderRisks = () => {
        return (
            <div>
                <div>
                    <b>Očekivana stopa prinosa</b> pokazuje koliko je iznosio prosečan prinos na akcije u prethodnom
                    periodu.
                </div>
                <div>
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
                'x': moment().year(item.year).month(0).date(1),
                'y': item.deposit_revenue
            }
        })
        setGraphData(newData);
        setZeroData([]);
    }


    return (
        <div style={{width: '100%', height: '400px', position: 'relative'}}>
            <div style={{marginBottom: '15px'}}>
                <Button
                    style={{marginRight: '15px'}}
                    variant="contained" onClick={() => {
                }}>
                    CENE AKCIJA
                </Button>
                <Button
                    variant="contained"
                    onClick={() => regenerateStocksData()}
                    style={{marginRight: '15px'}}>
                    PRINOS I RIZIK ULAGANJA U AKCIJE
                </Button>
                <Button variant="contained" onClick={() => regenerateDepositData()}>
                    PRINOS NA DEPOZITE
                </Button>
            </div>
            <div
                style={{
                    height: '300px'
                }}
            >
                <Chart data={[{label:'akcije', data: graphData}, {label:'referentna', data: zeroData}]} series={series} axes={axes} getSeriesStyle={getSeriesStyle}/>
            </div>
            {graphState === 'stocks' && (
                renderRisks()
            )}
        </div>
    );
}