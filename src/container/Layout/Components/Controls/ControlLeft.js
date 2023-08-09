import classNames from "classnames/bind";
import styles from "./Control.module.scss";
import Images from "../../../../components/Images";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button/Button";
import { circleChevonUp, expand } from "../../../../components/Icons"
import { useSelector } from "react-redux";
import { combindStatusRadio, combinedStatusSelector } from "../../../../redux/selector";
import { ActionBtnAlbum } from "../../../Feature/ActionBtnAlbum";
import Media from "react-media";

const cx = classNames.bind(styles);

function ControlLeft({ styleImg, styleTitle, isMobile }) {
    const { songCurrent, isPlaying } = useSelector(combinedStatusSelector);
    const { radioDetails, isPlayingRadio } = useSelector(combindStatusRadio);
    const isRadioSelecting = !isPlaying && songCurrent?.src_music === '';

    return (
        <div className={cx("control-left")}>
            <figure
                className={cx(
                    "control-item-img",
                    (isPlaying || isPlayingRadio) && isMobile ? 'spin' : '',
                )}
            >
                <div className={cx("control-img-content")}>
                    <Images
                        src={
                            isRadioSelecting ? radioDetails?.thumbnailH
                                : songCurrent?.image_music
                        }
                        isControl={true} // loading skeleton just in control
                        type={styleImg}
                        isMobile={isMobile}
                    />
                </div>
                <Button
                    extraTitle={"Expand"}
                    Icons={expand}
                    className={cx("expand")}
                />
            </figure>
            <div className={cx("media-content")}>
                <span className={cx("media-title", styleTitle)}>
                    {songCurrent?.name_music || radioDetails?.title}
                </span>
                <h3 className={cx("media-subtitle")}>
                    <Link
                        to={`/${songCurrent?.slug_name_singer}`}
                        state={songCurrent?.slug_name_singer}
                    >
                        {songCurrent?.name_singer}
                    </Link>
                </h3>
            </div>
            {!isRadioSelecting ? (
                <div className={cx("media-custom")}>
                    <Media query="(max-width: 1199px)">
                        {(matches) => {
                            return matches ? (
                                <ActionBtnAlbum
                                    playlistSong
                                    song={songCurrent}
                                    sizeTablet={true}
                                />
                            ) : (
                                <ActionBtnAlbum playlistSong song={songCurrent} />
                            );
                        }}
                    </Media>
                </div>
            ) : (
                <ActionBtnAlbum playlistSong song={songCurrent} />
            )}
        </div>
    )
}

export default ControlLeft;