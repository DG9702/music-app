import { useSelector } from "react-redux";
import { ALL_NATIONAL, BUTTON_RENDER_SELECT_NATIONAL, KPOP_NATIONAL, LOBAl, USUK_NATIONAL, VPOP_NATIONAL } from "../../../redux/constant"
import { combinedStatusSelector } from "../../../redux/selector"
import Loading from "../../Pages/Loading/Loading";
import Button from "../../../components/Button"
import PlaylistSong from "../PlaylistSong";

export const handleSelectBtnNational = (item) => {
    const nationalMap = {
        [ALL_NATIONAL]: ALL_NATIONAL,
        [USUK_NATIONAL]: USUK_NATIONAL,
        [VPOP_NATIONAL]: VPOP_NATIONAL,
        [KPOP_NATIONAL]: KPOP_NATIONAL,
        [LOBAl]: LOBAl,
    }
    const type = item.type;

    return nationalMap[type];
}

export const RenderBtnSelectNational = (
    paramsFilter,
    onHandleSelectNational,
    isTrendingPage
) => {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const result = BUTTON_RENDER_SELECT_NATIONAL.map((item, index) => {
        const isLocal = item.type === LOBAl;
        const isKpopOrUSUK = item.type === KPOP_NATIONAL || item.type === USUK_NATIONAL;
        const shouldRender = isTrendingPage ? !isLocal : !isKpopOrUSUK;

        if (shouldRender) {
            return isLoadingPage ? (
                <Loading
                    key={index}
                    styles={{ width: '8%', height: '2vh', margin: '0 5px' }}
                />
            ) : (
                <Button
                    key={index}
                    className={item.type === paramsFilter ? 'isActive' : ''}
                    onHandle={() => onHandleSelectNational(item)}
                    blackPrimary
                >
                    {item.title}
                </Button>
            )
        }
        return null;
    });
    return result;
}

export const handleFilterSongTrending = (data = [], paramsFilter) => {
    const dataFilter = data.filter((item) => {
        const category = item.slug_category;
        switch (paramsFilter) {
            case USUK_NATIONAL:
                return category === 'edm' || category === 'pop-au-my';
            case VPOP_NATIONAL:
                return category === 'nhac-tre';
            case KPOP_NATIONAL:
                return category === 'nhac-han';
            case LOBAl:
                return (
                    category === 'edm' ||
                    category === 'nhac-han' ||
                    category === 'pop-au-my'
                );
            case ALL_NATIONAL:
                return category;
            default:
                throw Error('error');
        }
    });
    return dataFilter;
}

export const RenderListSong = ({
    data,
    isRank,
    HomePageTrending,
    containerRef,
    isListQueue,
    pageChild,
    pageChildrenMobile,
    isArtists
}) => {
    const { isLoadingPage } = useSelector(combinedStatusSelector);

    const ComponentLoading = ({ index }) => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 10,
                }}
            >
                <Loading
                    styles={{
                        height: '3vh',
                        borderRadius: 4,
                        margin: '5px 0',
                        width: '70%',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 5,
                        width: '20%',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Loading styles={{ width: 20, height: 20, borderRadius: 1000 }} />

                    <Loading styles={{ width: 20, height: 20, borderRadius: 1000 }} />

                    <Loading styles={{ width: 20, height: 20, borderRadius: 1000 }} />
                </div>
                <Loading
                    key={index}
                    styles={{
                        height: '1vh',
                        borderRadius: 4,
                        margin: '5px 0',
                        width: '30%',
                        marginBottom: 25,
                    }}
                />
            </div>
        );
    };

    const dataClone = new Array(12).fill();
    const dataMap = isLoadingPage ? dataClone : data;

    const result = dataMap?.map((item, index) => {

        return isLoadingPage ? (
            <ComponentLoading key={index} />
        ) : (
            <PlaylistSong
                key={index}
                data={dataMap}
                song={item}
                index={index}
                isRank={isRank}
                HomePageTrending={HomePageTrending}
                ref={containerRef}
                isListQueue={isListQueue}
                pageChild={pageChild}
                pageChildrenMobile={pageChildrenMobile}
                isArtists={isArtists}
            />
        )
    });
    return result;
}