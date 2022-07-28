import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { UserType } from '../types';
import toast, { Toaster } from 'react-hot-toast';
import { getUser } from '../http';
import { AxiosError } from 'axios';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserType>();

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
    } catch (err: any) {
      // console.log(err);
      // toast.error(err?.response?.data);
      // toast.error('Invalid login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Component {...pageProps} user={user} />
    </>
  );
}

export default MyApp;
