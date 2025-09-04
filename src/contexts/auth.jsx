import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  LOCAL_STORAGE_ACCESS_TOKEN,
  LOCAL_STORAGE_REFRESH_TOKEN,
} from '@/constants/local-storage';
import { protectedApi, publicApi } from '@/lib/axios';
import { UserService } from '@/services/user';

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  login: () => {},
  signup: () => {},
  signOut: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isInitializing, setIsInitializing] = useState(true);

  const signupMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables);
      return response;
    },
  });

  const loginMutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async (variables) => {
      const response = await publicApi.post('/users/login', {
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
        const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN);
        if (!accessToken && !refreshToken) return;

        const response = await protectedApi.get('/users/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
        console.error('Error retrieving tokens from localStorage:', error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const signup = (data) => {
    signupMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setUser(createdUser);
        setTokens(createdUser.tokens);
        toast.success('Conta criada com sucesso!');
      },
      onError: (error) => {
        console.error('Signup error:', error);
        toast.error('Erro ao criar conta. Por favor, tente novamente.');
      },
    });
  };

  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser);
        setTokens(loggedUser.tokens);
        toast.success('Login realizado com sucesso!');
      },
      onError: (error) => {
        console.error('Login error:', error);
        toast.error('Erro ao realizar login. Por favor, tente novamente.');
      },
    });
  };

  const signOut = () => {
    setUser(null);
    removeTokens();
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        isInitializing,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
