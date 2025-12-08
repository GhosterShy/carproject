const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080';

console.log(API_BASE);
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


