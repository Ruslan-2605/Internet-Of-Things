import ErrorIcon from '@material-ui/icons/Error';
import styles from "../../styles/DeviceForm.module.css";

export const getErrorDeviceForm = (errors) => {
    if (errors.state) {
        return <div className={styles.error}>
            <p>{errors.state.message}</p>
            <p><ErrorIcon /></p>
        </div>
    } else if (errors.name) {
        return <div className={styles.error}>
            <p>{errors.name.message}</p>
            <p><ErrorIcon /></p>
        </div>
    }
}