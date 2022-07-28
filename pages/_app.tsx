import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { UserType } from '../types';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserType | null>(null);

  const getUser = async () => {
    try {
      const res = await fetch('/api/users', {
        credentials: 'include',
      });
      const result = await res.json();
      if (!result.err) {
        setUser(result.data);
      }
    } catch (err) {
      console.log('User err', err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
