import React, { useEffect, useMemo, useState } from 'react';
import { AuthContext } from './auth';

const AUTH_STORAGE_KEY = 'visioncheck-user';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const login = ({ email, name }) => {
    const authenticatedUser = {
      email,
      name: name || email.split('@')[0],
      signedInAt: new Date().toISOString(),
    };

    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      login,
      logout,
      user,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
