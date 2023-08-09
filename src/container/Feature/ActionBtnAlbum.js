/* eslint-disable no-unreachable */
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Download, Heart, HeartFull, More, Play, showPicture } from "../../components/Icons";
import { combindStatusRadio, combinedStatusSelector } from "../../redux/selector";
import { useEffect, useState } from "react";
import { createSongFavoriteUser, createSongHistoryUser, getSongFavorite, getSongHistory, removeSongFavoriteUser } from "../../services/userService";
import { toast } from "react-toastify";
import { featureSlice, loginSlice, radioSlice, statusSlice } from "../../redux/sliceReducer";
import WaveSong from "../../components/Icons/WaveSong/Wavesong";
import Button from "../../components/Button/Button";
import Menu from "../Layout/Components/Menu"
import styles from "./PlaylistSong.module.scss";

const cx = classNames.bind(styles);

export const ActionBtnAlbum = ({
    item,
    isLivingAlbum,
    singleBtn,
    song,
    data,
    HomePageTrending,
    playlistSong,
    isListQueue,
    sizeTablet,
    modalControls,
    sizes
}) => {
    const dispatch = useDispatch();

    const { slugDataBanner, dataSongs, isPlaying, songCurrent, dataUser } = useSelector(combinedStatusSelector)
    const { isPlayingRadio } = useSelector(combindStatusRadio);
    const isSlugCategory = slugDataBanner === item?.slug_banner_album_hot;
    const isSlugNameSinger = slugDataBanner === item?.slug_banner_singer_popular;

    const isSlugCategoryCurrent = songCurrent?.slug_category === item?.slug_banner_album_hot;
    const isSlugNameSingerCurrent = songCurrent?.slug_name_singer === item?.slug_banner_singer_popular;

    const [isFavorite, setIsFavorite] = useState();

    const [isMore, setIsMore] = useState(false);
    const [callData, setCallData] = useState(false);
    //Handle event
    const addSongFavorite = async () => {
        const result = await createSongFavoriteUser(dataUser.accessToken, song._id);
        return result;
    };
    const removeSongFavorite = async () => {
        const result = await removeSongFavoriteUser(dataUser.accessToken, song._id);
        return result;
    };

    const handleLike = async () => {
        if (playlistSong) {
            if (dataUser.listFavorite && dataUser.accessToken) {
                if (isFavorite) {
                    await removeSongFavorite();
                    setIsFavorite(false);
                    toast.info('Remove from library liked Song ');
                } else {
                    await addSongFavorite();
                    setIsFavorite(true); // update list song when handleChange like
                    toast.info("Add to your liked Song");
                }
                setCallData(true);
            } else {
                dispatch(loginSlice.actions.setIsLogin(true));
                setIsFavorite(false);
                toast.info('Please login to use this function');
            }
        }
    };
    const handleSelectMoreSong = () => {
        setIsMore(true);
    };


    const BUTTON_HOVER = [
        {
            extraTitle: isFavorite ? 'remove from your library' : 'Save to your library',
            icon: isFavorite ? HeartFull : Heart,
            circle_hide: true,
            type: 'like',
        },
        {
            icon:
                (isSlugCategory && isSlugCategoryCurrent && isPlaying) ||
                    (isSlugNameSinger && isSlugNameSingerCurrent && isPlaying)
                    ? WaveSong
                    : Play,
            border: true,
            border_nothover: true,
            type: 'play',
        },
        {
            extraTitle: 'More',
            icon: More,
            circle_hide: true,
            type: 'more',
        },
    ];

    const MENU_SELECT = [
        {
            title: 'Download',
            type: 'download',
            icon: Download,
        },
        {
            title: 'Picture in picture',
            type: 'picture',
            icon: showPicture,
        },
    ];

    const onHandle = (e, btn) => {
        if (
            (isSlugCategory && isSlugCategoryCurrent && !isPlayingRadio) ||
            (isSlugNameSinger && isSlugNameSingerCurrent && !isPlayingRadio)
        ) {
            // check itemcurrent and item saved in album

            e.preventDefault();
            switch (btn.type) {
                case 'play':
                    return (
                        dispatch(radioSlice.actions.setIsPlayingRadio(false)) &&
                        dispatch(statusSlice.actions.isPlayingChange(!isPlaying))
                    );
                case 'more':
                    e.stopPropagation();
                    handleSelectMoreSong();
                    break;
                default:
                    console.log('default');
            }
        } else {
            switch (btn.type) {
                case 'play':
                    if (isLivingAlbum) {
                        const randomID = Math.floor(Math.random() * data?.length);
                        /*check action in home page  ? if true will update data new song , if false will request play and 
                        dispath data to album
                         */
                        if (data.length > 0) {
                            return (
                                dispatch(featureSlice.actions.setCurrentID(randomID)) &&
                                dispatch(
                                    featureSlice.actions.setSongCurrent(data[randomID]),
                                ) &&
                                dispatch(featureSlice.actions.setDataSongs(data)) &&
                                dispatch(statusSlice.actions.isPlayingChange(true))
                            );
                        }
                    } else {
                        return dispatch(statusSlice.actions.isRequirePlayChange(true));
                    }
                    //handleRecently();
                    break;
                case 'like':
                    e.preventDefault();
                    e.stopPropagation();
                    handleLike();
                    break;
                case 'more':
                    e.stopPropagation();
                    e.preventDefault();
                    handleSelectMoreSong();
                    break;
                default:
                    console.log('default');
            }
        }
    };


    const renderBtnHover = () => {
        const result = BUTTON_HOVER.map((btn, index) => {
            const shouldRenderButton = !singleBtn || btn.type === 'play';

            if (playlistSong) {
                if (HomePageTrending) {
                    if (btn.type === "more") {
                        return (
                            <div key={index}>
                                <Button
                                    Icons={btn.icon}
                                    sizes={sizes}
                                    extraTitle={btn.extraTitle}
                                    circle_hide={btn.circle_hide}
                                    border_nothover={btn.border_nothover}
                                    title={item?.title}
                                    onHandle={(e) => onHandle(e, btn)}

                                />
                                {isMore && (
                                    <Menu
                                        items={MENU_SELECT}
                                        visible={true}
                                        placement="top-start"
                                        song={song}
                                    />
                                )}
                            </div>
                        );
                    }
                } else if (sizeTablet) {
                    if (btn.type === 'like') {
                        return (
                            <div key={index}>
                                <Button
                                    active={isFavorite && btn.type === 'like'}
                                    Icons={btn.icon}
                                    sizes={sizes}
                                    extraTitle={btn.extraTitle}
                                    circle_hide={btn.circle_hide}
                                    border_nothover={btn.border_nothover}
                                    title={item?.title}
                                    onHandle={(e) => onHandle(e, btn)}

                                />
                                {isMore && (
                                    <Menu
                                        items={MENU_SELECT}
                                        visible={true}
                                        placement="top-start"
                                        song={song}
                                    />
                                )}
                            </div>
                        );
                    }
                } else if (btn.type === 'more' || btn.type === 'like') {
                    return (
                        <div key={index} onMouseLeave={() => setIsMore(false)}>
                            <Button
                                active={isFavorite && btn.type === 'like'}
                                Icons={btn.icon}
                                sizes={sizes}
                                modalControls={modalControls}
                                extraTitle={btn.extraTitle}
                                circle_hide={btn.circle_hide}
                                border_nothover={btn.border_nothover}
                                title={item?.title}
                                onHandle={(e) => onHandle(e, btn)}
                                isListQueue={isListQueue}
                                className={cx('btn_gallery', 'btn_action')}
                            />
                            {isMore && btn.type === 'more' && (
                                <Menu
                                    items={MENU_SELECT}
                                    visible={true}
                                    placement="top-start"
                                    song={song}
                                    isListQueue={isListQueue}
                                />
                            )}
                        </div>
                    );
                }
            } else if (btn.type === 'play') {
                if (shouldRenderButton) {
                    // render full btn
                    return (
                        <div key={index}>
                            <Button
                                active={isFavorite && btn.type === 'like'}
                                Icons={btn?.icon}
                                sizes={sizes}
                                extraTitle={btn?.extraTitle}
                                circle_hide={btn?.circle_hide}
                                border_nothover={btn?.border_nothover}
                                title={item?.title}
                                onHandle={(e) => onHandle(e, btn)}

                                circle
                            />
                        </div>
                    );
                };
            };
            return null;
        });
        return result;
    };

    useEffect(() => {
        if (
            !dataUser.listFavorite ||
            dataUser.listFavorite.length === 0 ||
            !dataUser.accessToken
        ) {
            // Nếu danh sách yêu thích rỗng thì không có bài hát nào trong danh sách yêu thích
            setIsFavorite(false);
            return;
        }
        // Kiểm tra xem bài hát có nằm trong danh sách yêu thích hay không
        const isSongFavorite = dataUser.listFavorite.some(
            (item) => item?._id === song?._id,
        );
        setIsFavorite(isSongFavorite);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser.listFavorite.length, song, dataUser.accessToken]);

    useEffect(() => {
        //getDataSongFavorite of user
        if (callData) {
            const fetch = async () => {
                const result = await getSongFavorite(dataUser.accessToken);
                if (result.data) {
                    const dataMusic = result.data.map((song) => song.music);
                    dispatch(loginSlice.actions.setListSongFavorite(dataMusic));
                }
            };
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFavorite, callData]);

    return renderBtnHover();
}