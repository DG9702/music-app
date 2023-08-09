/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Media from "react-media";
import Button from '../Button';
import {
    ArrowChevronLeft,
    ArrowChevronRight,
    BarSort,
    ButtonTheme,
    Close,
    SearchMobile,
    logoIcons
} from '../Icons';
import { loginSlice, statusSlice } from '../../redux/sliceReducer';
import styles from "./Header.module.scss";
import { combinedStatusSelector } from '../../redux/selector';
import Menu from '../../container/Layout/Components/Menu/Menu';
import { MENU_USER_HEADER } from '../../redux/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import MenuHeader from './MenuHeader';
import { toast } from 'react-toastify';
import Form from '../Form/Form';

const cx = classNames.bind(styles);

function Header({ styles, isScrollHeader, isScrollAccountPage }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const btnSearchRef = useRef();
    const { dataUser, isLogin } = useSelector(combinedStatusSelector);

    const [showMenuHeader, setShowMenuHeader] = useState(false);
    const [animation, setAnimation] = useState('on');
    const [isLoginForm, setIsLoginForm] = useState(isLogin);

    const hostsIdx = window.history.state.idx;
    const hostLength = window.history.length;

    const handleLogin = () => {
        dispatch(loginSlice.actions.setIsLogin(true));
    }

    const handleShowMenuHeader = async (e) => {
        //  set animation delay
        e.stopPropagation();
        setAnimation('off');
        await new Promise((resolve) => {
            setTimeout(resolve, showMenuHeader && 300);
        });

        setShowMenuHeader(!showMenuHeader);
        setAnimation('on');
    };

    const handleCloseMenu = async (e) => {
        e.stopPropagation();
        setAnimation('off');
        await new Promise((resolve) => {
            setTimeout(resolve, showMenuHeader && 300);
        });

        setShowMenuHeader(false);
        setAnimation('on');
    };

    const handleLogout = () => {
        navigate('..');
        dispatch(loginSlice.actions.setAccessToken(""));
        toast.info('Log out succeed');
    }

    const handleSignup = () => {
        dispatch(loginSlice.actions.setIsLogin(true));
        setIsLoginForm(isLoginForm);
        console.log('Signup success', isLogin);
    }

    const handleToProfile = () => {
        setAnimation('off');
        navigate(`/user/${dataUser?.data._id}`);

        setShowMenuHeader(false);
        setAnimation('on');
    }

    return (
        <Media query="(max-width: 1199px)">
            {(matches) => {
                return matches ? (
                    //Tablet and Mobile
                    <header
                        className={cx(
                            'wrapper',
                            styles,
                            isScrollAccountPage === true ? (isScrollHeader > 333 ? 'isScroll' : '')
                                : (isScrollHeader > 133 ? 'isScroll' : ''),
                            dataUser.accessToken ? '' : 'not-log'
                        )}
                    >
                        <div
                            className={cx('inner')}
                        //onClick={(e) => handleTurnOffMenuForm(e)}
                        >
                            <div className={cx('button_controls_left')}>
                                <Link to="/" className={cx('logo')}>
                                    <Button
                                        Icons={logoIcons}
                                    />
                                    <span>Spotify</span>
                                </Link>
                            </div>

                            <div className={cx('button_controls_right')}>
                                <span

                                    className={cx('btn_search_header_mobile')}

                                >
                                    <SearchMobile />
                                </span>
                                <Button
                                    primary
                                    sizes="normal"
                                    extraTitle={'Open App'}
                                >
                                    Open App
                                </Button>
                                <span
                                    //ref={btnSearchRef}
                                    className={cx('btn_barsort')}
                                    //onClick={handleShowMenuHeader}
                                    onClick={handleShowMenuHeader}
                                >
                                    <BarSort />
                                </span>
                                {showMenuHeader && (
                                    <div className={cx("menuBars", animation)}>
                                        <div className={cx("close")}
                                            onClick={handleCloseMenu}
                                        >
                                            <Close />
                                        </div>
                                        <div>
                                            <MenuHeader
                                                handleLogin={handleLogin}
                                                handleLogout={handleLogout}
                                                handleToProfile={handleToProfile}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </header>
                ) : (
                    //desktop
                    <>
                        <header
                            className={cx(
                                'wrapper',
                                styles,
                                //isScrollHeader > 333 ? 'isScroll' : '',
                                isScrollAccountPage === true ? (isScrollHeader > 333 ? 'isScroll' : '')
                                    : (isScrollHeader > 133 ? 'isScroll' : ''),
                                dataUser.accessToken ? '' : 'not-log'
                            )}
                        >
                            <div className={cx('inner')}>
                                <div className={cx('button_controls_left')}>
                                    <span
                                        className={cx(
                                            'icon-arrow-prev',
                                            hostsIdx === 0 && 'disabled',
                                        )}
                                        onClick={() => hostsIdx > 0 && navigate(-1)}
                                    >
                                        <ArrowChevronLeft />
                                    </span>
                                    <span
                                        className={cx(
                                            'icon-arrow-next',
                                            hostsIdx === hostLength - 2 && 'disabled',
                                        )}
                                        onClick={() => navigate(1)}
                                    >
                                        <ArrowChevronRight />
                                    </span>

                                </div>
                                <div className={cx('button_controls_right')}>
                                    {dataUser.accessToken ? (
                                        <>
                                            <Button
                                                primary
                                                sizes="normal"
                                                extraTitle={'Upgrate Premium'}
                                            >
                                                Explore Premium
                                            </Button>
                                            <Button
                                                blackPrimary
                                                sizes="normal"
                                                extraTitle={'Install App'}
                                            >
                                                Install App
                                            </Button>
                                            <Button className={cx('btn-user')} blackPrimary >
                                                <Menu items={MENU_USER_HEADER} visible={false}>
                                                    <FontAwesomeIcon className={cx('avatar')} icon={faUser} />
                                                </Menu>
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button sizes="normal">
                                                Premium
                                            </Button>
                                            <Button

                                            >
                                                Support
                                            </Button>
                                            <Button

                                            >
                                                Download
                                            </Button>
                                            <div className={cx("brick")}>
                                                <div className={cx("brick-content")}>

                                                </div>
                                            </div>
                                            <div className={cx("log")}>
                                                <Button
                                                    className={cx("signup")}
                                                    onHandle={handleSignup}
                                                >
                                                    Sign up
                                                </Button>
                                                <Button
                                                    primary
                                                    onHandle={handleLogin}
                                                    className={cx("btn-login")}
                                                >
                                                    Log in
                                                </Button>
                                            </div>
                                        </>
                                    )}


                                </div>


                            </div>
                        </header>
                    </>
                );
            }}
        </Media>
    )
}

export default React.memo(Header);
//export default Header;