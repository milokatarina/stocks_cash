import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
// import { timeDay } from "d3";

import {Chart} from "react-charts";

import "../styles.css";
import moment from "moment";
import {Button} from "@material-ui/core";

export default function Graph({yearsRevenue, isTrial}) {
    console.log({yearsRevenue})
    const prepareStockAxes = () => {
        return yearsRevenue.map((item) => {
            return {
                'primary': moment().year(isTrial ? (parseInt(item.year) + 3) : item.year).month(0).date(1),
                'secondary': item.stocks_revenue
            }
        })
    }
    const [graphState, setGraphState] = useState('stocks');
    const [graphData, setGraphData] = useState(prepareStockAxes())
    useEffect(() => {
        setGraphData(prepareStockAxes());
    }, [yearsRevenue])
    const series = React.useMemo(
        () => ({
            showPoints: true,
        }),
        []
    );

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

    const regenerateStocksData = () => {
        setGraphState('stocks');
        const newData = prepareStockAxes();
        setGraphData(newData);
    }
    const regenerateDepositData = () => {
        setGraphState('deposit');
        const newData = yearsRevenue.map((item) => {
            return {
                'primary': moment().year(item.year).month(0).date(1),
                'secondary': item.deposit_revenue
            }
        })
        setGraphData(newData);
    }


    return (
        <div style={{width: '100%', height: '300px', position: 'relative'}}>
            <div style={{marginBottom: '15px'}}>
                <Button
                    variant="contained"
                    onClick={() => regenerateStocksData()}
                    style={{marginRight: '15px'}}>
                    AKCIJE
                </Button>
                <Button variant="contained" color="primary" onClick={() => regenerateDepositData()}>DEPOZIT</Button>
            </div>
            <Chart data={[graphData]} series={10} axes={axes}/>
        </div>
    );
}