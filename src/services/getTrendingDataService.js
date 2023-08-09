import * as httpRequest from '../utils/request';

export const getTrendingDataService = async (limit, page = 0) => {
    const result = await httpRequest.get('/music/trending/', {
        params: {
            _limit: limit,
            _page: page,
        },
    });
    return result.data;
};