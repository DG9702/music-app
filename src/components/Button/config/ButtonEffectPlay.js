import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Button from '../Button';
import { Pause, Play } from '../../Icons';
import { combinedStatusSelector } from '../../../redux/selector';
import { featureSlice, statusSlice } from '../../../redux/sliceReducer';
import { createSongHistoryUser } from '../../../services';

const ButtonEffectPlay = ({ children, sizes, primaryColor, data = [], isSlugNameFromLocation }) => {
    const dispatch = useDispatch();
    const { isPlaying, songCurrent, dataUser } = useSelector(combinedStatusSelector);
    const dataCheck = data[data?.length - 1];

    const handleTogglePlaySong = async () => {
        if (data.length > 0 && dataCheck !== undefined) {
            // data from banner singer
            const randomIndex = Math.floor(Math.random() * data?.length);
            if (
                isSlugNameFromLocation ||
                songCurrent.slug_name_singer === dataCheck.slug_name_singer
            ) {
                //if same currentSong and data from banner will toggle
                dispatch(statusSlice.actions.isPlayingChange(!isPlaying));
            } else {
                // if songcurrent playing not same slugname with banner song will set data, currentIndex again
                dispatch(statusSlice.actions.isPlayingChange(true));
                dispatch(featureSlice.actions.setDataSongs(data));
                dispatch(featureSlice.actions.setCurrentID(randomIndex));
                dispatch(featureSlice.actions.setSongCurrent(data[randomIndex]));
            }
            if (dataUser.accessToken && dataUser.listRecentlyPlayed) {
                if (!isPlaying) {
                    await createSongHistoryUser(dataUser.accessToken, data[randomIndex]._id);

                }
            }
        } else {
            // if not data will send  response
            toast.warn('Bạn chưa thích bài hát nào ...');
        }
    };

    return (
        <Button
            sizes={sizes}
            className={primaryColor}
            Icons={
                data
                    ? (isPlaying && isSlugNameFromLocation) ||
                        songCurrent?.slug_name_singer === dataCheck?.slug_name_singer
                        ? isPlaying
                            ? Pause
                            : Play
                        : Play
                    : undefined
            }
            effectHoverReverse // effect type
            onHandle={handleTogglePlaySong}
        >
            {children}
        </Button>
    );
};
export default React.memo(ButtonEffectPlay);
