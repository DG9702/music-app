import { useState } from 'react';
//import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './Menu.module.scss';
import { loginSlice, statusSlice } from '../../../../redux/sliceReducer';
import MenuItem from './MenuItem';
import Images from '../../../../components/Images/Images';
import { Eyes, Heart, laptop, rightSquare } from '../../../../components/Icons';
import convertNumber from '../../../../hooks/convertNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faWifi } from '@fortawesome/free-solid-svg-icons';
import { faCircleArrowDown, faComputerSpeaker } from '@cseitz/fontawesome-svg-light';
import Button from '../../../../components/Button/Button';
import { combinedStatusSelector } from '../../../../redux/selector';

const cx = classNames.bind(styles);
function Menu({
    items = [],
    children,
    visible = false,
    placement = 'bottom',
    nestest,
    className,
    isListQueue,
    song,
    device,
    ...props
}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dataUser, isModalPlaylist } = useSelector(combinedStatusSelector);
    const [visiblecheck, setVisible] = useState(false);
    const [animation, setAnimation] = useState('on');
    /* 
    const [currentItem, setCurrentItem] = useState([{ data: items }]); */
    const currentItem = [{ data: items }];
    const lastItemMenu = currentItem[currentItem.length - 1];
    const listRender = nestest ? nestest : lastItemMenu;
    const favorite = convertNumber(song?.favorite);
    const view = convertNumber(song?.view);
    const handleClick = () => {
        if (!nestest) {
            setVisible(!visiblecheck);
        }
    };
    const handleClickOutSide = () => {
        setVisible(false);
    };

    const onHandle = (e, item) => {
        switch (item.type) {
            case 'profile':
                navigate(`/user/${dataUser?.data._id}`);
                setAnimation('off');
                break;
            case 'logout':
                navigate('..');
                dispatch(loginSlice.actions.setAccessToken(""));
                toast.info('Log out succeed')
                break;
            case 'dowload':
                //e.stopPropagation();
                break;
            case 'createPlaylist':
                if (!dataUser.accessToken) {
                    setVisible(visible);
                    dispatch(loginSlice.actions.setIsLogin(true));
                    toast.info('Please login to use this function!');
                } else {
                    dispatch(statusSlice.actions.isModalPlaylist(true));
                    toast.info('Start creating playlist!');
                }
                break;
            default:
                console.log('default');
        }
    };

    const resultSettings = listRender.data.map((item, index) => {
        return <MenuItem key={index} data={item} onHandle={(e) => onHandle(e, item)} />
    })

    const handleResult = (attrs) => {
        return (
            <div className={cx('wrapper', className, device, animation)} {...attrs} tabIndex="-1">
                {song && (
                    <div>
                        <div className={cx('title_song')}>
                            <figure className={cx('img_song')}>
                                <Images src={song.image_music} />
                            </figure>
                            <div className={cx('info_song')}>
                                <span className={cx('name_song')}>{song.name_music}</span>
                                <div className={cx('title_extra')}>
                                    <span className={cx('icon_heart')}>
                                        <Heart /> {favorite}
                                    </span>
                                    <span className={cx('icon_view')}>
                                        <Eyes /> {view}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {device ? (
                    <>
                        <div className={cx("device-wrap")}>
                            <div className={cx("device-container")}>
                                <div className={cx("device-header")}>
                                    <FontAwesomeIcon
                                        icon={faLaptop}
                                        className={cx("device-icon")}
                                    />
                                    <div className={cx("device-header_container")}>
                                        <div className={cx("header-item")}>
                                            <h3>Current device</h3>
                                        </div>
                                        <div className={cx("header-item")}>
                                            <p>This web browser</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx("device-no-found")}>
                                    <span className={cx("no-found-head")}>No another device found</span>
                                    <ul className={cx("not-found-container")}>
                                        <li className={cx("not-found-item")}>
                                            <FontAwesomeIcon
                                                icon={faWifi}
                                                className={cx("notFound-icon")}
                                            />
                                            <div className={cx("device-noFound_container")}>
                                                <span className={cx("device-noFound-item")}>
                                                    Check your Wifi
                                                </span>
                                                <span className={cx("device-noFound-desc")}>
                                                    Connect the devices you’re using to the same WiFi.
                                                </span>
                                            </div>
                                        </li>
                                        <li className={cx("not-found-item")}>
                                            <FontAwesomeIcon
                                                icon={faComputerSpeaker}
                                                className={cx("notFound-icon")}
                                            />
                                            <div className={cx("device-noFound_container")}>
                                                <span className={cx("device-noFound-item")}>
                                                    Play from another device
                                                </span>
                                                <span className={cx("device-noFound-desc")}>
                                                    It will automatically appear here.
                                                </span>
                                            </div>
                                        </li>
                                        <li className={cx("not-found-item")}>
                                            <FontAwesomeIcon
                                                icon={faCircleArrowDown}
                                                className={cx("notFound-icon")}
                                            />
                                            <div className={cx("device-noFound_container")}>
                                                <span className={cx("device-noFound-item")}>
                                                    Switch to the Spotify app
                                                </span>
                                                <span className={cx("device-noFound-desc")}>
                                                    The app can detect more devices.
                                                </span>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className={cx('menu_items')}>{resultSettings}</ul>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <ul className={cx('menu_items')}>{resultSettings}</ul>

                )}


            </div>
        );
    };
    return (
        <Tippy
            interactive
            appendTo={document.body}
            visible={visible || visiblecheck}
            delay={[1000, 100]}
            zIndex={99999}
            placement={placement}
            offset={song ? (isListQueue ? [20, 20] : [20, 180]) : (device ? [20, 0] : [20, 15])} // check is menu of song playlist
            {...props}
            onClickOutside={handleClickOutSide}
            render={handleResult}
        >
            <span onClick={handleClick}>{children}</span>
        </Tippy>
    );
}

export default Menu;
