import { curveCatmullRom } from '@visx/curve';
import styles from "../../styles/Chart.module.css";
import { LinePath } from '@visx/shape';

export const MiniMarks = ({
    data,
    xScale,
    yScale,
    xValue,
    yValue,
}) => {

    return (
        <g className={styles.marks}>
            <LinePath
                data={data}
                curve={curveCatmullRom}
                x={d => xScale(xValue(d))}
                y={d => yScale(yValue(d))}
            />
        </g>
    )
};
