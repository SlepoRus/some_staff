import axios from 'axios';
import client_config from '../../config/client_config.json';
const { apiPrefix } = client_config;
export default {
  user(user) {
    return axios.get(`${apiPrefix}/users/${user}`);
  },
  repos({ login }) {
    return axios.get(`${apiPrefix}/search/repositories?q=user:${login}`);
  },
  issues({ full_name }, page, limit) {
    return axios.get(`${apiPrefix}/search/issues?q=repo:${full_name}&per_page=${limit}&page=${page}`)
  },
  repo({ login }, text) {
    return axios.get(`${apiPrefix}/repos/${login}/${text}`)
  },
  issue({ login, repo, id }) {
    return axios.get(`${apiPrefix}/repos/${login}/${repo}/issues/${id}`)
  }
}
