import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import AuthUser from '../types/AuthUser';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch('/api/users', {
        credentials: 'include',
      });
      const result = await res.json();
      if (!result.err) {
        setUser(result.data);
        console.log('Inside App', result.data);
      }
    } catch (err) {
      console.log('User err', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    // <UserContext.Provider value={user}>
    <Component {...pageProps} user={user} />
    // </UserContext.Provider>
  );
}

export default MyApp;
