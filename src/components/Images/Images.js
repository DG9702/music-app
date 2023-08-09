import { useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import images from '../../assets';
import styles from './Images.module.scss';
import { combinedStatusSelector } from '../../redux/selector';
import Loading from '../../container/Pages/Loading';

const cx = classNames.bind(styles);

function Images({
    src,
    Icon,
    IconBtn,
    onHandle,
    imgError,
    isControl, // just change in control,
    isMobile,
    alt,
    type,
    ...props
}) {
    const [defaultImg, setDefaultImg] = useState('');
    const { isLoading } = useSelector(combinedStatusSelector);
    const userDefault = images.usersDefault;

    const handleErrorImg = () => {
        setDefaultImg(imgError || userDefault);
    };

    const classes = cx('wrapper', type, { Icon });
    return isLoading && isControl ? (
        <Loading
            styles={{
                width: isMobile ? '40px' : '64px',
                height: isMobile ? '40px' : '64px',
                paddingBottom: '100%',
            }}
        />
    ) : !IconBtn ? (
        <img
            className={classes}
            onClick={onHandle}
            alt={alt}
            src={src ? src : defaultImg}
            {...props}
            onError={handleErrorImg}
        />
    ) : (
        <div className={cx('btn_arrow_right')}>
            <IconBtn />
        </div>
    );
}

export default Images;
