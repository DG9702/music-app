import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import Sliderslick from "../../Layout/Components/Sliderslick";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarSlice } from "../../../redux/sliceReducer";
import Content from "../../../components/Content";
import { combinedStatusSelector } from "../../../redux/selector";


const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { songCurrent } = useSelector(combinedStatusSelector);
    useEffect(() => {
        if (!songCurrent) {
            navigate('..');
        }
        dispatch(sidebarSlice.actions.setIdSidebarActive(0));
    }, [songCurrent, dispatch, navigate]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx("slick-slider")}>
                <Sliderslick />
            </div>
            <div className={cx("content")}>
                <Content />
            </div>
        </div>
    )
}

export default Home;