import Head from 'next/head';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { googleSignin, signin, signout, signup } from '../http';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import LoginBtn from '../components/LoginBtn';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import NProgress from 'nprogress';
import Router from 'next/router';

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const start = () => NProgress.start();
  const end = () => NProgress.done();

  const handleSignin = async (e: MouseEvent) => {
    e.preventDefault();
    start();
    if (input.email === '' || input.password === '') {
      toast.error('Please fill the details');
      end();
      return;
    }

    const { email, password } = input;
    const data = {
      email,
      password,
    };
    try {
      const result = await signin(data);
      end();
      if (result.data) Router.push('/dashboard');
    } catch (err) {
      // console.error('signin', err);
      end();
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
  };
  const handleSignup = async (e: MouseEvent) => {
    e.preventDefault();
    start();
    if (input.email === '' || input.password === '' || input.name === '') {
      toast.error('Please fill the details');
      end();
      return;
    }
    try {
      const result = await signup(input);
      end();
      if (result.data) {
        Router.push('/dashboard');
      }
    } catch (err) {
      // console.error('signup', err);
      end();
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
  };

  const handleGoogleSuccess = async (res: CredentialResponse) => {
    const googleToken = res.credential as string;
    try {
      const result = await googleSignin({ googleToken });
      if (result.data) Router.push('/dashboard');
    } catch (err) {
      // console.error('signin', err);
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
  };

  const handleGoogleError = () => {
    toast.error('Something went wrong! Try again.');
  };

  return (
    <>
      <Head>
        <title>Formify - Login</title>
        <meta name="description" content="Formify dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      >
        <main className="w-full h-screen bg-purple-50">
          <div className="flex flex-col justify-center items-center ">
            <div className="p-6 custom-shadow rounded-lg mt-32 bg-white">
              <form className="flex flex-col items-center justify-center w-[300px] max-w-md">
                <h2 className="text-4xl font-medium mb-5">Formify</h2>
                {!isLogin && (
                  <Input
                    onChange={handleInput}
                    type="text"
                    name="name"
                    value={input.name}
                    placeholder="Enter name"
                  />
                )}
                <Input
                  onChange={handleInput}
                  type="email"
                  name="email"
                  value={input.email}
                  placeholder="Enter email"
                />
                <Input
                  onChange={handleInput}
                  type="password"
                  name="password"
                  value={input.password}
                  placeholder="Enter password"
                />
                <div className="w-full my-4">
                  {isLogin ? (
                    <LoginBtn onClick={handleSignin} text="SignIn" />
                  ) : (
                    <LoginBtn onClick={handleSignup} text="SignUp" />
                  )}
                </div>
              </form>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                size="large"
                width="300"
                text="signin_with"
                logo_alignment="center"
              />
              <div className="w-full">
                <button
                  onClick={() => setIsLogin((prev) => !prev)}
                  className="focus:outline-none px-4 py-2 bg-gray-500/80 hover:bg-gray-500 rounded-lg text-white w-full mt-4"
                >
                  {isLogin
                    ? 'Do not have an account? Signup'
                    : 'Already have an account? Signin'}
                </button>
              </div>
            </div>
          </div>
        </main>
      </GoogleOAuthProvider>
      <footer></footer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const cookie = ctx.req ? ctx.req.headers.cookie : undefined;
  const cookieString: string | undefined = ctx.req.headers.cookie;

  let cookieData;
  if (cookieString) cookieData = cookie.parse(cookieString);

  const baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.SERVER
      : 'http://localhost:3000';

  const userURL = `${baseURL}/api/users/getuser`;

  if (cookieData?.token) {
    try {
      const userRes = await fetch(userURL, {
        method: 'GET',
        headers: {
          Authorization: `${cookieData.token}`,
        },
      });

      const result = await userRes.json();

      if (result.id) {
        return {
          redirect: {
            destination: '/dashboard',
            permanent: false,
          },
        };
      } else {
        return {
          props: { data: '' },
        };
      }
    } catch (err) {
      return {
        props: { data: '' },
      };
    }
  }

  return {
    props: { data: '' },
  };
};
