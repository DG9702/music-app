import * as httpRequest from '../utils/request';

export const getMusicById = async (_id) => {
    const result = await httpRequest.get('music/get-by-id/', {
        params: {
            _id: _id,
        },
    });
    return result.data;
};