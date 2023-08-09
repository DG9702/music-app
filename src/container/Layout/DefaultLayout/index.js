import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import styles from './DefaultLayout.module.scss';
import Footer from '../../../components/Footer/Footer';
import Controls from "../../Layout/Components/Controls";
import Media from 'react-media';


const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const ref = useRef();
    const wrapperRef = useRef();
    const [isScroll, setScroll] = useState();
    const params = useParams();
    //handle Scroll in main page
    useEffect(() => {
        const instance = ref.current;

        const handleScroll = () => {
            setScroll(instance.scrollTop);
        };
        instance?.addEventListener('scroll', handleScroll);

        return () => instance?.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        const instance = ref.current;
        if (params) {
            instance?.scrollTo(0, 0);
        }
    }, [params]);

    return (
        <Media
            queries={{
                small: '(max-width: 1199px)',
                large: '(min-width: 1200px)',
            }}
        >
            {matches => (
                <>
                    {matches.small &&
                        <>
                            <div className={cx("defaultLayout-wrapper")} ref={wrapperRef}>
                                <div className={cx("container")} ref={ref}>
                                    <div className={cx("header")}>
                                        <Header isScrollHeader={isScroll} />
                                    </div>
                                    <div className={cx('content', "mb-4")}>{children}</div>
                                    <div className={cx('footer')}>
                                        <Footer />
                                    </div>
                                </div>
                                <div className={cx("defaultLayout-bottom")}>
                                    <div className={cx("control-music")}>
                                        <Controls />
                                    </div>
                                    <div className={cx("sidebar")}>
                                        <Sidebar isMobile />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {matches.large &&
                        <>
                            <div className={cx("defaultLayout-wrapper")} ref={wrapperRef}>
                                <div className={cx("sidebar")}>
                                    <Sidebar />
                                </div>
                                <div className={cx("container")} ref={ref}>
                                    <div className={cx("header")}>
                                        <Header isScrollHeader={isScroll} />
                                    </div>
                                    <div className={cx('content', "mb-4")}>{children}</div>
                                    <div className={cx('footer')}>
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                            <div className={cx("control-music")}>
                                <Controls />
                            </div>
                        </>
                    }
                </>
            )}
        </Media>


    )

}

export default DefaultLayout;