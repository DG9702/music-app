import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ListQueue, Mute, Mv, UnMute, Volumn, VolumnOff, connectDevice } from "../../../../components/Icons/icons";
import { combinedStatusSelector } from "../../../../redux/selector";
import InputProgress from "../InputProgress/InputProgress";
import Button from "../../../../components/Button/Button";
import Media from "react-media";
import { statusSlice } from "../../../../redux/sliceReducer";
import Menu from "../Menu/Menu";
import { CONNECT_DEVICE, MENU_USER_HEADER } from "../../../../redux/constant";


const cx = classNames.bind(styles);

function ControlRight() {
    const dispatch = useDispatch();
    const [style, setStyles] = useState(false);
    const { isVolume, songCurrent, isPlayerQueue } = useSelector(combinedStatusSelector);

    const CONTROL_BTNS_RIGHT = [
        {
            data: [
                {
                    icon: Mv,
                    disable: songCurrent?.link_mv ? false : true,
                    type: 'mv',
                    extraTitle: 'Enable MV',
                },
                {
                    icon: ListQueue,
                    type: 'Queue',
                    extraTitle: 'Queue',
                },
                {
                    icon: connectDevice,
                    type: 'Multi',
                    extraTitle: 'Connect to a device',
                },
                {
                    icon: isVolume ? Mute : UnMute,
                    type: 'volume',
                    extraTitle: 'Mute',
                },

            ],
        },
    ];

    const handle = (action) => {
        switch (action) {
            case 'volume':
                dispatch(statusSlice.actions.isVolumeChange(!isVolume));
                break;
            case 'mv':
                dispatch(statusSlice.actions.isMvPlayerChange(true));
                dispatch(statusSlice.actions.isPlayingChange(false));
                break;
            default:
                console.log('default');
        }
    };

    const handleListQueue = (e) => {
        e.stopPropagation();
        // handle queue list song
        if (isPlayerQueue) {
            dispatch(statusSlice.actions.isCheckBeforeContentHide(true));
            setTimeout(() => {
                dispatch(statusSlice.actions.isPlayerQueue(false));
                dispatch(statusSlice.actions.isCheckBeforeContentHide(false));
            }, 500);
        } else {
            dispatch(statusSlice.actions.isPlayerQueue(true));
        }
    };

    const lastData = CONTROL_BTNS_RIGHT[CONTROL_BTNS_RIGHT.length - 1].data;

    const classes = style ? 'blur_input' : '';

    const renderBtnsRight = () => {
        const result = lastData.map((item, index) => {
            return (
                <Media query="(max-width: 1100px)" key={index}>
                    {(matches) => {
                        return (
                            <div
                                className={cx('controls_item')}
                                onMouseOver={() => {
                                    if (item.type === 'volume') {
                                        setStyles(true);
                                    }
                                }}
                            >
                                {item.type === 'Multi' ? (
                                    <Menu
                                        device={"device"}
                                        visible={false}
                                        items={CONNECT_DEVICE}
                                    >
                                        <Button
                                            circle_hide
                                            Icons={item.icon}
                                            disable={item.disable}
                                            extraTitle={!matches && item.extraTitle}
                                            onHandle={() => handle(item.type)}
                                        />
                                    </Menu>
                                ) : (
                                    <>
                                        <Button
                                            circle_hide
                                            Icons={item.icon}
                                            disable={item.disable}
                                            extraTitle={!matches && item.extraTitle}
                                            onHandle={() => handle(item.type)}
                                        />
                                        {item.type === 'volume' && (
                                            <div
                                                className={cx(
                                                    'player_input_vol',
                                                    matches && style
                                                        ? 'inputVolumeTablet'
                                                        : matches && !style && 'inputVolumeOff',
                                                    // custom volume in tablet
                                                )}
                                                onMouseOut={() => {
                                                    setStyles(false);
                                                }}
                                            >
                                                <InputProgress
                                                    classes={classes}
                                                    volumeType={true}
                                                    max={10}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    }}
                </Media>
            );
        });

        return result;
    }

    return (
        <div className={cx("control-right")}>
            <Fragment>
                <div className={cx('player_controls_right_container')}>
                    {renderBtnsRight()}
                </div>
            </Fragment>
        </div>
    )
}

export default ControlRight;