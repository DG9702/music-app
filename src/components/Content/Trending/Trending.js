/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ArrowChevronRight } from "../../Icons";
import { ALL_NATIONAL } from "../../../redux/constant";
import {
    RenderBtnSelectNational,
    RenderListSong,
    handleFilterSongTrending,
    handleSelectBtnNational
} from "../../../container/Feature/HandleEvent/HandleEvent";
import { combinedStatusSelector } from "../../../redux/selector";
import { statusSlice } from "../../../redux/sliceReducer"

import styles from "./Trending.module.scss";
import { getTrendingDataService } from "../../../services/getTrendingDataService";
import Loading from "../../../container/Pages/Loading/Loading";

const cx = classNames.bind(styles);

function Trending() {
    const dispatch = useDispatch();
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const [dataTrending, setDataTrending] = useState([]);
    const [paramsFilter, setParamsFilter] = useState(ALL_NATIONAL);
    const [dataSelect, setDataSelect] = useState([]);
    const dataSliceRenderRender = dataSelect?.slice(0, 12); // slice 12 song to render in content

    const onHandleSelectNational = (item) => {
        const selectNational = handleSelectBtnNational(item);
        setParamsFilter(selectNational);
    }

    useEffect(() => {
        const dataFilter = handleFilterSongTrending(dataTrending, paramsFilter);
        setDataSelect(dataFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paramsFilter]);

    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetch = async () => {
            const response = await getTrendingDataService(50);
            const dataFilter = handleFilterSongTrending(response, paramsFilter);
            setDataTrending(response);
            setDataSelect(dataFilter);
            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx("wrapper")}>
            {isLoadingPage && <Loading styles={{ width: '15%', height: '5vh' }} />}
            {!isLoadingPage && <div className={cx("section-title")}>
                <h2 className={cx("section-title-head")}>Top Trending</h2>
                <a >
                    <span className={cx("show-all")}>
                        Show all
                        <span>
                            <ArrowChevronRight />
                        </span>
                    </span>
                </a>
            </div>}
            <div className={cx("section-btn-nation")}>
                {RenderBtnSelectNational(paramsFilter, onHandleSelectNational)}
            </div>
            <div className={cx("container-list-song")}>
                <RenderListSong
                    data={dataSliceRenderRender}
                    HomePageTrending={true}
                />
            </div>
        </div>
    )
}

export default Trending;