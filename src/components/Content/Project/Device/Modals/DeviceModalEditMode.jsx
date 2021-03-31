import React, { useState } from "react";
import styles from "../../../../../styles/DeviceModalEditMode.module.css";
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CopyToClipboard from "react-copy-to-clipboard";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { getTextIsCopied } from "../../../../utils/getTextIsCopied";
import { UpdateDeviceForm } from '../Forms/UpdateDeviceForm'

export const DeviceModalEditMode = (props) => {

    const { isModal, setModal, thing, setEditMode } = props;

    const token = thing.entity.token

    const [states, setStates] = useState(thing.entity.states)

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>

                <button className={styles.arrowBackIcon} onClick={() => setEditMode(false)}><ArrowBackIcon /></button>
                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>

                <div className={styles.title}>
                    <Icons token={token} activeState={thing.entity.state} />
                </div>
                <div className={styles.content}>
                    <DeviceInfo thing={thing} states={states} setStates={setStates} />
                </div>
            </div>
        </div>
    );
};

const Icons = ({ token, activeState }) => {

    const [isCopy, setCopy] = useState(false);

    return (
        <div className={styles.icons}>
            <div>
                <CopyToClipboard text={token}
                    onCopy={() => setCopy(true)}>
                    <button className={styles.btnCopy}><FileCopyOutlinedIcon /> {getTextIsCopied(isCopy, setCopy)}</button>
                </CopyToClipboard>
            </div>
            <div>
                <button className={styles.activeState}>{activeState}</button>
            </div>
        </div>
    );
}

const DeviceInfo = ({ thing, states, setStates }) => {

    const activeState = thing.entity.state;
    const length = states.length;
    const name = thing.entity.name;
    const id = thing.entity.id; //device id

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
                            activeState={activeState}
                            length={length}
                        />
                    )
                })
            }

            <UpdateDeviceForm states={states} setStates={setStates} name={name} id={id} />

        </div>
    )
}

const State = ({ state, states, setStates, activeState, length }) => {

    const deleteState = (state) => {
        const statesCopy = [...states]
        statesCopy.map((item, index) => {
            if (item === state) {
                statesCopy.splice(index, 1);
                setStates(statesCopy);
            }

        })
    }

    return (
        <>
            {
                state !== activeState
                &&
                <div className={styles.state}>
                    <p>{state}</p>
                    {length > 2 && <p onClick={() => deleteState(state)}><CloseIcon /></p>}
                </div>
            }
        </>
    )
}

