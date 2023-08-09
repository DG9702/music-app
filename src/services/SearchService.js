import * as httpRequest from '../utils/request';
export const SearchService = async (query, limit = 0) => {
    const result = await httpRequest.get('search/', {
        params: {
            query: query,
            limit: limit,
        },
    });
    return result.data;
};
