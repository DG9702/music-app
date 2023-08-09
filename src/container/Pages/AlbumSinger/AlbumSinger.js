/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames/bind";
import Media from "react-media";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Loading";
import styles from "./AlbumSinger.module.scss";
import Banner from "../../../components/Banner/Banner";
import { useEffect, useRef, useState } from "react";
import { featureSlice, sidebarSlice, statusSlice } from "../../../redux/sliceReducer";
import { combinedStatusSelector } from "../../../redux/selector";
import { convertNumber, useDate } from "../../../hooks";
import ButtonEffectPlay from '../../../components/Button/config/ButtonEffectPlay';
import { RenderListSong } from "../../Feature/HandleEvent/HandleEvent";
import { getMusicTopView, getSingerDataService } from "../../../services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { average } from "color.js";
import BackgroundColor from "../../../components/BackgroundColor/BackgroundColor";

const cx = classNames.bind(styles);

function AlbumSinger() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ListSongRef = useRef();
    const location = useLocation();
    const { nickname } = useParams();
    const { isPlaying, songCurrent, slugDataBanner, isRequirePlay, isLoadingPage, } =
        useSelector(combinedStatusSelector);

    const [dataFullSongs, setDataSinger] = useState([]);
    const [dataInAlbum, setDataInAlbum] = useState({});
    //const [colors, setColors] = useState();

    const favorite = convertNumber(dataInAlbum.favorite);
    const timer = useDate(dataInAlbum?.createdAt);

    // constants check value in store and location
    const slugNameSingerCurrent = songCurrent?.slug_name_singer; // song current
    const slugCategoryCurrent = songCurrent?.slug_category;
    const slugBannerSingerPopular = location?.state?.slug_banner_singer_popular;
    const slugBannerAlBumHot = location?.state?.slug_banner_album_hot;
    const isBannerAlbumHot = location?.state?.isBannerAlbumHot;

    const listArtist = dataFullSongs.filter((item, index, arr) => {
        // filter list artist
        const newList = arr.findIndex(
            (it) => it.slug_name_singer === item.slug_name_singer,
        );
        return newList === index;
    });
    // eslint-disable-next-line no-unused-vars
    const filteredFavoriteArtists = [...listArtist.slice(0, 5)];

    const handlReqirePlayFromBanner = (data) => {
        if (isRequirePlay) {
            const randomID = Math.floor(Math.random() * data.length);

            dispatch(statusSlice.actions.isPlayingChange(true));
            dispatch(featureSlice.actions.setDataSongs(data));
            dispatch(featureSlice.actions.setSongCurrent(data[randomID]));
            dispatch(featureSlice.actions.setCurrentID(randomID));
            dispatch(statusSlice.actions.isRequirePlayChange(false));
        }
    };
    // banner singer popular
    useEffect(() => {
        if (!isBannerAlbumHot) {
            if (slugNameSingerCurrent === slugBannerSingerPopular) {
                // check currentSong with slugname from location in content when click
                dispatch(featureSlice.actions.setSlugDataBanner(slugNameSingerCurrent));
            } else {
                dispatch(featureSlice.actions.setSlugDataBanner(undefined));
            }
        }
    }, [slugNameSingerCurrent, dispatch, slugBannerSingerPopular, isBannerAlbumHot]);

    // banner album hot
    useEffect(() => {
        if (isBannerAlbumHot) {
            if (slugCategoryCurrent === slugBannerAlBumHot) {
                // check currentSong with slugname from location in content when click
                dispatch(featureSlice.actions.setSlugDataBanner(slugCategoryCurrent));
            } else {
                dispatch(featureSlice.actions.setSlugDataBanner(undefined));
            }
        }
    }, [slugCategoryCurrent, dispatch, isBannerAlbumHot, slugBannerAlBumHot]);

    // take data from slugNameLocation with params nickname
    useEffect(() => {
        if (dataFullSongs.length === 0 && !slugBannerAlBumHot) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));
            const fetch = async () => {
                try {
                    const result = await getSingerDataService(nickname);
                    setDataSinger(result);
                    console.log('Check result: ', result);
                    setDataInAlbum(result[result.length - 1]);
                    handlReqirePlayFromBanner(result); // handle require play
                    dispatch(statusSlice.actions.isPageLoadingChange(false));
                } catch (error) {
                    if (error) {
                        navigate('..');
                    }
                }
            };
            fetch();
        }
    }, [nickname, dispatch, navigate]);

    //  take data and filter data from slugBannerSingerPopular
    useEffect(() => {
        if (isBannerAlbumHot) {
            dispatch(statusSlice.actions.isPageLoadingChange(true));

            const fetchBannerAlbumHot = async () => {
                const result = await getMusicTopView(300);

                const dataBannerAlbum = result.filter((item) => {
                    return item?.slug_category === slugBannerAlBumHot;
                });

                const newDataFillter = dataBannerAlbum.reverse().slice(0, 29);

                setDataSinger(newDataFillter);

                setDataInAlbum(newDataFillter[newDataFillter.length - 1]);
                handlReqirePlayFromBanner(newDataFillter);
                dispatch(statusSlice.actions.isPageLoadingChange(false));
            };
            fetchBannerAlbumHot();
        }
    }, [isBannerAlbumHot, slugBannerAlBumHot, dispatch]);

    // not active sidebar
    useEffect(() => {
        if (!location.state) {
            // if not state from location will return
            navigate('..');
        }
        dispatch(sidebarSlice.actions.setIdSidebarActive(null));
    }, [navigate, dispatch]);


    const ComponentLoading = () => {
        return (
            <Media query="(max-width: 1200px)">
                {(matches) => {
                    return matches ? (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 20,
                                width: '100%',
                                height: '30vh',
                                margin: '15px 10px 0',
                            }}
                        >
                            <Loading styles={{ height: '4vh' }} />
                            <Loading styles={{ width: '90%', height: '3vh' }} />
                            <Loading styles={{ width: '80%', height: '2vh' }} />
                        </div>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                gap: 20,
                                width: '100%',
                                margin: '15px 10px 0',
                            }}
                        >
                            <Loading styles={{ height: '4vh' }} />
                            <Loading styles={{ width: '60%', height: '3vh' }} />
                            <Loading styles={{ width: '40%', height: '2vh' }} />
                        </div>
                    );
                }}
            </Media>
        );
    };

    return (
        <Media
            queries={{
                small: '(max-width: 1199px)',
                large: '(min-width: 1200px)',
            }}
        >
            {matches => (
                <>
                    {matches.large &&
                        <div className={cx('wrapper')}>
                            <div className={cx('title_section')}>
                                <BackgroundColor data={location.state?.src} />
                                <div className={cx('img_banner')}>
                                    <Banner
                                        item={location?.state}
                                        data={dataFullSongs}
                                        isLivingAlbum={true}
                                        singleBtn={true}
                                        className={"bg_album_singer"}
                                    />
                                </div>
                                {isLoadingPage || dataFullSongs.length === 0 ? (
                                    <ComponentLoading />
                                ) : (
                                    <div className={cx('title_header')}>
                                        <span>Playlist</span>
                                        <span className={cx('title_header_section')}>
                                            <h1 className={cx("header-type-element")}>{location?.state?.title}</h1>
                                        </span>
                                        <span className={cx("title-desc")}>
                                            Những nghệ sĩ Việt có lượt nghe nhiều nhất năm 2022.
                                        </span>
                                        <span className={cx('title_extra')}>
                                            <Link to={`/artists/${dataInAlbum.slug_name_singer}`}>
                                                <span className={cx('singer_outainding')}>
                                                    {dataInAlbum.name_singer}
                                                </span>
                                            </Link>
                                        </span>
                                        <div className={cx("section_song_info")}>
                                            <div className={cx("logo")}>
                                                <FontAwesomeIcon icon={faSpotify} />
                                                <span>
                                                    Spotify
                                                </span>
                                            </div>
                                            <span className={cx("section_song_info-element", "before")}>{favorite} likes</span>
                                            <span className={cx("section_song_info-element", "before")}> about {timer}</span>
                                        </div>

                                    </div>
                                )}
                            </div>
                            <div className={cx("position")}>
                                <BackgroundColor linearNoise={true} data={location.state?.src} />
                                <span className={cx('btn_effect')}>
                                    <ButtonEffectPlay
                                        sizes="wider"
                                        data={dataFullSongs}
                                        isSlugNameFromLocation={slugDataBanner}
                                    />
                                </span>
                                <div className={cx('container_list_song_full')}>
                                    {!isLoadingPage && (
                                        <div className={cx('title_songs_list')}>
                                            <div className={cx("title-list-container")}>
                                                <span className={cx("title-list-index")}>#</span>
                                                <span>Title</span>
                                                <span>Album</span>
                                                <span className={cx("title-list-clock")}>
                                                    <FontAwesomeIcon icon={faClock} />
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className={cx('list_song')} ref={ListSongRef} id="container">
                                        <RenderListSong
                                            data={dataFullSongs}
                                            containerRef={ListSongRef}
                                            isRank={true}
                                            pageChild={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {matches.small &&
                        <div className={cx('wrapper')}>
                            <div className={cx('title_section')}>
                                <BackgroundColor data={location.state?.src} />
                                <div className={cx('img_banner')}>
                                    <Banner
                                        item={location?.state}
                                        data={dataFullSongs}
                                        isLivingAlbum={true}
                                        singleBtn={true}
                                        className={"bg_album_singer"}
                                    />
                                </div>
                                {isLoadingPage || dataFullSongs.length === 0 ? (
                                    <ComponentLoading />
                                ) : (
                                    <div className={cx('title_header')}>
                                        <span>Playlist</span>
                                        <span className={cx('title_header_section')}>
                                            <h1 className={cx("header-type-element")}>{location?.state?.title}</h1>
                                        </span>
                                        {/*<span className={cx("title-desc")}>
                                            Những nghệ sĩ Việt có lượt nghe nhiều nhất năm 2022.
                                        </span>*/}
                                        <span className={cx('title_extra')}>
                                            <Link to={`${dataInAlbum.slug_name_singer}`}>
                                                <span className={cx('singer_outainding')}>
                                                    {dataInAlbum.name_singer}
                                                </span>
                                            </Link>
                                        </span>
                                        <div className={cx("section_song_info")}>
                                            <div className={cx("logo")}>
                                                <FontAwesomeIcon icon={faSpotify} />
                                                <span>
                                                    Spotify
                                                </span>
                                            </div>
                                            <div>
                                                <span className={cx("section_song_info-element")}>{favorite} likes</span>
                                                <span className={cx("section_song_info-element", "before")}> about {timer}</span>
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                            <BackgroundColor linearNoise={true} data={location.state?.src} />
                            <span className={cx('btn_effect')}>
                                <ButtonEffectPlay
                                    sizes="wider"
                                    data={dataFullSongs}
                                    isSlugNameFromLocation={slugDataBanner}
                                />
                            </span>
                            <div className={cx('container_list_song_full')}>
                                <div className={cx('list_song')} ref={ListSongRef} id="container">
                                    <RenderListSong
                                        data={dataFullSongs}
                                        containerRef={ListSongRef}
                                        isRank={true}
                                        pageChild={true}
                                        pageChildrenMobile={true}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                </>
            )}


        </Media>
    )
}

export default AlbumSinger;