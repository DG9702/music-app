import Media from "react-media";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames/bind';
import SidebarItem from "./SidebarItem";
import styles from './Sidebar.module.scss';
import { combinedStatusSelector } from "../../redux/selector";
import { useState } from "react";
import { SIDEBAR_MENU } from "../../redux/constant";
import SidebarItemUp from "./SidebarItemUp";
import { sidebarSlice, statusSlice } from "../../redux/sliceReducer";
import Button from "../Button/Button";

const cx = classNames.bind(styles);


function Sidebar({ isMobile }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { dataUser, idActive, isSidebarMobile } = useSelector(combinedStatusSelector);
    const [isOpenSideBar, setOpenSideBar] = useState(isSidebarMobile);

    const RenderSideBarUp = SIDEBAR_MENU.map((item, index) => {
        const menuUp = item.type === 'home' || item.type === 'search' || item.type === 'category';
        const handleClickActive = (e, index) => {
            if (
                idActive === index &&
                e.currentTarget.dataset.index !== index.toString()
            ) {
                //    // if lastEl active will off when nextEl active
                dispatch(sidebarSlice.actions.setIdSidebarActive(null));
            } else {
                dispatch(sidebarSlice.actions.setIdSidebarActive(index));
            }
            dispatch(statusSlice.actions.isSidebarMobile(false));
            localStorage.setItem('idActiveSidebar', JSON.stringify(index));
        };
        return isMobile ? (
            <Button className={cx("item-link", index === idActive ? "isActive" : "")}
                key={index}
                Icons={index === idActive ? item.iconActive : item.icon}
                title={item.title}
                to={item.to}
                onHandle={(e) => handleClickActive(e, index)}
                dataset={index}
            >
                {item.title}
            </Button>
        ) : (
            menuUp && (
                <SidebarItemUp
                    data={item}
                    key={index}
                    dataset={index}
                    isOpenSideBar={isOpenSideBar}
                    isActive={index === idActive ? true : false} // check isActive ?
                    onClick={(e) => handleClickActive(e, index)}

                />
            )
        )
    })

    const RenderSideBarIndividual = SIDEBAR_MENU.map((item, index) => {

        const menuIndividual = item.type === 'playlist';
        const handleClickActive = (e, index) => {
            if (
                idActive === index &&
                e.currentTarget.dataset.index !== index.toString()
            ) {
                dispatch(sidebarSlice.actions.setIdSidebarActive(null));
                //    // if lastEl active will off when nextEl active
            } else {
                dispatch(sidebarSlice.actions.setIdSidebarActive(index));
            }
            dispatch(statusSlice.actions.isSidebarMobile(false));

            localStorage.setItem('idActiveSidebar', JSON.stringify(index));
            console.log('Check click: ', e, index, idActive);
        };
        return menuIndividual && (
            <SidebarItem
                data={item}
                key={index}
                dataset={index}
                isOpenSideBar={isOpenSideBar}
                isActive={index === idActive ? true : false} // check isActive ?
                onClick={(e) => handleClickActive(e, index)}

            />
        )
    })

    return (
        <Media queries={{
            medium: "(max-width: 1199px)",
            large: "(min-width: 1200px)"
        }}>
            {matches => (
                <>
                    {/* Mobile */}
                    {matches.medium &&
                        <div
                            className={cx(
                                "sidebar-wrapper",
                                "mobile",
                            )}
                        >
                            {RenderSideBarUp}
                        </div>
                    }
                    {/* Dektop */}
                    {matches.large &&
                        <>
                            <div className={cx("sidebar-wrapper")}>
                                <div className={cx("sidebar-container")}>
                                    <ul className={cx("sidebar-up")}>
                                        {RenderSideBarUp}
                                    </ul>
                                </div>

                                <div className={cx("sidebar-container", "height")}>
                                    <ul className={cx("sidebar-down")}>
                                        {RenderSideBarIndividual}
                                    </ul>
                                </div>
                            </div>
                            <div className={cx("resize-bar")}>
                            </div>
                        </>
                    }
                </>
            )}
        </Media>
    )
}

export default Sidebar;