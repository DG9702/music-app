/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx("info")}>
                <div className={cx("info-styledTopLinks")}>
                    <div className={cx("styledTopLinks-group")}>
                        <p className={cx("styledTopLinks-head")}>Company</p>
                        <ul className={cx("styledTopLinks-container")}>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>About</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Jobs</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>For the Record</span>
                            </a>
                        </ul>
                    </div>
                    <div className={cx("styledTopLinks-group")}>
                        <p className={cx("styledTopLinks-head")}>Communities</p>
                        <ul className={cx("styledTopLinks-container")}>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>For Artists</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Developers</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Advertising</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Investors</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Vendors</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Spotify for Work</span>
                            </a>
                        </ul>
                    </div>
                    <div className={cx("styledTopLinks-group")}>
                        <p className={cx("styledTopLinks-head")}>Useful links</p>
                        <ul className={cx("styledTopLinks-container")}>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Support</span>
                            </a>
                            <a className={cx("styledTopLinks-container-link")}>
                                <span className={cx("styledTopLinks-container-title")}>Free Mobile App</span>
                            </a>
                        </ul>
                    </div>
                </div>
                <div className={cx("about-socialLinks")}>
                    <div className={cx("about-socialLinks-item")}>
                        <Button className={cx("socialLinks-item-btn")} circle>
                            <FontAwesomeIcon size="lg" icon={faInstagram} />
                        </Button>
                    </div>
                    <div className={cx("about-socialLinks-item")}>
                        <Button className={cx("socialLinks-item-btn")} circle>
                            <FontAwesomeIcon size="lg" icon={faTwitter} />
                        </Button>
                    </div>
                    <div className={cx("about-socialLinks-item")}>
                        <Button className={cx("socialLinks-item-btn")} circle>
                            <FontAwesomeIcon size="lg" icon={faFacebook} />
                        </Button>
                    </div>
                </div>
            </div>
            <hr className={cx("horizontalRule")} />
            <div className={cx("copyright")}>
                <div className={cx("copyright-link")}>
                    <div className={cx("copyright-link-container")}>
                        <div className={cx("copyright-link-item")}>
                            <span className={cx("active")}>Legal</span>
                        </div>
                        <div className={cx("copyright-link-item")}>
                            <span>Privacy Center</span>
                        </div>
                        <div className={cx("copyright-link-item")}>
                            <span>Privacy Policy</span>
                        </div>
                        <div className={cx("copyright-link-item")}>
                            <span>Cookies</span>
                        </div>
                        <div className={cx("copyright-link-item")}>
                            <span>About Ads</span>
                        </div>
                        <div className={cx("copyright-link-item")}>
                            <span>Accessibility</span>
                        </div>
                    </div>
                </div>
                <div className={cx("copyright-title")}>
                    <span>© 2023 Spotify AB</span>
                </div>
            </div>
        </div>
    )
}

export default Footer;