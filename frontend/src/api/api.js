import axios from 'axios';

const pharmaApi = axios.create({
  baseURL: 'http://18.216.138.110:3001', 
  headers: { 'Content-Type': 'application/json' },
});

export const loginUser = async (email, password) => {
  try {
    const response = await pharmaApi.post('/login', { email, password });
    return { success: true, user: response.data.user };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro no login.' };
  }
};

// NOVA: Função de Cadastro
export const signupUser = async (nome, email, password) => {
  try {
    const response = await pharmaApi.post('/signup', { nome, email, password });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Erro no cadastro.' };
  }
};

export default pharmaApi;