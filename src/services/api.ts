import axios from 'axios';

// Cria uma instância do axios já apontando para o seu Back-end no Render
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor: Toda vez que o React for pedir algo para a API, ele injeta o "crachá" (Token JWT) automaticamente se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@TaskManager:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});