import React from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { timeFormat } from "d3-time-format";
import { useData } from './useData';
// import { AxisBottom } from './AxisBottom';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
// import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import styles from "../../styles/Chart.module.css";
import { extent } from 'd3-array';

const width = 960;
const height = 500;
const margin = { top: 20, right: 0, bottom: 90, left: 100 };

export const Chart = ({ containerRef }) => {

    const data = useData();
    if (!data) {
        return <pre>Loading...</pre>;
    }

    const xAxisTickFormat = timeFormat('%a');

    const arr = []
    const axisBottomTickValue = data.filter((d) => {
        if (!arr.includes(xAxisTickFormat(d.time))) {
            arr.push(xAxisTickFormat(d.time));
            return true
        }
    })

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

                    <GridRows scale={yScale} width={innerWidth} height={innerHeight} stroke="#e0e0e0" />
                    {/* <GridColumns scale={xScale} width={innerWidth} height={innerHeight} stroke="#e0e0e0" /> */}

                    <AxisBottom
                        top={innerHeight}
                        scale={xScale}
                        tickFormat={xAxisTickFormat}
                        tickValues={axisBottomTickValue.map(d => d.time)}
                        label="Time"
                        labelClassName={styles.axisLabel}
                        labelOffset={40}
                    />
                    <AxisLeft
                        scale={yScale}
                        label="Value"
                        labelClassName={styles.axisLabel}
                        labelOffset={50}
                    />
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
