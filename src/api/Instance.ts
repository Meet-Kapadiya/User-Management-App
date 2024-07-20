import axios from 'axios';

const AppAxios = axios.create({
  headers: {
    Accept: 'application/json',
  },
});

export default AppAxios;
