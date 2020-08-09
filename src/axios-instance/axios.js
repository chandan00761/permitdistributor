import axios from 'axios';

const instance = axios.create({
    baseURL: "https://react-burger-32467.firebaseio.com/"
});

export default instance