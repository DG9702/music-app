import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import { useEffect, useState } from "react";
import { searchBanner } from "../../../constant/bannerSearch";
import BannerCategory from "../../../components/BannerCategory/BannerCategory";

const cx = classNames.bind(styles);

function Category() {
    const [category, setCategory] = useState([]);

    useEffect(() => {

    })

    return (
        <div className={cx("wrapper")}>
            <h2 className={cx("heading")}>Browser all</h2>
            <div

                className={cx('body')}
            >
                {searchBanner.map((item, index) => {
                    return (
                        <BannerCategory
                            key={index}
                            id={item.id}
                            title={item.title}
                            imgUrl={item.imgUrl}
                            bgColor={item.bgColor}

                        />
                    )
                })}
            </div>
        </div>
    );
}

export default Category;