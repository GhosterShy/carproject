const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

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


