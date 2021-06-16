import React, {useState} from "react";
import ReactDOM from "react-dom";
// import { timeDay } from "d3";

import {Chart} from "react-charts";

import "../styles.css";
import ResizableBox from "./ResizableBox";
import moment from "moment";
import {Button} from "@material-ui/core";

export default function Graph({yearsRevenue}) {
    const [graphState, setGraphState] = useState('stocks');
    const [graphData, setGraphData] = useState(yearsRevenue.map((item) => {
        return {
            'primary': moment().year(item.year).month(1).date(1),
            'secondary': item.stocks_revenue
        }
    }))
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
        const newData = yearsRevenue.map((item) => {
            return {
                'primary': moment().year(item.year).month(1).date(1),
                'secondary': item.stocks_revenue
            }
        })
        setGraphData(newData);
    }
    const regenerateDepositData = () => {
        setGraphState('deposit');
        const newData = yearsRevenue.map((item) => {
            return {
                'primary': moment().year(item.year).month(1).date(1),
                'secondary': item.deposit_revenue
            }
        })
        setGraphData(newData);
    }


    return (
        <ResizableBox>
            <Button onClick={() => regenerateStocksData()}>Stocks</Button>
            <Button onClick={() => regenerateDepositData()}>Deposit</Button>
            <Chart data={[graphData]} series={series} axes={axes} tooltip/>
        </ResizableBox>
    );
}