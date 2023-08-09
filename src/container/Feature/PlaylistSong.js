import classNames from "classnames/bind";
import styles from "./PlaylistSong.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { animateScroll as scroll } from 'react-scroll';
import { combinedStatusSelector } from "../../redux/selector";
import React, { useEffect, useRef, useState } from "react";
import convertNumber from "../../hooks/convertNumber";
import Media from "react-media";
import Images from "../../components/Images"
import { HeartFull, Pause, Play, SubTract, WaveSongPlay } from "../../components/Icons";
import { Link } from "react-router-dom";
import { featureSlice, radioSlice, statusSlice } from "../../redux/sliceReducer"
import { ActionBtnAlbum } from "./ActionBtnAlbum";
import { createSongHistoryUser } from "../../services";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

function PlaylistSong(
    {
        data = [],
        song,
        index,
        isRank,
        HomePageTrending = false, // styles off class
        MyPlayerPage = false,
        isListQueue,
        pageChild,
        pageChildrenMobile,
        isArtists
    },
    ref,
) {
    const dispatch = useDispatch();
    const { songCurrent, isPlaying, dataUser } = useSelector(combinedStatusSelector);
    const [isHover, setIsHover] = useState(false);
    const [element, setElement] = useState('');
    const songItemRef = useRef();
    const refItem = useRef();
    const favoriteRender = convertNumber(song?.favorite);
    const handleConfig = async (data, song, index, e) => {
        if (data) {
            if (song._id === songCurrent._id) {
                dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
            } else {
                dispatch(statusSlice.actions.isPlayingChange(true));
            }
            if (dataUser.accessToken && dataUser.listRecentlyPlayed) {
                if (!isPlaying) {
                    await createSongHistoryUser(dataUser.accessToken, song._id);

                }
            }
            dispatch(featureSlice.actions.setDataSongs(data));
            dispatch(featureSlice.actions.setSongCurrent(data[index]));
            dispatch(featureSlice.actions.setCurrentID(index));
            // turn off radio when play playlist
            dispatch(radioSlice.actions.setUrlRadio(''));
            dispatch(radioSlice.actions.setIsPlayingRadio(false));
        }
    };
    const handlePlaySong = (data, song, index) => {
        // click avatar or Wavesong will playsong
        return handleConfig(data, song, index);
    };

    const handleDubleClickPlaySong = (e, data, song, index) => {
        //dubbleClick parent will play song not

        return handleConfig(data, song, index, e);
    };

    const handleHoverMusic = (e, index) => {
        if (e.target.dataset.index === index.toString()) {
            setIsHover(true);
            setElement(e.target.dataset.index);
        }
    };

    const handleLeaveMusic = () => {
        setIsHover(false);
    };


    useEffect(() => {
        // effect scroll with react-scro
        if (songCurrent?._id === song?._id && isPlaying && !HomePageTrending) {
            scroll.scrollTo(
                songItemRef.current.offsetTop - (isListQueue ? 250 : 410), // check to scroll smooth location
                {
                    containerId: ref?.current?.id,
                    duration: 2000,
                    delay: 500,
                    smooth: 'easeOutCubic',
                },
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [songCurrent, isPlaying]);

    return (
        <Media
            queries={{
                mobile: '(max-width: 1199px)',
            }}
        >
            {(matches) => {
                return (
                    <div
                        ref={songItemRef}
                        className={cx(
                            'song_item_container',
                            songCurrent?._id === song?._id
                                ? isListQueue
                                    ? 'isActiveListQueue'
                                    : 'isActive'
                                : '',
                            { HomePageTrending },
                            { pageChild },
                            { pageChildrenMobile }
                        )}
                        key={index}
                        data-index={index}
                        onClick={(e) =>
                            matches.mobile &&
                            handleDubleClickPlaySong(e, data, song, index)
                        }
                        onDoubleClick={(e) =>
                            !matches.mobile &&
                            handleDubleClickPlaySong(e, data, song, index)
                        }
                        onMouseOver={(e) => handleHoverMusic(e, index)}
                        onMouseLeave={handleLeaveMusic}
                    >
                        {isRank && (
                            <div className={cx('song_prefix')}
                                onClick={(e) => handlePlaySong(data, song, index)}
                            >
                                <div className={cx('song_prefix-content')}>
                                    {pageChildrenMobile ? (
                                        <span className={cx("number_title")}>{index + 1}</span>
                                    ) : (
                                        <>
                                            {!isHover ?
                                                (<span className={cx("number_title")}>{index + 1}</span>)
                                                :
                                                (songCurrent?._id === song?._id && isPlaying ? (
                                                    <Pause />
                                                ) : (
                                                    <Play />
                                                ))
                                            }
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className={cx('container_song_section')}>
                            <div className={cx('songs_item_left')}>
                                <figure
                                    className={cx('image_song_item')}
                                    onClick={(e) => handlePlaySong(data, song, index)}
                                >
                                    <Images src={song?.image_music} />
                                    {HomePageTrending && <span className={cx('icon_inner_avatar')}>
                                        {songCurrent?._id === song?._id && isPlaying ? (
                                            <Pause />
                                        ) : (
                                            <Play />
                                        )}
                                    </span>}
                                </figure>
                                <div
                                    className={cx('title_song_item')}
                                    ref={refItem}
                                >
                                    <Link
                                        to={`/track/${song._id}`}
                                        className={cx('name_song_item')}
                                    >
                                        {song.name_music}
                                    </Link>
                                    <span className={cx('name_singer_item')}>
                                        <Link
                                            to={`/artists/${song.slug_name_singer}`}
                                            state={song.slug_name_singer}
                                        >
                                            {song.name_singer}
                                        </Link>
                                    </span>

                                    {/* favorite of trending music */}
                                    {HomePageTrending && (
                                        <span className={cx('song_trending_favorite')}>
                                            <HeartFull /> {favoriteRender}
                                        </span>
                                    )}
                                </div>
                                {pageChild && (
                                    pageChildrenMobile ? (
                                        <></>
                                    ) : (
                                        <>
                                            {isArtists ? (
                                                <h4 className={cx("song_info-more", isArtists ? 'isArtists' : '')}>
                                                    {song?.view.toLocaleString()}
                                                </h4>
                                            ) : (
                                                <Link
                                                    to={`/track/${song._id}`}
                                                    className={cx("song_info-more")}
                                                >
                                                    {song.name_music}
                                                </Link>
                                            )}
                                        </>
                                    )
                                )}
                            </div>

                            <div className={cx('song_item_right')}>
                                {pageChild ? (
                                    <>
                                        {pageChildrenMobile ? (
                                            <>
                                                <div className={cx('items_hover', "mr-8")}>
                                                    <ActionBtnAlbum
                                                        sizeTablet={true}
                                                        song={song}
                                                        playlistSong={true}
                                                        isListQueue={
                                                            songCurrent?._id === song?._id &&
                                                                isListQueue
                                                                ? isListQueue
                                                                : undefined
                                                        }
                                                    />
                                                </div>
                                                <div className={cx('item_format_time')}>
                                                    {song.time_format}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {isHover ? (<div className={cx('items_hover', "mr-8")}>
                                                    <ActionBtnAlbum
                                                        sizeTablet={true}
                                                        song={song}
                                                        playlistSong={true}
                                                        isListQueue={
                                                            songCurrent?._id === song?._id &&
                                                                isListQueue
                                                                ? isListQueue
                                                                : undefined
                                                        }
                                                    />
                                                </div>)
                                                    : (
                                                        <div className={cx('items_hover', "mr-8")}></div>
                                                    )
                                                }
                                                <div className={cx('item_format_time')}>
                                                    {song.time_format}
                                                </div>
                                                {isHover ?
                                                    (<div className={cx('items_hover')}>
                                                        <ActionBtnAlbum
                                                            HomePageTrending={true}
                                                            song={song}
                                                            playlistSong={true}
                                                            isListQueue={
                                                                songCurrent?._id === song?._id &&
                                                                    isListQueue
                                                                    ? isListQueue
                                                                    : undefined
                                                            }
                                                        />
                                                    </div>) : (
                                                        <div className={cx('items_hover')}></div>
                                                    )
                                                }
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {isHover &&
                                            element === index.toString() &&
                                            !MyPlayerPage ? ( // check element current ===  element hover will use effect
                                            <div className={cx('items_hover')}>
                                                <ActionBtnAlbum
                                                    HomePageTrending={HomePageTrending}
                                                    song={song}
                                                    playlistSong={true}
                                                    isListQueue={
                                                        songCurrent?._id === song?._id &&
                                                            isListQueue
                                                            ? isListQueue
                                                            : undefined
                                                    }
                                                />
                                            </div>
                                        ) : (
                                            <div className={cx('item_format_time')}>
                                                {song.time_format}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }}
        </Media>
    )
}

export default React.forwardRef(PlaylistSong);