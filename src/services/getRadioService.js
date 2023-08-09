import axios from 'axios';

const getRadioService = async () => {
    const response = await axios.get('https://zing-mp3-api.vercel.app/api/radio');
    return response?.data?.data.items;
};

export default getRadioService;
