/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import styles from "./Artists.module.scss";
import HeaderArtists from "./HeaderArtists/HeaderArtsts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sidebarSlice, statusSlice } from "../../../redux/sliceReducer";
import { getSingerDataService } from "../../../services";
import ContainerBody from "../../../components/ContainerBody/ContainerBody";

const cx = classNames.bind(styles);

function Artists() {
    const { nickname } = useParams(); // getApi from
    const [dataSinger, setDataSinger] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetch = async () => {
            try {
                const result = await getSingerDataService(nickname, 100);
                setDataSinger(result);
            } catch (error) {
                if (error) {
                    navigate('..');
                }
            }
            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetch();
    }, [nickname]);

    console.log('dataSinger: ', dataSinger);

    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null)); // not active sidebar
    }, [dispatch]);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("artists_container_header")}>
                <HeaderArtists data={dataSinger} />
            </div>
            <ContainerBody isTrack={false} data={dataSinger} sizes="large" />
        </div>
    );
}

export default Artists;