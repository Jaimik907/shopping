import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '../hooks/useLocalStorage';

interface IProps {
  children: JSX.Element;
}

export type UserContextType = {
  user: any;
  login: (data: any) => void;
  logout: () => void;
};

const AuthContext = createContext<UserContextType | null>(null);

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (data: any) => {
    setUser(data);
    navigate('/dashboard');
  };

  const logout = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext) as UserContextType;
};
