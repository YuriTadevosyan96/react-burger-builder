import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-burger-9f02a-default-rtdb.europe-west1.firebasedatabase.app/',
});
