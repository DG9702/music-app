import classNames from "classnames/bind";
import Media from "react-media";
import styles from "../../Layout/DefaultLayout/DefaultLayout.module.scss";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Controls from "../../Layout/Components/Controls";


const cx = classNames.bind(styles);

function AccountLayout({ children }) {
    const ref = useRef();
    const [isScroll, setScroll] = useState();

    //handle Scroll in main page
    useEffect(() => {
        const instance = ref.current;
        const handleScroll = () => {
            setScroll(instance.scrollTop);
        };
        instance.addEventListener('scroll', handleScroll);

        return () => {
            instance.removeEventListener('scroll', handleScroll);
        };
    }, []);
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
                            <div className={cx("defaultLayout-wrapper")}>
                                <div className={cx("container")} ref={ref}>
                                    <div className={cx("header")}>
                                        <Header isScrollAccountPage={true} isScrollHeader={isScroll} />
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
                            <div className={cx("defaultLayout-wrapper")}>
                                <div className={cx("sidebar")}>
                                    <Sidebar />
                                </div>
                                <div className={cx("container", "account")} ref={ref}>
                                    <div className={cx("header")}>
                                        <Header isScrollAccountPage={true} isScrollHeader={isScroll} />
                                    </div>
                                    <div className={cx('content', "mb-4", isScroll && 'isScroll')}>{children}</div>
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
    );
}

export default AccountLayout;