import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import { featureSlice, radioSlice, statusSlice } from '../../../../redux/sliceReducer';
import InputProgress from "../InputProgress/InputProgress";
import { Loading, Next, Pause, Play, Prev, Random, Repeat, randomSpotify } from "../../../../components/Icons/icons";
import { combindStatusRadio, combinedFeatureSelector, combinedStatusSelector } from "../../../../redux/selector";
import Button from "../../../../components/Button/Button";
import styles from "./Control.module.scss";
import { useAudio, useTimes } from "../../../../hooks";
const cx = classNames.bind(styles);

function ControlCenter({
    isMobile,
    isControlModal, //style modal mobile
}) {
    const dispatch = useDispatch();
    const { isPlaying, isRandom, isRepeat, dataSongs, isLoading, songCurrent } =
        useSelector(combinedStatusSelector);
    const { times } = useSelector(combinedFeatureSelector);
    const { isPlayingRadio, urlRadio, radioDetails } = useSelector(combindStatusRadio);

    let { currentIndex } = useSelector(combinedStatusSelector);
    //times display
    const audioRef = useAudio();

    const timeRemain = useTimes(times.currentTime);
    const [randomIndex, setRandomIndex] = useState([]);
    const list = new Set(randomIndex); // List save random currentIndex and reset at full
    //handleChangeIndex main
    const handleSetIndexChange = (currentIndex) => {
        dispatch(statusSlice.actions.isPlayingChange(true));
        dispatch(featureSlice.actions.setCurrentID(currentIndex));
        dispatch(featureSlice.actions.setSongCurrent(dataSongs[currentIndex]));
    };
    //handle random
    const handleRandom = (index) => {
        let random;
        const songsLength = dataSongs.length;
        do {
            random = Math.ceil(Math.random() * dataSongs.length);
            setRandomIndex((prev) => [...prev, random]);
        } while (list.has(random));
        currentIndex = random;
        setRandomIndex((prev) => [...prev, index]);

        if (list.size === songsLength - 1) {
            setRandomIndex([]);
        }
    };



    // custom handle with type
    const handleControlMain = (type, e) => {
        e.preventDefault();
        e.stopPropagation();

        switch (type) {
            case 'play':
                urlRadio
                    ? dispatch(radioSlice.actions.setIsPlayingRadio(!isPlayingRadio))
                    : dispatch(statusSlice.actions.isPlayingChange(!isPlaying));

                break;
            case 'next':
                if (currentIndex < dataSongs.length - 1) {
                    isRandom ? handleRandom(currentIndex) : currentIndex++;
                } else {
                    currentIndex = 0;
                }
                handleSetIndexChange(currentIndex);
                break;
            case 'prev':
                if (currentIndex > 0) {
                    isRandom ? handleRandom(currentIndex) : currentIndex--;
                } else {
                    currentIndex = dataSongs.length - 1;
                }
                handleSetIndexChange(currentIndex);
                break;
            case 'repeat':
                dispatch(statusSlice.actions.isRepeatChange(!isRepeat));
                break;
            case 'random':
                dispatch(statusSlice.actions.isRandomChange(!isRandom));
                break;
            default:
                console.log('default');
        }
    };
    // control main handle
    const CONTROL_BTNS_CENTER = [
        {
            data: [
                {
                    icon: Random,
                    active: isRandom ? true : false,
                    extraTitle: isRandom ? 'Disable shuffle' : 'Enable on shuffle',
                    type: 'random',
                    disable: urlRadio ? true : false,
                },
                {
                    icon: Prev,
                    type: 'prev',
                    extraTitle: 'Previous',
                    disable: urlRadio ? true : false,
                },
                {
                    icon: urlRadio
                        ? isPlayingRadio
                            ? Pause
                            : Play
                        : isPlaying && !isLoading
                            ? Pause
                            : Play,
                    iconLoading: isLoading ? Loading : undefined,
                    border: true,
                    circle_hide: true,
                    type: 'play',
                },

                {
                    icon: Next,
                    type: 'next',
                    extraTitle: 'Next',
                    disable: urlRadio ? true : false,
                },
                {
                    icon: Repeat,
                    active: isRepeat ? true : false,
                    extraTitle: !isRepeat ? 'Enable repeat' : 'Disable repeat',
                    type: 'repeat',
                    disable: urlRadio ? true : false,
                },
            ],
        },
    ];
    // play pause
    useEffect(() => {
        if (audioRef?.current.src) {
            if (isPlaying) {
                audioRef?.current.play();
            } else {
                audioRef?.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        localStorage.setItem('isRandom', JSON.stringify(isRandom));
    }, [isRandom]);

    useEffect(() => {
        localStorage.setItem('isRepeat', JSON.stringify(isRepeat));
    }, [isRepeat]);

    const lastData = CONTROL_BTNS_CENTER[CONTROL_BTNS_CENTER.length - 1].data;
    const renderControlsBtn = lastData.map((btn, currentIndex) => {
        const isCircleHide = btn.circle_hide;
        const btnOnMobile =
            btn.type === 'play';
        //'next' || btn.type === 'prev' || btn.type ===
        return isMobile ? (
            btnOnMobile && (
                <Button
                    circle_hide={true}
                    extraTitle={btn.extraTitle}
                    isLoading={btn.iconLoading ? true : false}
                    Icons={btn.iconLoading || btn.icon}
                    key={currentIndex}
                    active={btn.active}
                    onHandle={(e) => handleControlMain(btn.type, e)}
                    disable={btn.disable}

                />
            )
        ) : (
            <Button
                circle_hide={isCircleHide ? false : true}
                border={btn?.border}
                modalControls={isControlModal}
                borderFixPlay={btn?.borderFixPlay} // fix play center
                extraTitle={btn.extraTitle}
                isLoading={btn.iconLoading ? true : false}
                Icons={btn.iconLoading || btn.icon}
                key={currentIndex}
                active={btn?.active}
                disable={btn.disable}
                onHandle={(e) => handleControlMain(btn.type, e)}
            />
        );
    });
    return isControlModal ? (
        <div className={cx("control-center")}>
            <div className={cx('player_controls_center_container')}>
                {!urlRadio && (
                    <div className={cx('player-control_button')}>
                        <div className={cx('player-bar')}>
                            <div className={cx('progress_container')}>
                                <InputProgress max={100} step={1} audioType={true} />
                            </div>
                            <div className={cx("time")}>
                                <span className={cx('player_time-element')}>{timeRemain} </span>
                                <span className={cx('player_time-element')}>{songCurrent?.time_format}</span>
                            </div>
                        </div>
                    </div>
                )}
                <div className={cx('controls', 'modalControls')}>{renderControlsBtn}</div>
            </div>
        </div>
    ) : (
        <div className={cx("control-center")}>
            <div className={cx('player_controls_center_container')}>
                <div className={cx('controls')}>{renderControlsBtn}</div>
                {!isMobile && !urlRadio && (
                    <div className={cx('player-control_button')}>
                        <div className={cx('player-bar')}>
                            <span className={cx('player_time-element')}>{timeRemain} </span>

                            <div className={cx('progress_container')}>
                                <InputProgress max={100} step={1} audioType={true} />
                            </div>

                            <span className={cx('time_end')}>{songCurrent?.time_format}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default React.memo(ControlCenter);