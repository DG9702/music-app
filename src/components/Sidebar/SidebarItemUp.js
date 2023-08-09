import classNames from "classnames/bind";
import Media from "react-media";
import styles from './Sidebar.module.scss';
import Button from "../Button";

const cx = classNames.bind(styles);

function SidebarItemUp({ data, onClick, isActive, dataset }) {
    return (
        <li
            className={cx("sidebar-container-item",
                isActive ? "isActive" : ""
            )}
            onClick={onClick}
            data-index={dataset}
        >
            <Button
                className={cx("item-link")}
                Icons={isActive ? data.iconActive : data.icon}
                title={data.title}
                to={data.to}
            >
                {data.title}
            </Button>
        </li>
    )
}

export default SidebarItemUp;