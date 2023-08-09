/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import styles from "./ProfilePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { combinedStatusSelector } from "../../../redux/selector";
import { RenderListSong } from "../../../container/Feature/HandleEvent/HandleEvent";
import TitlePage from "../../Layout/Components/TitlePage/TitlePage";
import { useEffect } from "react";
import { getAllPlayListMusic, getSongFavorite } from "../../../services";
import { loginSlice, sidebarSlice } from "../../../redux/sliceReducer";
import Container from "../../../components/Container/Container";
import Media from "react-media";
import BackgroundColor from "../../../components/BackgroundColor/BackgroundColor";
const cx = classNames.bind(styles);

function ProfilePage() {
    const dispatch = useDispatch();
    const { dataUser, isLoadingPage } = useSelector(combinedStatusSelector);

    const listArtist = dataUser?.listFavorite.filter((item, index, arr) => {
        // filter list artist
        const newList = arr.findIndex(
            (it) => it.slug_name_singer === item.slug_name_singer,
        );
        return newList === index;
    });
    const filteredFavoriteArtists = [
        ...listArtist.slice(0, 4),

    ];

    useEffect(() => {
        //getDataSongFavorite of user
        const fetch = async () => {
            const result = await getSongFavorite(dataUser.accessToken);
            const dataMusic = result.data.map((song) => song.music);
            dispatch(loginSlice.actions.setListSongFavorite(dataMusic));
            return result;
        };
        fetch();
    }, []);

    useEffect(() => {
        //getDataSongFavorite of user
        const fetch = async () => {
            const resultPlaylist = await getAllPlayListMusic(dataUser?.accessToken);
            const dataPlaylist = resultPlaylist.map((item) => item);
            dispatch(loginSlice.actions.setListAllPlaylist(dataPlaylist));

            return resultPlaylist;
        };
        fetch();
    }, []);
    useEffect(() => {
        dispatch(sidebarSlice.actions.setIdSidebarActive(null)); // not active sidebar
    }, [dispatch]);

    return (
        <Media
            queries={{
                small: '(max-width: 1199px)',
                large: '(min-width: 1200px)',
            }}
        >
            {matches => (
                <>
                    {matches.large && (
                        <div className={cx('wrapper')}>
                            <div className={cx('Profile_container')}>
                                <TitlePage
                                    title="Profile"
                                    data={dataUser}
                                    profile={true}
                                />
                                <div className={cx("position")}>
                                    <BackgroundColor linearNoise={true} data={dataUser?.data.image} />
                                    <div className={cx("favorite-artists")}>
                                        <Container
                                            noneHead={false}
                                            isCircle={true}
                                            listData={filteredFavoriteArtists}
                                            titleSection="Top Artists this favorite"
                                        />
                                    </div>
                                    <div className={cx('playlist_section')}>
                                        <div className={cx("playlist-head")}>
                                            <div className={cx("playlist-title")}>
                                                <h2>Top favorite tracks</h2>
                                                <span>Only visible to you</span>
                                            </div>
                                            <Link className={cx("show-all")}>
                                                Show all
                                            </Link>
                                        </div>
                                        {!dataUser.listFavorite.length && !isLoadingPage > 0 && (
                                            <h3>Hiện chưa có bài hát nào.... </h3>
                                        )}
                                        <RenderListSong
                                            data={dataUser?.listFavorite}
                                            isRank={true}
                                            pageChild={true}
                                        />
                                    </div>
                                </div>
                                <div className={cx("playlist_section")}>
                                    <Container
                                        profile
                                        listData={dataUser?.listAllPlaylist}
                                        titleSection="Public Playlists"
                                    />
                                </div>
                            </div>
                        </div>

                    )}
                    {matches.small && (
                        <div className={cx('wrapper')}>
                            <div className={cx('Profile_container')}>
                                <TitlePage
                                    title="Profile"
                                    data={dataUser}
                                />
                                <div className={cx("position")}>
                                    <BackgroundColor linearNoise={true} data={dataUser?.data.image} />
                                    <div className={cx("favorite-artists")}>
                                        <Container
                                            noneHead={true}
                                            isCircle={true}
                                            listData={filteredFavoriteArtists}
                                        />
                                    </div>
                                    <div className={cx('playlist_section')}>
                                        <div className={cx("playlist-head")}>
                                            <div className={cx("playlist-title")}>
                                                <h2>Top favorite tracks</h2>
                                                <span>Only visible to you</span>
                                            </div>
                                            <Link className={cx("show-all")}>
                                                Show all
                                            </Link>
                                        </div>
                                        {!dataUser.listFavorite.length && !isLoadingPage > 0 && (
                                            <h3>Hiện chưa có bài hát nào.... </h3>
                                        )}
                                        <RenderListSong
                                            data={dataUser?.listFavorite}
                                            pageChildrenMobile={true}
                                            isRank={true}
                                            pageChild={true}
                                        />
                                    </div>
                                </div>
                                <div className={cx("playlist_section")}>
                                    <Container
                                        profile
                                        listData={dataUser?.listAllPlaylist}
                                        titleSection="Public Playlists"
                                    />
                                </div>
                            </div>
                        </div>

                    )}
                </>
            )}
        </Media>

    );
}

export default ProfilePage;