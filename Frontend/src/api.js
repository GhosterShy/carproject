const API_BASE = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8080';  

export const api = (endpoint, options = {}) => {
  return fetch(`${API_BASE}/${endpoint}`, {
    credentials: 'include',
    headers: {
       ...options.headers,
      'Content-Type': 'application/json'
    },
    ...options
  });
};

export default api;


