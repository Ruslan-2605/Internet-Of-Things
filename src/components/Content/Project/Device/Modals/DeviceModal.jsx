import React, { useState } from "react";
import styles from "../../../../../styles/DeviceModal.module.css";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { useDispatch, useSelector } from "react-redux";
import { getActiveThingsPage } from "../../../../../redux/Things/selectors/thingsSelector";
import { getProjectViewed } from "../../../../../redux/Dashboard/selectors/dashboardSelector";
import { getUserToken } from "../../../../../redux/Authtorization/selectors/authSelector";
import CopyToClipboard from "react-copy-to-clipboard";
import { getTextIsCopied } from "../../../../../utils/component-helpers/getTextIsCopied";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import fetching from "../../../../../images/fetching.gif"
import { LastActive } from "../../../../../utils/component-helpers/LastActive";
import { deleteDeviceThunk } from "../../../../../redux/Things/thunks/deleteDevice";
import { setDeviceStateThunk } from "../../../../../redux/Things/thunks/setDeviceState";
import { setErrorAction } from "../../../../../redux/Errors/actions/setError";

export const DeviceModal = (props) => {

    const { isModal, setModal, thing, setEditMode } = props;

    const id = thing.entity.id; //device id
    const name = thing.entity.name;
    const token = thing.entity.token

    return (
        <div className={isModal ? styles.modalWrapper + " " + styles.open : styles.modalWrapper + " " + styles.close} >
            <div className={styles.modalBody}>
                <button className={styles.btnClose} onClick={() => setModal(false)}><CloseIcon /></button>
                <div className={styles.title}>
                    <p>{name}</p>
                    <Icons id={id} setModal={setModal} token={token} setEditMode={setEditMode} />
                </div>
                <div className={styles.content}>
                    <DeviceInfo thing={thing} />
                </div>
                <LastActive activity={thing.entity.activity} />
            </div>
        </div>
    );
};

const Icons = ({ id, token, setModal, setEditMode }) => {

    const dispatch = useDispatch();

    const page = useSelector(getActiveThingsPage);
    const project = useSelector(getProjectViewed).id; //project id
    const userToken = useSelector(getUserToken);

    const [isCopy, setCopy] = useState(false);

    const deleteDevice = async () => {
        const status = await dispatch(deleteDeviceThunk(id, page, project, userToken))
        if (status === 200) {
            setModal(false)
        }
    }

    return (
        <div className={styles.icons}>
            <div>
                <CopyToClipboard text={token}
                    onCopy={() => setCopy(true)}>
                    <button><FileCopyOutlinedIcon /> {getTextIsCopied(isCopy, setCopy)}</button>
                </CopyToClipboard>
            </div>
            <div>
                <button onClick={() => setEditMode(true)}><EditIcon /></button>
                <button onClick={deleteDevice}><DeleteIcon /></button>
            </div>
        </div>
    );
}

const DeviceInfo = (thing) => {

    const states = thing.thing.entity.states;
    const activeState = thing.thing.entity.state;
    const token = thing.thing.entity.token;
    const [isDisabled, setDisabled] = useState(false);

    return (
        <div className={styles.states}>
            {
                states.map((state) => {
                    return (
                        <State
                            key={state}
                            state={state}
                            activeState={activeState}
                            token={token}
                            isDisabled={isDisabled}
                            setDisabled={setDisabled}
                        />
                    )
                })
            }
        </div>
    )
}

const State = ({ state, activeState, token, isDisabled, setDisabled }) => {

    const dispatch = useDispatch();
    const [isFetching, setFethcing] = useState(false);

    const onClick = async () => {
        if (state !== activeState && !isDisabled) {
            setFethcing(true);
            setDisabled(true);
            const status = await dispatch(setDeviceStateThunk(state, token));
            if (status === 204) {
                dispatch(setErrorAction({ "status": 204, "message": "No content" }))
            }
            setFethcing(false);
            setDisabled(false);
        }
        else if (state == activeState) {
            dispatch(setErrorAction({ "status": 400, "message": "State is active" }))
        }
        else if (isDisabled) {
            dispatch(setErrorAction({ "status": 400, "message": "Another request in the queue" }))
        }
    }

    return (
        <div className={styles.state} onClick={onClick}>
            <p>{state}</p>
            <p>{state === activeState && <CheckOutlinedIcon />}</p>
            {isFetching && <p><img src={fetching} /></p>}
        </div>
    )
}



