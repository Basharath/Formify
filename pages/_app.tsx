import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Form } from 'formify-form';

function MyApp({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  useEffect(() => {
    const start = () => NProgress.start();
    const end = () => NProgress.done();

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <>
      {isMounted && <Toaster position="bottom-center" reverseOrder={false} />}
      <Form
        formFields={['name', 'email', 'message']}
        formURL="https://formify.vercel.app/api/forms/submissions?id=946ea95d-c79b-4f07-ba1c-15aa054651af"
        formTitle="Contact/Feedback"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
