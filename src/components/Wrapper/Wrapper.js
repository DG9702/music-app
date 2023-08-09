import { ToastContainer } from "react-toastify";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Wrapper.module.scss';
import { combinedStatusSelector } from "../../redux/selector";
import Form from "../Form/Form";
import { getProfileUser } from "../../services/userService";
import { loginSlice } from "../../redux/sliceReducer"
import ModalPlaylist from "../Modal/Modal";

const cx = classNames.bind(styles);

function Wrapper({ children }) {
    const { isLogin, dataUser, isModalPlaylist } = useSelector(combinedStatusSelector)
    const dispatch = useDispatch();

    useEffect(() => {
        if (dataUser.accessToken) {
            const fetch = async () => {
                const result = await getProfileUser(dataUser.accessToken).then((data) => {
                    dispatch(loginSlice.actions.setAccessToken(data.accessToken));
                    dispatch(loginSlice.actions.setDataUser(data.data));
                    dispatch(loginSlice.actions.setIsLogin(false));
                });
                return result;
            };
            fetch();
        }
        localStorage.setItem('accessToken', JSON.stringify(dataUser.accessToken));
    }, [dataUser.accessToken, dispatch]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer
                theme="light"
                position="bottom-right"
                limit={3}
                autoClose={3000}
                className={cx("toast_msg")}
            />
            {children}
            {isLogin && <Form />}
            {isModalPlaylist && <ModalPlaylist />}
        </div>
    )
}

export default Wrapper;