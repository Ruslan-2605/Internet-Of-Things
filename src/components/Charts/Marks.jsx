import { curveCatmullRom } from '@visx/curve';
import styles from "../../styles/Chart.module.css";
import { LinePath } from '@visx/shape';

export const Marks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
    tooltipFormat,
    circleRadius = 3
}) => {

    return (
        <g className={styles.marks}>
            <LinePath
                data={data}
                curve={curveCatmullRom}
                x={d => xScale(xValue(d))}
                y={d => yScale(yValue(d))}
            />
            {
                data.map((d, key) => (
                    <circle key={key} cx={xScale(xValue(d))} cy={yScale(yValue(d))} r={circleRadius}>
                        <title>{tooltipFormat(xValue(d))}</title>
                    </circle>
                ))
            }
        </g>
    )
};
