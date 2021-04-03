import React, { useEffect, useState } from "react";
import styles from "../../styles/Pagination.module.css";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as queryString from "query-string";
import { setErrorAction } from "../../redux/Errors/actions/setError";
import { getThingsPageThunk } from "../../redux/Things/thunks/getThingsPage";

export const Pagination = ({ page, pagination, pathname, onPageChanged, setPage }) => {

    const history = useHistory();
    const dispatch = useDispatch();
    const countPage = pagination.pages;

    const pages = [];
    for (let i = 1; i <= countPage; i++) {
        pages.push(i);
    }

    const portionCount = Math.ceil(countPage / 5);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionNumber = (portionNumber - 1) * 5 + 1;
    const rightPortionNumber = 5 * portionNumber;

    useEffect(() => {
        const parsed = queryString.parse(history.location.search);
        let actualPage = page;
        if (!!parsed.page) actualPage = Number(parsed.page)
        if (actualPage > countPage || actualPage < 1 || isNaN(actualPage)) {
            dispatch(setErrorAction({ "status": 400, "message": "Not exist page" }))
        } else {
            dispatch(setPage(actualPage))
        }
    }, [])

    useEffect(() => {
        const query = {};
        if (page !== 1) query.page = String(page);
        history.push({
            pathname: pathname,
            search: queryString.stringify(query)
        })
    }, [page])

    return (
        <div className={styles.paginationWrapper}>
            <div className={styles.pagination}>
                {portionNumber > 1 ?
                    <button onClick={() => setPortionNumber(portionNumber - 1)}><ArrowBackIcon /></button>
                    :
                    <button disabled><ArrowBackIcon /></button>
                }

                {pages
                    .filter((page) => page >= leftPortionNumber && page <= rightPortionNumber)
                    .map((page) => {
                        return (
                            <button key={page.toString()} onClick={() => onPageChanged(page)}
                            >{page}</button>
                        );
                    })}

                {portionNumber < portionCount ?
                    <button onClick={() => setPortionNumber(portionNumber + 1)}><ArrowForwardIcon /></button>
                    :
                    <button disabled><ArrowForwardIcon /></button>
                }
            </div>
        </div>
    );
};
