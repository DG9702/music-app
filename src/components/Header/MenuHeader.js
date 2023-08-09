import classNames from "classnames/bind";
import styles from "./MenuHeader.module.scss";
import { rightSquare } from "../Icons";
import { MENU_MOBILE_HEADER, MENU_MOBILE_HEADER_LOGIN } from "../../redux/constant";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { combinedStatusSelector } from "../../redux/selector";
import { loginSlice } from "../../redux/sliceReducer";
import Menu from "../../container/Layout/Components/Menu/Menu";
import { toast } from "react-toastify";
import Form from "../Form/Form";
import { useState } from "react";

const cx = classNames.bind(styles);

function MenuHeader({ handleLogin, handleLogout, handleToProfile }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [animation, setAnimation] = useState('on');
    const { dataUser, isLogin } = useSelector(combinedStatusSelector);
    const RenderMobileMenuLog = () => {
        return dataUser.accessToken ? (
            <Menu>
                <Button
                    RightIcons={rightSquare}
                >
                    View Account
                </Button>
                <Button
                    onHandle={handleToProfile}
                >
                    Profile
                </Button>
                <Button
                    onHandle={handleLogout}
                >
                    Log Out
                </Button>
            </Menu>
        ) : (
            MENU_MOBILE_HEADER_LOGIN.map((item, index) => {
                return (
                    <Button
                        key={index}
                        onHandle={handleLogin}
                    >
                        {item.title}
                    </Button>
                )
            })

        )
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <RenderMobileMenuLog />
                <div className={cx("brick")}>
                    <div className={cx("brick-content")}></div>
                </div>
                <div className={cx("content-down")}>
                    {MENU_MOBILE_HEADER && MENU_MOBILE_HEADER.map((item, index) => {
                        return (
                            <Button key={index}>
                                {item.title}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MenuHeader