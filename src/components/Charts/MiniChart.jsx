import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeFormat } from "d3-time-format";
import { Marks } from './Marks';
import styles from "../../styles/Chart.module.css";
import { extent } from 'd3-array';
import { useData } from "./useData";

const width = 210;
const height = 80;
const margin = { top: 5, right: 5, bottom: 5, left: 5 };

export const MiniChart = ({ data }) => {

    if (data.length == 0) {
        return <p>Not active</p>;
    }

    const xAxisTickFormat = timeFormat('%h');

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xValue = d => d.time;
    const yValue = d => d.value;

    const xScale = scaleTime({
        domain: extent(data, xValue),
        range: [0, innerWidth],
        nice: true,
    });

    const yScale = scaleLinear({
        domain: extent(data, yValue),
        range: [innerHeight, 0],
        nice: true,
    });

    return (
        <div className={styles.chart}>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    <Marks
                        margin={margin}
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        xValue={xValue}
                        yValue={yValue}
                        tooltipFormat={xAxisTickFormat}
                    />
                </g>
            </svg >
        </div>
    )
}
