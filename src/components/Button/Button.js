import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Headless from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import 'tippy.js/dist/tippy.css';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    onHandle,
    // type
    circle,
    primary,
    text,
    text_border,
    circle_hide,
    typeSideBar,
    border,
    borderFixPlay,
    disable,
    active,
    effectHover,
    effectHoverReverse,
    border_nothover,
    modalControls,
    isListQueue,
    blackPrimary,
    //sizes
    sizes,
    // Icons,
    Icons,
    LeftIcons,
    RightIcons,
    //element
    href,
    to,
    children,
    //TippyCustom ,
    extraTitle,
    nestest,
    //css ,
    spederate,
    isLoading,
    className,
    dataset,
    ...passProps
}) {
    const [visiblecheck, setVisiblecheck] = useState(); // state visible
    const classnames = cx(
        'wrapper',
        {
            primary,
            circle,
            text,
            text_border,
            spederate,
            isLoading,
            circle_hide,
            border,
            border_nothover,
            borderFixPlay,
            disable,
            active,
            effectHover,
            effectHoverReverse,
            isListQueue,
            blackPrimary,
            modalControls,
            typeSideBar,
        },
        sizes,
        className,
    );

    let Comp = 'button';
    const props = { ...passProps };
    if (href) {
        props.href = href;
        Comp = 'a';
    } else if (to) {
        props.to = to;
        Comp = Link;
    }

    if (disable) {
        onHandle = () => { };
        extraTitle = false;
    }
    return typeof extraTitle === 'string' ? ( // when have extraTitlte, content will be extraTitle
        <Tippy duration={[100, 0]} content={extraTitle} zIndex={9999999}>
            <Comp className={classnames} {...props} data-index={dataset} onClick={onHandle}>
                {LeftIcons && (
                    <span className={cx('left_icon')}>
                        <LeftIcons />
                    </span>
                )}
                {Icons && (
                    <span>
                        <Icons />
                    </span>
                )}
                <span>{children}</span>
                {RightIcons && (
                    <span className={cx('right_icon')}>
                        <RightIcons />
                    </span>
                )}
            </Comp>
        </Tippy>
    ) : (
        <Headless
            // use tippy render when have nestest
            offset={[-160, 20]}
            render={(attrs) => {
                return (
                    <div className={cx('menu')} {...attrs} tabIndex="-1">

                    </div>
                );
            }}
        >
            <Comp
                onMouseEnter={() => {
                    // custom mouse move around button parent
                    if (nestest) {
                        setVisiblecheck(true);
                    }
                }}
                onMouseLeave={() => {
                    // custom mouse move around button parent
                    if (nestest) {
                        setVisiblecheck(false);
                    }
                }}
                className={classnames}
                {...props}
                onClick={onHandle}
                data-index={dataset}
            >
                {LeftIcons && (
                    <span className={cx('left_icon')}>
                        <LeftIcons />
                    </span>
                )}
                {Icons && (
                    <span className={cx('main_icon')}>
                        <Icons />
                    </span>
                )}
                <span className={cx('section_title')}> {children}</span>
                {RightIcons && (
                    <span className={cx('right_icon')}>
                        <RightIcons />
                    </span>
                )}
            </Comp>
        </Headless>
    );
}

export default Button;
