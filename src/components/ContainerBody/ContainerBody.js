import classNames from "classnames/bind";
import ButtonEffectPlay from "../Button/config/ButtonEffectPlay";
import { RenderListSong } from "../../container/Feature/HandleEvent";
import Media from "react-media";
import React, { useEffect, useState } from "react";
import BackgroundColor from "../BackgroundColor/BackgroundColor";
import styles from "./ContainerBody.module.scss";
import { ActionBtnAlbum } from "../../container/Feature/ActionBtnAlbum";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sidebarSlice, statusSlice } from "../../redux/sliceReducer";
import { newSongService } from "../../services";


const cx = classNames.bind(styles);

function ContainerBody({ sizes, data = [], isTrack }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data_info = data[data?.length - 1];

    const [dataTrack, setDataTrack] = useState([]);
    const [dataNewSongs, setDataNewSongs] = useState();

    useEffect(() => {
        const fetchNewSong = async () => {
            const result = await newSongService(10)
            setDataNewSongs(result);
            dispatch(statusSlice.actions.isPageLoadingChange(false));
            return result;
        };
        fetchNewSong();
    }, [dispatch]);

    console.log('Check dataNewSongs: ', dataNewSongs);

    return (
        <Media
            queries={{
                mobile: '(max-width: 1199px)',
                desktop: '(min-width: 1200px)'
            }}
        >
            {matches => (
                <>
                    {matches.desktop && (
                        <div className={cx("container_body")}>
                            <BackgroundColor data={data_info?.image_music} linearNoise={true} />
                            <div className={cx("btn-effect")}>
                                <div className={cx("btn-effect-container")}>
                                    <div className={cx("btn-effect_padding")}>
                                        {data && <ButtonEffectPlay primaryColor={'bg_color-primary'} sizes={sizes} data={data} />}
                                        {isTrack ? <ActionBtnAlbum sizes={sizes} song={data_info} playlistSong={true} />
                                            :
                                            <ActionBtnAlbum sizes={sizes} playlistSong={true} />
                                        }
                                    </div>
                                </div>
                                <div className={cx("scroll-horizon")}>
                                    <div className={cx("scroll-horizon-body")}>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("container_body-content")}>
                                {isTrack === true ?
                                    (
                                        <div className={cx("body_content-wrap")}>
                                            <h2 className={cx("body_content-head", "mb-4")}>Lyrics</h2>
                                            <p className={cx("body_content-element")}>No lyrics</p>
                                        </div>
                                    ) : (
                                        <div className={cx("body_content-wrap", "list_song")}>
                                            <h2 className={cx("body_content-head")}>
                                                Popular
                                            </h2>
                                            <RenderListSong
                                                data={data}
                                                isRank={true}
                                                pageChild={true}
                                                isArtists={true}
                                            />
                                        </div>
                                    )}
                                <div className={cx("canonical-pool-top")}>
                                    <div className={cx("canonical_wrap")}>
                                        <div className={cx("body_content-wrap")}>
                                            <span className={cx("body_content-head")}>Recommended</span>
                                            <span className={cx("body_content-element", "pb-4")}>
                                                Based on this song
                                            </span>
                                        </div>
                                        <div className={cx("canonical_container")}>
                                            <RenderListSong
                                                data={dataNewSongs}
                                                pageChild={true}
                                                isArtists={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {matches.mobile && (
                        <div className={cx("container_body")}>
                            <div className={cx("body_background")}></div>
                            <div className={cx("btn-effect")}>
                                <div className={cx("btn-effect-container")}>
                                    <div className={cx("btn-effect_padding")}>
                                        {data && <ButtonEffectPlay sizes={sizes} data={data} />}
                                    </div>
                                </div>
                                <div className={cx("scroll-horizon")}>
                                    <div className={cx("scroll-horizon-body")}>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("list_song")}>
                                <h2 className={cx("list_song-head")}>
                                    Popular
                                </h2>
                                <RenderListSong
                                    data={data}
                                    isRank={true}
                                    pageChild={true}
                                    pageChildrenMobile={true}
                                    isArtists={true}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}

        </Media>
    );
}

export default ContainerBody;