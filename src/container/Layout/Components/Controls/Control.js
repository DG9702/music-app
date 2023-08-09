import React, { useEffect, useState } from 'react';
import Media from 'react-media';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Control.module.scss';
import ControlLeft from './ControlLeft';
import ControlCenter from './ControlCenter';
import ControlRight from './ControlRight';
import { statusSlice } from '../../../../redux/sliceReducer';
import { combinedStatusSelector } from '../../../../redux/selector';
import ControlMobile from './Mobile/ControlMobile';
import ControlMobileOrTablet from './Mobile/ControlMobileOrTablet';
import { prominent, average } from "color.js";

const cx = classNames.bind(styles);
function Control() {
    const dispatch = useDispatch();
    const [colors, setColors] = useState();
    const { isControlMusicMobile, isPlayerQueue, songCurrent } = useSelector(combinedStatusSelector);

    const handleOpenControl = (e) => {
        if (isPlayerQueue) {
            dispatch(statusSlice.actions.isPlayerQueue(false));
        }
        dispatch(statusSlice.actions.isControlMusicMobile(true));
    };

    useEffect(() => {
        if (songCurrent) {
            average(songCurrent?.image_music).then((color) => {
                setColors(`rgba(${color.join(',')})`);
            })
        }
    })


    return (
        <Media
            queries={{
                small: '(max-width: 1199px)',
                large: '(min-width: 1201px)',
            }}
        >
            {(matches) => (
                <>
                    {matches.small && (
                        isControlMusicMobile ? (
                            <ControlMobile />
                        ) : (
                            <div
                                className={cx('mobile')}
                                style={{ backgroundColor: colors }}
                                onClick={(e) => handleOpenControl(e)}
                            >
                                <ControlMobileOrTablet />
                            </div>
                        )

                    )}
                    {matches.large && (
                        <div className={cx("wrapper")}>
                            <div className={cx("control-container")}>
                                <ControlLeft />
                                <ControlCenter />
                                <ControlRight />
                            </div>
                        </div>
                    )}
                </>
            )}
        </Media>
    );
}

export default Control;
