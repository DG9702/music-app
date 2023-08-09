/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import styles from "./Track.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { combinedStatusSelector } from "../../../redux/selector";
import { useEffect, useState } from "react";
import Media from "react-media";
import Loading from "../Loading";
import TitlePage from "../../Layout/Components/TitlePage/TitlePage";
import { sidebarSlice, statusSlice } from "../../../redux/sliceReducer";
import { getMusicById, newSongService } from "../../../services";
import ButtonEffectPlay from "../../../components/Button/config/ButtonEffectPlay";
import BackgroundColor from "../../../components/BackgroundColor/BackgroundColor";
import ContainerBody from "../../../components/ContainerBody/ContainerBody";

const cx = classNames.bind(styles);

function Track() {
    const { nickname } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dataUser, isLoadingPage } = useSelector(combinedStatusSelector);
    const [dataTrack, setDataTrack] = useState([]);
    //const [dataNewSongs, setDataNewSongs] = useState();

    //useEffect(() => {
    //    dispatch(statusSlice.actions.isPageLoadingChange(true));
    //    const fetchNewSong = async () => {
    //        const result = await newSongService(10)
    //        setDataNewSongs(result);
    //        dispatch(statusSlice.actions.isPageLoadingChange(false));
    //        return result;
    //    };
    //    fetchNewSong();

    //    dispatch(sidebarSlice.actions.setIdSidebarActive(3));
    //}, [dispatch]);

    //console.log('Check dataNewSongs: ', dataNewSongs);
    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetch = async () => {
            try {
                const result = await getMusicById(nickname);
                setDataTrack(result);
            } catch (error) {
                if (error) {
                    navigate('..');
                }
            }
            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetch();

    }, [nickname])

    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null)); // not active sidebar
    }, [dispatch]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("playlist_container")}>
                <TitlePage
                    title="Song"
                    data={dataTrack}
                    song={true}
                />
            </div>
            <ContainerBody isTrack={true} data={[dataTrack]} sizes="large" />
            <div>

            </div>
        </div>
    );
}

export default Track;