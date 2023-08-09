import * as httpRequest from "../utils/request"

export const getAllPlayListMusic = async (accessToken) => {
    const result = await httpRequest.get('list-music/get-list', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return result.data;
};

export const getListMusicById = async (accessToken, _id) => {
    const result = await httpRequest.get(`list-music/get-by-id?_id=${_id}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    return result.data;
}