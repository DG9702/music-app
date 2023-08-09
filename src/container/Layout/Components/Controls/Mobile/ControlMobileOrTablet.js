import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { prominent, average } from "color.js";
import ControlCenter from "../ControlCenter";
import InputProgress from "../../InputProgress/InputProgress";
import ControlLeft from "../ControlLeft";
import styles from "./ControlMobileOrTablet.module.scss";
import { useSelector } from "react-redux";
import { combindStatusRadio, combinedStatusSelector } from "../../../../../redux/selector";

const cx = classNames.bind(styles);

function ControlMobileOrTablet() {
    return (
        <div
            className={cx("wrapper")}
        >
            <ControlLeft />
            <ControlCenter isMobile />
            <InputProgress
                classes
                max={100}
                step={1}
                audioType={true}
            />

        </div>
    )
}

export default ControlMobileOrTablet;