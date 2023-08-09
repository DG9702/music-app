import classNames from "classnames/bind";
import styles from "./ControlMobile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { combindStatusRadio, combinedStatusSelector } from "../../../../../redux/selector";
import React, { useState } from "react";
import { statusSlice } from "../../../../../redux/sliceReducer";
import convertNumber from "../../../../../hooks/convertNumber";
import styled from "styled-components";
import { ArrowDown, HeadPhone } from "../../../../../components/Icons";
import Images from "../../../../../components/Images/Images";
import ControlCenter from "../ControlCenter";
import { ActionBtnAlbum } from "../../../../Feature/ActionBtnAlbum";

const cx = classNames.bind(styles);

function ControlMobile() {
    const dispatch = useDispatch();
    const { songCurrent, isPlaying, isControlMusicMobile } =
        useSelector(combinedStatusSelector);
    const { isPlayingRadio, urlRadio, radioDetails } = useSelector(combindStatusRadio);

    const [animation, setAnimation] = useState('on');

    const handleCloseModalControl = async (ms) => {
        setAnimation('off');
        await new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
        dispatch(statusSlice.actions.isControlMusicMobile(false));
        setAnimation('on');
    };
    const listener = convertNumber(
        urlRadio ? radioDetails.activeUsers : songCurrent?.view,
    );
    const Background = styled.div`
        position: absolute;
        inset: 0;
        filter: blur(40px);
        object-fit: cover;
        background: url(${urlRadio ? radioDetails.thumbnail : songCurrent?.image_music})
            center center/cover no-repeat;
        z-index: -1;
    `;
    return (
        isControlMusicMobile && (
            <div className={cx('wrapper', animation)}>
                <Background />
                <div className={cx('inner')}>
                    <span
                        className={cx('btn_close_control')}
                        onClick={() => handleCloseModalControl(700)}
                    >
                        <ArrowDown />
                    </span>
                    <div className={cx('title_song_section')}>
                        <figure
                            className={cx(
                                'song_img',
                            )}
                        >
                            <Images
                                src={
                                    urlRadio
                                        ? radioDetails.thumbnailH
                                        : songCurrent?.image_music
                                }
                            />
                        </figure>
                        <div className={cx('title_main')}>
                            <span className={cx('name_song')}>
                                {urlRadio ? radioDetails.title : songCurrent?.name_music}
                            </span>
                            <span className={cx('name_singer')}>
                                {songCurrent?.name_singer}
                            </span>
                            <span className={cx('btn_headphone')}>
                                <HeadPhone />{' '}
                                {urlRadio ? `${listener} người đang nghe` : listener}
                            </span>
                        </div>
                    </div>
                    <div className={cx('controls_main')}>
                        <ControlCenter isControlModal />
                        {!urlRadio && (
                            <div className={cx('btn_handle')}>
                                <ActionBtnAlbum
                                    playlistSong
                                    song={songCurrent}
                                    modalControls
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}

export default React.memo(ControlMobile);