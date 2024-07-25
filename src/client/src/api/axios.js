import axios from 'axios';

const instance = axios.create({
  baseURL: 'postgresql://clubhousehomie35_user:hSpbSCfrk2oFMmMZ6As2RKebl36ixoD2@dpg-cqggumiju9rs73ce8uu0-a.oregon-postgres.render.com/clubhousehomie35',
  headers: {
    'Content-Type': 'application/json',
  },
});

const token = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
