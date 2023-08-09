import React, { memo, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './TitlePage.module.scss';
import { combinedStatusSelector } from '../../../../redux/selector';
import Loading from '../../../Pages/Loading/Loading';
import Images from '../../../../components/Images/Images';
import BackgroundColor from '../../../../components/BackgroundColor/BackgroundColor';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const TitlePage = memo(({ title, sizes, styles, data, song = false, className, listSong, profile }) => {
    const { isLoadingPage, dataUser } = useSelector(combinedStatusSelector);
    const [count, setCount] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (data) {
            setCount(data?.listAllPlaylist?.length)
            if (listSong === true) {
                setCount(data?.array_music?.length)
            }
        }
    })
    return (
        <div className={cx('header_wrapper', className)} style={styles}>
            <BackgroundColor data={
                listSong === true ? data?.image_list :
                    (song === true ? data?.image_music : (profile === true && data?.data?.image))
                //data?.data?.image
            }

            />
            <div className={cx("user_img")}>
                <div className={cx("user_img-body")}>
                    {isLoadingPage ? (
                        <Loading
                            styles={{
                                paddingBottom: '100%',
                            }}
                        />
                    ) : (
                        <Images
                            src={
                                listSong === true ? data?.image_list :
                                    (song === true ? data?.image_music : (profile === true && data?.data?.image))
                                //data?.data?.image
                            }
                        />
                    )}
                </div>
            </div>
            <div className={cx("header_title-container")}>
                <span className={cx("type_element")}>{title}</span>
                <span className={cx("header_title-head")}>
                    <div className={cx("header_title-body")}>
                        {isLoadingPage ? (
                            <Loading styles={{ height: '4vh' }} />
                        ) : (
                            <h1>
                                {
                                    listSong === true ? data?.name_list :
                                        (song === true ? data?.name_music : (profile === true && data?.data?.user_name))
                                    //data?.data?.user_name
                                }
                            </h1>
                        )}
                    </div>
                </span>
                <div className={cx("type_element", "user_playlist")}>
                    <span>
                        {isLoadingPage ? (
                            <Loading styles={{ height: '4vh' }} />
                        ) : (
                            <>
                                {listSong &&
                                    <>
                                        <span className={cx("hoverData")}>{dataUser?.data.user_name}</span>
                                        <span>{count} song</span>
                                    </>
                                }
                                {song &&
                                    <>
                                        <div className={cx("singer")}>
                                            <Images
                                                type='small'
                                                src={data?.image_music}
                                            />
                                            <Link
                                                to={`/artists/${data?.name_singer}`}
                                                className={cx("hoverData")}
                                            >
                                                {data.name_singer}
                                            </Link>
                                        </div>
                                        <Link
                                            to={`/track/${data?._id}`}
                                            className={cx("before", "hoverData")}
                                        >
                                            {data?.name_music}
                                        </Link>
                                        <span className={cx("before")}>{data?.createdAt?.slice(0, 4)}</span>
                                        <span className={cx("before")}>{data?.time_format}</span>
                                    </>
                                }
                                {profile && `${count} Public Playlists`}
                            </>

                        )}
                    </span>
                </div>
            </div>
        </div>
    );
});

export default TitlePage;
