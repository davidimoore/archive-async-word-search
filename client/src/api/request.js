import axios from 'axios';

export function getRequest({ url }) {
  return axios.get(url).then(response => response)
}
