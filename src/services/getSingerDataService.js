import * as httpRequest from '../utils/request';

export const getSingerDataService = async (slug_name_singer, limit) => {
    const result = await httpRequest.get('music/get-singer-name/', {
        params: {
            _singer: slug_name_singer,
            _limit: limit,
        },
    });
    return result.data;
};

export const getSingerByName = async (slug_name_singer) => {
    const result = await httpRequest.get('music/get-singer-name/', {
        params: {
            _singer: slug_name_singer,
        },
    });
    return result.data;
};
