import React from "react";
import styles from "../../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import { getIsAuth } from "../../redux/Authtorization/selectors/authSelector";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoSharpIcon from '@material-ui/icons/InfoSharp';
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo';
import { getIconSelected } from "../../redux/Dashboard/selectors/dashboardSelector";
import { setIconAction } from "../../redux/Dashboard/actions/setIcon";
import { logoutAction } from "../../redux/Authtorization/actions/logout";

export const NavbarComponent = (props) => {
    return (
        <NavbarIcons className={styles.navbar} />
    );
};

export const NavbarIcons = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
    const iconSelected = useSelector(getIconSelected);

    const selectIcon = (icon) => {
        dispatch(setIconAction(icon))
    }
    return (
        <div className={styles.navbar}>
            {isAuth ?
                <NavbarIfAuthTrue iconSelected={iconSelected} selectIcon={selectIcon} />
                :
                <NavbarIfAuthFalse iconSelected={iconSelected} selectIcon={selectIcon} />
            }
        </div>
    )
}

export const NavbarIfAuthTrue = ({ iconSelected, selectIcon }) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.icons}>
            <NavLink data-title="Logout"
                className={styles.icon} onClick={() => dispatch(logoutAction())} to="#">
                <ExitToAppIcon />
            </NavLink>
            <NavLink data-title="Dashboard"
                className={iconSelected === 1 ? styles.icon + " " + styles.iconSelected : styles.icon}
                onClick={() => selectIcon(1)} to="/dashboard">
                <DashboardIcon />
            </NavLink>
        </div>
    )
}

export const NavbarIfAuthFalse = ({ iconSelected, selectIcon }) => {
    return (
        <div className={styles.icons}>
            <NavLink data-title="Info"
                className={iconSelected === 1 ? styles.icon + " " + styles.iconSelected : styles.icon}
                onClick={() => selectIcon(1)} to="#">
                <InfoSharpIcon />
            </NavLink>
            <NavLink data-title="Tutorial"
                className={iconSelected === 2 ? styles.icon + " " + styles.iconSelected : styles.icon}
                onClick={() => selectIcon(2)} to="#">
                <PersonalVideoIcon />
            </NavLink>
        </div>
    )
}