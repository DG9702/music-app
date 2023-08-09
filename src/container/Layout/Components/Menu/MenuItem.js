import classNames from "classnames/bind";
import styles from "./Menu.module.scss"
import Button from "../../../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { combindStatusRadio, combinedStatusSelector } from "../../../../redux/selector";
import { useState } from "react";

const cx = classNames.bind(styles);

function MenuItem({ data, onHandle }) {
    const titleLogout = data.type === "logout" ? "logout" : "";
    const classes = cx("items", titleLogout);

    return (
        <div className={classes}>
            <Button
                text
                RightIcons={data.icon}
                className={cx('icon')}
                to={data.to}
                onHandle={onHandle}
                href={data.href}
                title={data.title}
                nestest={data.children}
                spederate={data.spederate}
            >
                <span className={cx('item_title')}>{data.title}</span>
            </Button>
        </div>
    )
}

export default MenuItem;