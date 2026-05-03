import React, { createContext, useContext, useState, useEffect } from 'react';
// Importamos a sua nova API limpa
import pharmaApi from '../api/api'; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para checar se o usuário já tem uma sessão ativa no navegador
    const loadStorageData = () => {
      const savedUser = localStorage.getItem('pharmaflow_user');
      const savedToken = localStorage.getItem('pharmaflow_token');

      if (savedUser && savedToken) {
        setUser(JSON.parse(savedUser));
        // Configura o token na instância da API automaticamente
        pharmaApi.defaults.headers.Authorization = `Bearer ${savedToken}`;
      }
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    pharmaApi.defaults.headers.Authorization = `Bearer ${token}`;
    
    localStorage.setItem('pharmaflow_user', JSON.stringify(userData));
    localStorage.setItem('pharmaflow_token', token);
  };

  const logout = () => {
    localStorage.removeItem('pharmaflow_user');
    localStorage.removeItem('pharmaflow_token');
    setUser(null);
    delete pharmaApi.defaults.headers.Authorization;
  };

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso nos componentes
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};