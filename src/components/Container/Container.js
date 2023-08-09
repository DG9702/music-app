/* eslint-disable jsx-a11y/anchor-is-valid */
import classNames from "classnames/bind";
import styles from "./Container.module.scss";
import { useSelector } from "react-redux";
import { combinedStatusSelector } from "../../redux/selector";
import Loading from "../../container/Pages/Loading/Loading";
import Banner from "../Banner";
import { ArrowChevronRight } from "../Icons";

const cx = classNames.bind(styles);

function Container({ listData, titleSection, isPodcast, isCircle, noneHead, profile, albumClick, artistsClick }) {
    const { isLoadingPage } = useSelector(combinedStatusSelector);
    const RenderBanner = () => {
        const result = listData.map((item, index) => {
            return (
                <Banner
                    profile={profile}
                    key={index}
                    isCircle={isCircle}
                    item={item}
                    index={index}
                    isPodcast={isPodcast}
                    albumClick={albumClick}
                    artistsClick={artistsClick}
                />

            )
        });
        return result;
    }

    return (
        <div className={cx("wrapper", profile && 'profile')}>
            {isLoadingPage && (
                <Loading styles={{ width: '20%', height: '5vh', margin: '20px 0' }} />
            )}
            {!isLoadingPage && !noneHead && <div className={cx("section-title")}>
                <h2 className={cx("section-title-head")}>{titleSection}</h2>
                <a>
                    <span className={cx("show-all")}>
                        Show all
                        <span>
                            <ArrowChevronRight />
                        </span>
                    </span>
                </a>
            </div>}
            <div className={cx("section_container")}>
                <RenderBanner />
            </div>
        </div>
    )
}

export default Container;