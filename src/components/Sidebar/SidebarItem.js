import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from 'classnames/bind';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from './Sidebar.module.scss';
import Button from "../Button";
import Menu from "../../container/Layout/Components/Menu/Menu";
import { CREATE_PLAYLIST } from "../../redux/constant";
import { useDispatch, useSelector } from "react-redux";
import { combinedStatusSelector } from "../../redux/selector";
import { loginSlice } from "../../redux/sliceReducer";
import { getAllPlayListMusic } from "../../services";
import Images from "../Images";

const cx = classNames.bind(styles);

function SidebarItem({ data, onClick, isActive, dataset, isTablet, isOpenSideBar }) {
    const dispatch = useDispatch();
    const { dataUser } = useSelector(combinedStatusSelector);

    useEffect(() => {
        //getDataSongFavorite of user
        const fetch = async () => {
            const resultPlaylist = await getAllPlayListMusic(dataUser?.accessToken);
            const dataPlaylist = resultPlaylist.map((item) => item);
            dispatch(loginSlice.actions.setListAllPlaylist(dataPlaylist));

            return resultPlaylist;
        };
        fetch();
    }, []);

    const handleClickLogin = () => {
        if (!dataUser.accessToken) {
            dispatch(loginSlice.actions.setIsLogin(true));
            toast.info('Please login to use this function!');
        }
    }

    return (
        <>
            <div className={cx("p-1", "sidebar-container-item")}>
                <div className={cx("individual")}>
                    <Button className={cx("item-link")}
                        Icons={data.iconActive}
                        title={data.title}
                        to={data.to}>
                        {data.title}
                    </Button>
                    <div className={cx("icon-plus")}
                    >
                        <Menu items={CREATE_PLAYLIST} visible={false}>
                            <FontAwesomeIcon icon={faPlus} />
                        </Menu>
                    </div>
                </div>
            </div>
            {!dataUser.accessToken && data.title === 'Your Playlist' ? (
                <div className={cx("individual-wrap")}>
                    <div className={cx("individual-content")}>
                        <div className={cx("individual-title")}>
                            <span className={cx("individual-title-head")}>Create your first playlist</span>
                            <span className={cx("individual-title-desc")}>It's easy, we'll help you</span>
                        </div>
                        <Button
                            className={cx("individual-btn")}
                            primary
                            onHandle={handleClickLogin}
                        >
                            Create Playlist
                        </Button>
                    </div>
                </div>

            ) : (
                <div>
                    <ul className={cx("list_playlist")}>
                        {dataUser?.accessToken && dataUser?.listAllPlaylist &&
                            dataUser?.listAllPlaylist.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        className={cx("playlist_item")}
                                        to={`/playlist/${item?._id}`}
                                    >
                                        <div className={cx("playlist_item-wrap")}>
                                            <div className={cx("playlist_item-image")}>
                                                <div className={cx("playlist-image")}>
                                                    <Images src={item?.image_list} />
                                                </div>
                                            </div>
                                            <div className={cx("playlist_item-info")}>
                                                <div className={cx("playlist_info-container")}>
                                                    <p className={cx("playlist-name")}>{item?.name_list}</p>
                                                    <div className={cx("playlist-desc")}>
                                                        <p className={cx("playlist_desc-user")}>
                                                            <span>{dataUser?.data.user_name}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                    </ul>
                </div>
            )}
        </>
    )
}

export default SidebarItem;