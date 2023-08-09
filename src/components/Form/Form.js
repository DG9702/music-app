import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import isEmpty from 'validator/lib/isEmpty';
import Button from '../Button';
import { Close, Loading } from "../Icons";
import styles from "./Form.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { combinedStatusSelector } from '../../redux/selector';
import { useEffect, useRef, useState } from 'react';
import { loginSlice } from '../../redux/sliceReducer';
import { getUserLogin, setUserRegister } from '../../services/userService';

const cx = classNames.bind(styles);

function Form() {
    const dispatch = useDispatch();
    const btnEnterRef = useRef();
    const { isLogin } = useSelector(combinedStatusSelector);
    //login
    const [isLoginForm, setIsLoginForm] = useState(isLogin);
    const [validMsgError, setValidMsgError] = useState({});
    //loading
    const [isLoadingForm, setLoadingForm] = useState(false);
    //value input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [user, setUser] = useState('');

    const onChangeForm = () => {
        setIsLoginForm(!isLoginForm);
        setValidMsgError(false);
        setUser('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    }

    const handleCloseForm = () => {
        dispatch(loginSlice.actions.setIsLogin(false));

    };

    const handleCloseSign = () => {
        dispatch(loginSlice.actions.setIsLogin(false));

    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, email: '' }
            });
        }
    };

    const onChangeUserName = (e) => {
        setUser(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, user: '' }
            });
        }
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, password: '' }
            });
        }
    };

    const onChangePassWordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
        if (e.target.value) {
            setValidMsgError((prev) => {
                return { ...prev, passwordConfirm: '' };
            });
        }
    };

    const validator = () => {
        const msg = {};
        if (isLoginForm) {
            if (isEmpty(email)) {
                msg.email = 'Vui lòng nhập email';
            } else {
                const regexEmail = new RegExp(
                    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                );
                if (!regexEmail.test(email)) msg.email = 'Trường này không phải email. Vui Lòng Nhập Đúng Email';
            }
            if (isEmpty(password)) {
                msg.password = 'Vui lòng nhập mật khẩu';
            } else {
                const regexPassword = new RegExp('^[a-zA-Z0-9]{8,}$');
                if (!regexPassword.test(password))
                    msg.password = 'Mật khẩu phải chứa đủ 8 kí tự';
            }
        } else {
            if (isEmpty(password)) {
                msg.password = 'Vui lòng nhập mật khẩu';
            } else {
                const regexPassword = new RegExp('^[a-zA-Z0-9]{8,}$');
                if (!regexPassword.test(password))
                    msg.password = 'Mật khẩu phải chứa đủ 8 kí tự';
            }

            if (isEmpty(passwordConfirm)) {
                msg.passwordConfirm = 'Vui lòng xác nhận mật khẩu';
            } else {
                if (passwordConfirm !== password) {
                    msg.passwordConfirm = 'Mật khẩu không chính xác';
                }
            }

            if (isEmpty(user?.trim())) {
                msg.user = 'Vui lòng nhập user';
            } else {
                //const regexUser = new RegExp('^[a-z0-9_-]{8,20}$');
                //if (!regexUser.test(user)) msg.user = 'User phải từ 8 - 20 kí tự';
            }

            if (isEmpty(email)) {
                msg.email = 'Vui lòng nhập email';
            } else {
                const regexEmail = new RegExp(
                    '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$',
                );
                if (!regexEmail.test(email)) msg.email = 'Vui Lòng Nhập Đúng Email';
            }
        }

        setValidMsgError(msg);
        if (Object.keys(msg).length > 0) return false;

        if (isLoginForm) return true;
        return true;
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const isValid = validator();
        if (!isValid) return;

        const fetchSubmit = async () => {
            setLoadingForm(true);
            try {
                await setUserRegister(user, passwordConfirm, email);

                toast.success('Tạo tài khoản thành công !!!');
                setIsLoginForm(true);
                window.location.reload();
            } catch (error) {
                if (error.response.status === 400) {
                    toast.info('Tài khoản đã tồn tại !!!');
                }
            }
            setLoadingForm(false);
        };
        fetchSubmit();
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const isValid = validator();

        if (!isValid) return;

        const fetchLogin = async () => {
            setLoadingForm(true);
            try {
                const response = await getUserLogin(email, password);
                dispatch(loginSlice.actions.setDataUser(response.data));
                dispatch(loginSlice.actions.setAccessToken(response.accessToken));
                toast.success('Đăng nhập thành công !!!');
                window.location.reload();
            } catch (err) {
                if (err.response.status === 400) {
                    toast.error('Sai tên đăng nhập hoặc mật khẩu !!!');
                }
            }
            setLoadingForm(false);
        };

        fetchLogin();
    };

    useEffect(() => {
        //enter to submit form
        const handlePressKeyEnter = (e) => {
            if (e.key === 'Enter') {
                btnEnterRef.current.click();
            }
        };
        window.addEventListener('keyenter', handlePressKeyEnter);

        return () => window.removeEventListener('keyenter', handlePressKeyEnter);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-section')}>
                <h3 className={cx('title_form')}>
                    {isLoginForm ? "Log in to music app" : "Sign up for free to start listening"}
                    <span
                        className={cx('btn_close')}
                        onClick={isLoginForm ? handleCloseForm : handleCloseSign}
                    >
                        <Button circle Icons={Close} />
                    </span>
                </h3>
                <form className={cx('form-container')}
                    onSubmit={(e) => (isLoginForm ? handleLogin(e) : handleOnSubmit(e))}
                >
                    {isLoginForm ? (
                        <div className={cx('form')}>
                            <div className={cx("form-input")}>
                                <label className={cx("form-label")} htmlFor="email">Email</label>
                                <input type="email"
                                    id="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    placeholder="Enter Email..."
                                    className={cx("input-form", validMsgError.email ? 'invalid' : '')}
                                />
                                <span className={cx('messenger_error')}>
                                    {validMsgError.email}{''}
                                </span>
                            </div>
                            <div className={cx("form-input")}>
                                <label className={cx("form-label")} htmlFor="email">Password</label>
                                <input type="password"
                                    id="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    placeholder="Enter password..."
                                    className={cx("input-form", validMsgError.password ? 'invalid' : '')}
                                />
                                <span className={cx('messenger_error')}>
                                    {validMsgError.password}{''}
                                </span>
                            </div>

                        </div>
                    ) : (
                        <div className={cx('form')}>
                            <div className={cx("form-input")}>
                                <label className={cx("form-label")} htmlFor="userName">User Name</label>
                                <input type="text"
                                    id="userName"
                                    value={user}
                                    placeholder="Enter User Name..."
                                    className={cx("input-form", validMsgError.user ? 'invalid' : '')}
                                    onChange={onChangeUserName}
                                />
                                <span className={cx('messenger_error')}>
                                    {validMsgError.user}{''}
                                </span>
                            </div>
                            <div className={cx("form-input")}>
                                <label className={cx("form-label")} htmlFor="email">Email</label>
                                <input type="email"
                                    id="email"
                                    value={email}
                                    placeholder="Enter Email..."
                                    className={cx("input-form", validMsgError.email ? 'invalid' : '')}
                                    onChange={onChangeEmail}
                                />
                                <span className={cx('messenger_error')}>
                                    {validMsgError.email}{''}
                                </span>
                            </div>
                            <div className={cx("form-input")}>
                                <label className={cx("form-label")} htmlFor="email">Password</label>
                                <input type="password"
                                    id="password"
                                    value={password}
                                    placeholder="Enter password..."
                                    className={cx("input-form", validMsgError.password ? 'invalid' : '')}
                                    onChange={onChangePassword}
                                />
                                <span className={cx('messenger_error')}>
                                    {validMsgError.password}{''}
                                </span>
                            </div>
                            <div className={cx("form-input")}>
                                <label className={cx("form-label")} htmlFor="password_confirm">Password Confirm</label>
                                <input type="password"
                                    id="password_confirm"
                                    value={passwordConfirm}
                                    placeholder="Enter passwordConfirm..."
                                    className={cx("input-form", validMsgError.passwordConfirm ? 'invalid' : '')}
                                    onChange={onChangePassWordConfirm}
                                />
                                <span className={cx('messenger_error')}>
                                    {validMsgError.passwordConfirm}{''}
                                </span>
                            </div>
                        </div>
                    )}
                    <div className={cx("bottom-more")}>
                        <span className={cx("bottom-more-text")}>
                            {isLoginForm ? 'Do not have an account?' : 'Have an account?'}
                        </span>
                        <span className={cx('bottom-more-register')} onClick={onChangeForm}>
                            {isLoginForm ? 'Sign up for Music app' : 'Log in'}
                        </span>
                    </div>
                    <div className={cx("form-btn")}>
                        <button type="submit"
                            ref={btnEnterRef}
                            className={cx('btn', isLoadingForm ? 'isLoading' : '')}
                        >
                            <span className={cx('loading_form')}>
                                {isLoadingForm && <Loading />}
                            </span>
                            <span>{isLoginForm ? "Login" : "Sign up"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form