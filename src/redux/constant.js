import images from "../assets";
import {
    Heart, Home, HomeActive, Playlist, PlaylistActive, category, createFolder, createPlaylist,
    rightSquare, search, searchActive
} from "../components/Icons";

export const MENU_USER_HEADER = [
    {
        title: 'Profile',
        type: 'profile'
    },
    {
        title: 'Upgrate to Premium',
        icon: rightSquare,
    },
    {
        title: 'Upload',
    },
    {
        title: 'Download',
    },
    {
        title: 'Settings',
    },
    {
        title: 'Log out',
        type: 'logout',
        spederate: true,
    },
];

export const MENU_MOBILE_HEADER_LOGIN = [
    {
        title: 'Log in',
        type: 'login',
        spederate: true,
    },
    {
        title: 'Sign up',
    },
]

export const MENU_MOBILE_HEADER = [
    {
        title: 'Premium',
    },
    {
        title: 'Help',
    },
    {
        title: 'Upload',
    },
    {
        title: 'Download',
    },
    {
        title: 'Privacy',
    },
    {
        title: 'Term',
    },
    //{
    //    title: 'Log out',
    //    type: 'logout',
    //    spederate: true,
    //},
]

export const BANNER_SLIDERS = [
    {
        banner: images.bannerSlider[0],
        //to: 'new-songs',
    },
    {
        banner: images.bannerSlider[1],
        to: '/  ',
    },
    {
        banner: images.bannerSlider[2],
        //to: '/top-trending?_filter=kpop',
    },
    {
        banner: images.bannerSlider[3],
        to: '/',
    },
];

export const SIDEBAR_MENU = [
    {
        title: 'Home',
        type: 'home',
        to: "/",
        icon: Home,
        iconActive: HomeActive,
    },
    {
        title: 'Search',
        type: 'search',
        to: '/search',
        icon: search,
        iconActive: searchActive,
    },
    {
        title: 'Category',
        type: 'category',
        to: '/category',
        icon: category,
        iconActive: category,
    },
    {
        title: 'Your Playlist',
        type: 'playlist',
        icon: Playlist,
        iconActive: PlaylistActive,
    },
];


export const CREATE_PLAYLIST = [
    {
        title: 'Create a new Playlist',
        type: 'createPlaylist',
        icon: createPlaylist,
    },
    {
        title: 'Create a Playlist folder',
        type: 'createPlaylist',
        icon: createFolder,
    },
];

// select national trending
export const KPOP_NATIONAL = 'kpop';
export const VPOP_NATIONAL = 'vpop';
export const USUK_NATIONAL = 'usuk';
export const ALL_NATIONAL = 'all';
export const LOBAl = 'lobal';
export const BUTTON_RENDER_SELECT_NATIONAL = [
    {
        title: 'ALL',
        type: ALL_NATIONAL,
    },
    {
        title: 'VIETNAM',

        type: VPOP_NATIONAL,
    },
    {
        title: 'KOREA',

        type: KPOP_NATIONAL,
    },
    {
        title: 'US UK',

        type: USUK_NATIONAL,
    },
    {
        title: 'INTERNATIONAL',
        type: LOBAl,
    },
];

export const CONNECT_DEVICE = [
    {
        title: "Don't see your device",
        icon: rightSquare
    },
];

// Banner Singer Popular
export const BANNER_SINGER_POPULAR = [
    {
        src: require('../assets/Image/BannerSinger/banner-g5-squad.jpg'),
        name_singer: 'G5 Squad',
        slug_banner_singer_popular: 'g5r-squad',
        title: 'Những Bài Hát Hay Nhất Của G5R',
    },
    {
        src: require('../assets/Image/BannerSinger/banner-ho-quang-hieu.jpg'),
        name_singer: 'Hồ Quang Hiếu',
        slug_banner_singer_popular: 'ho-quang-hieu',
        title: 'Những Bài Hát Hay Nhất Của Hồ Quang Hiếu',
    },
    {
        src: require('../assets/Image/BannerSinger/banner-jack-97.jpg'),
        name_singer: 'Jack 97',
        slug_banner_singer_popular: 'jack',
        title: 'Những Bài Hát Hay Nhất Của Jack',
    },
    {
        src: require('../assets/Image/BannerSinger/banner-phan-manh-quynh.jpg'),
        name_singer: 'Phan Mạnh Quỳnh',
        slug_banner_singer_popular: 'phan-manh-quynh',
        title: 'Những Bài Hát Hay Nhất Của Phan Mạnh Quỳnh',
    },
    {
        src: require('../assets/Image/BannerSinger/banner-son-tung-mtp.jpg'),
        name_singer: 'Sơn Tùng MTP',
        slug_banner_singer_popular: 'son-tung-m-tp',
        title: 'Những Bài Hát Hay Nhất Của Sơn Tùng MTP',
    },
];

export const POPULAR_ALBUM = [
    {
        src: require('../assets/Image/BannerAlbumHot/banner-album-hot-nhac-edm.jpg'),
        slug_banner_album_hot: 'edm',
        title: 'Đỉnh Cao EDM',
        name_data: [
            {
                name_singer: 'Alan Walker',
                slug_name_singer: 'alan-walker-torine',
            },
            {
                name_singer: 'DXRK ダーク',
                slug_name_singer: 'dxrk-ダーク',
            },
        ],
    },
    {
        src: require('../assets/Image/BannerAlbumHot/banner-album-hot-nhac-han.jpg'),
        slug_banner_album_hot: 'nhac-han',
        title: 'Những Bài Hát Hay Nhất HÀN "XẺNG"',
        name_data: [
            {
                slug_name_singer: 'bts',
                name_singer: 'BTS',
            },
            {
                slug_name_singer: 'blackpink',
                name_singer: 'BlackPink',
            },
            {
                slug_name_singer: 'treasure',
                name_singer: 'TREASURE',
            },
        ],
    },
    {
        src: require('../assets/Image/BannerAlbumHot/banner-album-hot-nhac-pop-au-my.jpg'),
        slug_banner_album_hot: 'pop-au-my',
        title: 'Đỉnh Cao Nhạc Pop, Nghe Như Không Nghe !!!',
        name_data: [
            {
                slug_name_singer: 'sasha-alex-sloan',
                name_singer: 'Sasha Alex',
            },
            {
                slug_name_singer: 'the-kid-laroi-justin-bieber',
                name_singer: 'Justin Bieber',
            },
        ],
    },
    {
        src: require('../assets/Image/BannerAlbumHot/banner-album-hot-nhac-tre.jpg'),
        slug_banner_album_hot: 'nhac-tre',
        title: 'Nhạc Trẻ Gây Nghiện',
        name_data: [
            {
                slug_name_singer: 'nal',
                name_singer: 'Nal',
            },
            {
                slug_name_singer: 'khai-dang',
                name_singer: 'Khải Đăng',
            },
        ],
    },
    {
        src: require('../assets/Image/BannerAlbumHot/banner-album-hot-rap-viet.jpg'),
        slug_banner_album_hot: 'rap',
        title: 'Cháy Hết Mình Với Những Bản Rap Hay Nhất Mọi Thời Đại',
        name_data: [
            {
                slug_name_singer: 'kidz',
                name_singer: 'KIDZ',
            },
            {
                slug_name_singer: 'b-ray-x-masew-ft-amee',
                name_singer: 'Bray',
            },
        ],
    },
];