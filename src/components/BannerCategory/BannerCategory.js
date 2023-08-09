import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BannerCategory.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const cx = classNames.bind(styles);

function BannerCategory({ title, imgUrl, id, bgColor }) {
    return (
        <Link className={cx('main')} to={`/genre/${id}`}>
            <div style={{ backgroundColor: `${bgColor}` }} className={cx('wrapper')}>
                <div className={cx('title')}>
                    <h4
                        className={cx('title-text')}
                        dangerouslySetInnerHTML={{ __html: title }}
                    ></h4>
                </div>
                <div className={cx('img')}>
                    <LazyLoadImage src={imgUrl} alt={title} />
                </div>
            </div>
        </Link>
    );
}

export default BannerCategory;