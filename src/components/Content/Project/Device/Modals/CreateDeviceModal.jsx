import React, { useState } from "react";
import styles from "../../../../../styles/DeviceModalEditMode.module.css";
import CloseIcon from '@material-ui/icons/Close';
import { CreateDeviceForm } from '../Forms/CreateDeviceForm'

export const CreateDeviceModal = (props) => {

    const { isModal, setModal } = props;

    const [defaultState, setDefaultState] = useState("on")
    const [states, setStates] = useState(["on", "off"]);

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>

                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>

                <div className={styles.title}>
                    <Icons defaultState={defaultState} />
                </div>
                <div className={styles.content}>
                    <DeviceInfo
                        states={states}
                        setStates={setStates}
                        defaultState={defaultState}
                        setDefaultState={setDefaultState}
                    />
                </div>
            </div>
        </div>
    );
};

const Icons = ({ defaultState }) => {

    return (
        <div className={styles.icons}>
            <div></div>
            <div>
                <button className={styles.activeState}>{defaultState}</button>
            </div>
        </div>
    );
}

const DeviceInfo = ({ states, setStates, defaultState, setDefaultState }) => {

    return (
        <div className={styles.states}>
            {
                states.map((state) => {
                    return (
                        <State
                            key={state}
                            state={state}
                            states={states}
                            setStates={setStates}
                            length={states.length}
                            defaultState={defaultState}
                            setDefaultState={setDefaultState}
                        />
                    )
                })
            }
            <CreateDeviceForm states={states} setStates={setStates} defaultState={defaultState} />
        </div>
    )
}

const State = ({ state, states, setStates, length, defaultState, setDefaultState }) => {

    const deleteState = (state) => {
        const statesCopy = [...states]
        statesCopy.map((item, index) => {
            if (item === state) {
                statesCopy.splice(index, 1);
                setStates(statesCopy);
            }

        })
    }

    const getIcon = () => {
        if (length > 2 && defaultState !== state) {
            return <p onClick={() => deleteState(state)}><CloseIcon /></p>
        }
    }

    return (
        <>
            { state !== defaultState &&
                <div className={styles.state}>
                    <p onClick={() => setDefaultState(state)}>{state}</p>
                    {getIcon()}
                </div>
            }
        </>
    )
}

