import jwtDecode from 'jwt-decode';
import * as SecureStore from 'expo-secure-store';
import React, { useReducer, ReactNode, createContext } from 'react';

import { api } from '../services/api';
import { Auth, UserToken } from '../Screens/Model/Auth';

interface AuthContext {
  token: string;
  user: string;
  profile: string;
  errorMessage: string;
  isLoading: boolean;
  login?: () => void;
  register?: () => void;
  logout?: () => void;
  tryLocalLogin?: () => void;
}

const defaultValue = {
  token: '',
  user: '',
  profile: '',
  errorMessage: '',
  isLoading: true,
};

const Context = createContext<AuthContext>(defaultValue);

const Provider = ({ children }: { children: ReactNode }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'login':
        return {
          ...state,
          ...action.payload,
          errorMessage: '',
        };
      case 'add_error':
        return {
          ...state,
          errorMessage: action.payload,
          isLoading: false,
        };
      case 'user_Created':
        return {
          ...state,
          errorMessage: '',
          ...action.payload,
        };
      case 'logout':
        return {
          token: '',
          profile: '',
          user: '',
          errorMessage: '',
          isLoading: false,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, defaultValue);

  const login = async (auth: Auth) => {
    try {
      const { data } = await api.post('/security/login', auth);
      const { user, profile } = jwtDecode(data.accessToken) as UserToken;

      await SecureStore.setItemAsync('token', data.accessToken);
      await SecureStore.setItemAsync('user', user);
      await SecureStore.setItemAsync('profile', profile);

      dispatch({
        type: 'login',
        payload: {
          token: data.accessToken,
          profile: profile,
          user: user,
          isLoading: false,
        },
      });
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Houve um erro no login',
      });
    }
  };

  const tryLocalLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const user = await SecureStore.getItemAsync('user');
      const profile = await SecureStore.getItemAsync('profile');

      dispatch({
        type: 'login',
        payload: {
          token,
          user,
          profile,
          isLoading: false,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (auth: Auth) => {
    try {
      await api.post('/security/register', auth);

      await SecureStore.setItemAsync('name', auth.name);

      dispatch({
        type: 'user_created',
        isLoading: false,
      });
    } catch (err) {
      dispatch({
        type: 'add_error',
        payload: 'Houve um erro no cadastro',
      });
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      await SecureStore.deleteItemAsync('profile');

      dispatch({
        type: 'logout',
      });
    } catch (err) {}
  };

  return (
    <Context.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        tryLocalLogin,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Provider, Context };
