import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-worldcupscorepredictor.firebaseio.com/'
});

export default instance;