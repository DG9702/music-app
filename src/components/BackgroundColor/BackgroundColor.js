import classNames from "classnames/bind";
import styles from "./BackgroundColor.module.scss";
import { useEffect, useState } from "react";
import { average } from "color.js";

const cx = classNames.bind(styles);


function BackgroundColor({ data, linearNoise }) {
    const [colors, setColors] = useState('#fff');

    useEffect(() => {
        if (data) {
            average(data).then((color) => {
                setColors(`rgba(${color.join(',')})`);
            })
        }
    })

    return (
        <>
            {linearNoise ? (
                <>
                    <div
                        style={{ backgroundColor: colors }}
                        className={cx(
                            "bg-element",
                            "bg-linear-noise"
                        )}>

                    </div>
                </>
            ) : (
                <>
                    <div className={cx("bg-element")}
                        style={{ backgroundColor: colors }}
                    ></div>
                    <div className={cx(
                        "bg-element",
                        "bg-linear"
                    )}></div>
                </>

            )
            }
        </>
    );
}

export default BackgroundColor;