import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { SearchService } from "../../../services";
import PlaylistSong from "../../../container/Feature/PlaylistSong";
import { AccountPropose } from "../../../components/Propose";
import { RenderListSong } from "../../Feature/HandleEvent";
const cx = classNames.bind(styles);

function Search() {
    const [value, setValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState();
    const containerRef = useRef();

    // handle Event
    const handleType = (e) => {
        setValue(e.target.value);

        if (!e.target.value) {
            setSearchResult([]);
        }
    };
    const handleFocus = (e) => {
        setVisible(true);
    };

    const handleOffResult = (e) => {
        if (containerRef?.current) {
            if (containerRef.current?.contains(e.target)) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }
    };

    const handleClear = () => {
        setValue('');
        setSearchResult([]);
        setVisible(true);
    };

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (value) {
                setLoadingSearch(true);
                const result = await SearchService(value);
                setSearchResult(result);
                setLoadingSearch(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [value]);

    useEffect(() => {
        window.addEventListener('click', (e) => handleOffResult(e));
        return () => window.removeEventListener('click', (e) => handleOffResult(e));
    }, [visible, containerRef.current]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("topBar")}>
                <div className={cx("topBar_content")}>
                    <form className={cx("form_search")}>
                        <input
                            type="text"
                            name="search"
                            onFocus={(e) => handleFocus(e)}
                            onChange={(e) => handleType(e)}
                            className={cx("search_input")}
                            placeholder="What do you want to listen to?"
                        />
                    </form>
                    <div className={cx("search_icon")}>
                        <span>
                            <FontAwesomeIcon icon={faSearch} />
                        </span>

                    </div>
                </div>
            </div>
            {(visible) && (
                <div className={cx('result_search')}>
                    {/* kiểm tra mảng có phần tử mới gửi dữ liệu qua Account */}
                    <h4 className={cx('result_title')}>
                        {searchResult.length > 0
                            ? 'Songs'
                            : 'Nhập thông tin tìm kiếm'}
                    </h4>
                    {searchResult && (
                        <RenderListSong
                            data={searchResult}
                            isRank={false}
                            pageChild={true}
                            isArtists={true}
                        />
                    )}

                    <div className={cx("grid-container")}>
                        {searchResult.length > 0 && (
                            <AccountPropose
                                data={searchResult ? searchResult : undefined}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;