import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import { Close } from "../Icons";
import Button from '../Button';
import { useDispatch } from "react-redux";
import { statusSlice } from "../../redux/sliceReducer";

const cx = classNames.bind(styles);

function ModalPlaylist() {
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(statusSlice.actions.isModalPlaylist(false));
    }
    return (
        <div className={cx("wrapper")}>
            <div className={cx('container-section')}>
                <h3 className={cx('title_form')}>
                    Create a new playlist
                    <span
                        className={cx('btn_close')}
                        onClick={handleClose}
                    >
                        <Button circle Icons={Close} />
                    </span>
                </h3>
                <form className={cx('form-container')}
                >
                    <div className={cx('form')}>
                        <div className={cx("form-input")}>
                            <label className={cx("form-label")} htmlFor="email">Name Playlist</label>
                            <input
                                id="name"
                                placeholder="Enter Email..."
                                className={cx("input-form")}
                            />
                            <span className={cx('messenger_error')}>

                            </span>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default ModalPlaylist;