import { AccountLayout } from "../container/Layout";
import AlbumSinger from "../container/Pages/AlbumSinger/AlbumSinger";
import Artists from "../container/Pages/Artists/Artists";
import Category from "../container/Pages/Category/Category";
import Home from "../container/Pages/Home";
import PlaylistPage from "../container/Pages/ProfilePage/PlaylistPage/PlaylistPage";
import ProfilePage from "../container/Pages/ProfilePage/ProfilePage";
import Search from "../container/Pages/Search/Search";
import Track from "../container/Pages/Track/Track";


const config = {
    home: {
        component: Home,
        path: '/',
    },
    albumSinger: {
        component: AlbumSinger,
        path: 'album/:nickname',
        layout: AccountLayout,
    },
    artists: {
        component: Artists,
        path: 'artists/:nickname',
        layout: AccountLayout,
    },
    user: {
        component: ProfilePage,
        path: 'user/:nickname',
    },
    search: {
        component: Search,
        path: 'search',
        layout: AccountLayout,
    },
    category: {
        component: Category,
        path: 'category',
        layout: AccountLayout,
    },
    playlist: {
        component: PlaylistPage,
        path: 'playlist/:nickname',
        layout: AccountLayout,
    },
    track: {
        component: Track,
        path: 'track/:nickname',
    }
}

export default config;