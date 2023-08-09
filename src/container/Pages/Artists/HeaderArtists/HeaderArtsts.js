import classNames from "classnames/bind";
import styles from "../Artists.module.scss";
import Images from "../../../../components/Images/Images";
import { useSelector } from "react-redux";
import { combinedStatusSelector } from "../../../../redux/selector";
import TitlePage from "../../../Layout/Components/TitlePage/TitlePage";
import { VerifiedCheck } from "../../../../components/Icons";
import Media from "react-media";

const cx = classNames.bind(styles);

function HeaderArtists({ data = [] }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const singer_info = data[data.length - 1];
    const follower = singer_info?.favorite.toLocaleString();
    return (
        <Media
            queries={{
                mobile: '(max-width: 1199px)',
                desktop: '(min-width: 1200px)'
            }}
        >
            {matches => (
                <>
                    {matches.desktop && (
                        <div className={cx('header_box')}
                            style={{ backgroundImage: `url(${singer_info?.image_music})` }}
                        >
                            <div className={cx('box_singer')}>
                                <span className={cx("title-topic")}>
                                    <div></div>
                                    <VerifiedCheck />
                                    <span>Verified Artists</span>
                                </span>
                                <span className={cx('singer_info')}>
                                    <h1>{singer_info?.name_singer}</h1>
                                </span>
                                <span className={cx('extra_title')}>{follower} interested person</span>
                            </div>
                        </div>
                    )}
                    {matches.mobile && (
                        <div className={cx('box_singer')}>
                            <div className={cx("img_banner")}>
                                <Images src={singer_info?.image_music} />
                            </div>
                            <span className={cx("title-topic")}>
                                <div></div>
                                <VerifiedCheck />
                                <span>Verified Artists</span>
                            </span>
                            <span className={cx('singer_info')}>
                                <h1>{singer_info?.name_singer}</h1>
                            </span>
                            <span className={cx('extra_title')}>{follower} interested person</span>
                        </div>
                    )}
                </>
            )}
        </Media>
    );
}

export default HeaderArtists;