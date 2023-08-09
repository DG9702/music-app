import config from '../config/routes';

export const publicRoutes = [];
export const privateRoutes = [
    {
        path: config.home.path,
        component: config.home.component,
    },
    {
        path: config.albumSinger.path,
        component: config.albumSinger.component,
        layout: config.albumSinger.layout,
    },
    {
        path: config.artists.path,
        component: config.artists.component,
        layout: config.artists.layout,
    },
    {
        path: config.user.path,
        component: config.user.component
    },
    {
        path: config.search.path,
        component: config.search.component
    },
    {
        path: config.playlist.path,
        component: config.playlist.component,
        layout: config.playlist.layout,
    },
    {
        path: config.track.path,
        component: config.track.component,
        layout: config.albumSinger.layout,
    },
    {
        path: config.category.path,
        component: config.category.component,
    }

]