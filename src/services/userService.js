import * as httpRequest from "../utils/request"

export const getUserLogin = async (email, password) => {
    const result = await httpRequest.post('/account/login/', {
        email: email,
        password: password,
    });
    return result;
};

export const setUserRegister = async (userName, passwordConfirm, email) => {
    const result = await httpRequest.post('/account/register/', {
        userName: userName,
        email: email,
        password: passwordConfirm,
    });
    return result;
};

export const getProfileUser = async (accessToken) => {
    const result = await httpRequest.get('/account/profile/', {
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return result;
};

export const createSongFavoriteUser = async (accessToken, _id) => {
    const result = await httpRequest.post(
        '/favorite/create/',
        { idMusic: _id, Response: { message: 'Create favorite success' } },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
        },
    );
    return result;
};

export const removeSongFavoriteUser = async (accessToken, _id) => {
    const result = await httpRequest.post(
        '/favorite/create/',
        { idMusic: _id, Response: { message: '"Delete favorite success' } },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
        },
    );
    return result;
};
export const getSongFavorite = async (accessToken, limit) => {
    const result = await httpRequest.get(`/favorite/get-authorization-token?_limit=5`, {
        _limit: limit,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return result;
};
//History
export const createSongHistoryUser = async (accessToken, _id) => {
    const result = await httpRequest.post(
        '/play-history/create/',
        { idMusic: _id, Response: { message: 'Create History success' } },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json',
            },
        },
    );
    return result;
};

export const getSongHistory = async (accessToken, limit) => {
    const result = await httpRequest.get(`/play-history/get-by-token?_limit=5`, {
        _limit: limit,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return result;
};