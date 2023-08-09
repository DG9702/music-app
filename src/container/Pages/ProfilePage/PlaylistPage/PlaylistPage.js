import classNames from "classnames/bind";
import styles from "./PlaylistPage.module.scss";
import TitlePage from "../../../Layout/Components/TitlePage/TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { combinedStatusSelector } from "../../../../redux/selector";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading";
import Media from "react-media";
import { getListMusicById } from "../../../../services";
import { statusSlice } from "../../../../redux/sliceReducer";

const cx = classNames.bind(styles);

function PlaylistPage() {
    const { nickname } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dataUser, isLoadingPage } = useSelector(combinedStatusSelector);
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(statusSlice.actions.isPageLoadingChange(true));
        const fetch = async () => {
            try {
                const result = await getListMusicById(dataUser.accessToken, nickname);
                setData(result);
            } catch (error) {
                if (error) {
                    navigate('..');
                }
            }
            dispatch(statusSlice.actions.isPageLoadingChange(false));
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nickname])

    return (
        <div className={cx("wrapper")}>
            <div className={cx("playlist_container")}>
                <TitlePage
                    title="Playlist"
                    data={data}
                    listSong={true}
                />
            </div>
            <div className={cx("artists_container_body")}>

            </div>
        </div>
    );
}

export default PlaylistPage;