import React, { useState } from "react";
import styles from "../../../../styles/Device.module.css";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { DeviceModal } from "./Modals/DeviceModal";
import { DeviceEditModeModal } from "./Modals/DeviceEditModeModal";

export const Device = React.memo(({ thing }) => {

    // Состояние модального окна
    const [isDeviceModal, setDeviceModal] = useState(false);

    // Состояние редактирование окна
    const [editMode, setEditMode] = useState(false);

    return (
        <div className={styles.device}>
            <div className={styles.deviceInfo}>

                <button className={styles.openInModal} onClick={() => setDeviceModal(true)}>
                    <OpenInNewIcon />
                </button>

                <div className={styles.name}>
                    {thing.entity.name}
                </div><hr />

                <div className={styles.state}>
                    <div>{thing.entity.state}</div>
                </div>

                {
                    !editMode
                        ?
                        <DeviceModal
                            isModal={isDeviceModal}
                            setModal={setDeviceModal}
                            thing={thing}
                            setEditMode={setEditMode} />
                        :
                        <DeviceEditModeModal
                            isModal={isDeviceModal}
                            setModal={setDeviceModal}
                            thing={thing}
                            setEditMode={setEditMode}
                        />
                }
            </div>
        </div>
    );
});

