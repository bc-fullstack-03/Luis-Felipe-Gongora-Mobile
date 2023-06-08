import axios from 'axios';

import { Environment } from '../env';

export const api = axios.create({
  baseURL: `http://${Environment.IP}:4000/v1`,
});
