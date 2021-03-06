import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../../styles/Dashboard.module.css";

export const DashboardItem = React.memo(({ project }) => {

    return (
        <div className={styles.project}>
            <NavLink to={"/dashboard/project/" + project.id} className={styles.nav}>
                <div className={styles.name}>{project.name}</div>
                <div className={styles.title}>
                    {project.title.length > 15 ? project.title.slice(0, 15) + "..." : project.title}
                </div>
            </NavLink>
        </div>

    );
});


