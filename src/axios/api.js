import axios from 'axios'

export const publicClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
