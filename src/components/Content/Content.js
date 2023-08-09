/* eslint-disable react-hooks/exhaustive-deps */
import Trending from "./Trending/Trending";
import styles from "./Content.module.scss";
import classNames from "classnames/bind";
import Container from "../Container/Container";
import { BANNER_SINGER_POPULAR, POPULAR_ALBUM } from "../../redux/constant";
import { useDispatch, useSelector } from "react-redux";
import { combinedStatusSelector } from "../../redux/selector";
import { useEffect } from "react";
import { getSongFavorite, getSongHistory } from "../../services/userService";
import { loginSlice } from "../../redux/sliceReducer";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Content() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataUser } = useSelector(combinedStatusSelector);


    useEffect(() => {
        //getDataSongHistory of user
        if (dataUser.accessToken) {
            const fetch = async () => {
                const result = await getSongHistory(dataUser.accessToken, 5);
                const dataMusic = result.data.map((song) => song.music);
                dispatch(loginSlice.actions.setListRecentlyPlayed(dataMusic));

                return result;
            };
            fetch();
        }
    }, [dispatch]);

    useEffect(() => {
        //getDataSongFavorite of user
        if (dataUser.accessToken) {
            const fetch = async () => {
                const resultFavorite = await getSongFavorite(dataUser.accessToken, 5);
                const dataMusicFavorite = resultFavorite.data.map((song) => song.music);
                dispatch(loginSlice.actions.setListSongFavorite(dataMusicFavorite));

                return resultFavorite;
            };
            fetch();
        }
    }, [dispatch]);

    return (
        <div className={cx("wrapper")}>
            <div>
                <Trending />
            </div>
            {dataUser.accessToken && (
                <div>
                    <Container
                        titleSection="Recently Played"
                        listData={dataUser?.listRecentlyPlayed}
                    />
                </div>
            )}
            {dataUser.accessToken && (
                <div>
                    <Container
                        titleSection="Your Top Liked"
                        listData={dataUser?.listFavorite}
                    />
                </div>
            )}
            <div>
                <Container
                    isCircle={true}
                    listData={BANNER_SINGER_POPULAR}
                    titleSection="Suggested artists"
                    artistsClick
                />
            </div>
            <div>
                <Container
                    listData={POPULAR_ALBUM}
                    titleSection={"Popular albums"}
                    albumClick
                />
            </div>
        </div>
    )
}

export default Content;