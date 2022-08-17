import Head from 'next/head';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { signin, signup, firebaseAuth } from '../http';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import LoginBtn from '../components/LoginBtn';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import NProgress from 'nprogress';
import Router from 'next/router';
import Image from 'next/image';
import { auth } from '../firebase/init';
import {
  GithubAuthProvider,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
  Auth,
  AuthProvider,
} from 'firebase/auth';
import { GithubIcon, GoogleIcon } from '../components/Icons';
import { isMobile } from '../utils';

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

  useEffect(() => {
    async function fetchAuth() {
      const redirectedResult = await getRedirectResult(auth);
      const token = (await redirectedResult?.user.getIdToken()) as string;

      if (token) {
        const res = await firebaseAuth({ firebaseToken: token });
        if (res.data) Router.push('/dashboard');
      }
    }
    fetchAuth();
  }, []);

  const authUser = async (auth: Auth, provider: AuthProvider) => {
    try {
      if (isMobile()) {
        await signInWithRedirect(auth, provider);
        return;
      }
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      toast('Please wait, loading!', { icon: '⌛' });

      const res = await firebaseAuth({ firebaseToken: token });
      if (res.data) Router.push('/dashboard');
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();

    authUser(auth, provider);
  };

  const handleGithubAuth = async () => {
    const provider = new GithubAuthProvider();
    authUser(auth, provider);
  };

  return (
    <>
      <Head>
        <title>Formify - Login</title>
        <meta name="description" content="Formify dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen bg-purple-50">
        <div className="flex flex-col justify-center items-center ">
          <div className="p-6 custom-shadow rounded-lg mt-36 bg-white">
            <form className="flex flex-col items-center justify-center w-[300px] max-w-md">
              {/* <h2 className="text-4xl mb-5">
                  <span className="font-Charm text-black">f</span>ormify
                </h2> */}
              <div className="select-none mb-10">
                <Image
                  src="/images/logo.svg"
                  width={150}
                  height={54}
                  alt="Formify logo"
                />
              </div>
              {/* {!isLogin && (
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
              <div className="w-full mb-4">
                {isLogin ? (
                  <LoginBtn onClick={handleSignin} text="SignIn" />
                ) : (
                  <LoginBtn onClick={handleSignup} text="SignUp" />
                )}
              </div> */}
            </form>
            <button
              onClick={handleGoogleAuth}
              className="focus:outline-none px-4 py-2 bg-blue-200 hover:bg-blue-300/90 rounded-lg text-gray-800 font-medium w-full mb-4 flex space-x-4 justify-center items-center transition-colors ease-in"
            >
              <GoogleIcon />
              <span>Sign in with Google</span>
            </button>

            <button
              onClick={handleGithubAuth}
              className="focus:outline-none px-4 py-2 bg-purple-300 hover:bg-purple-400/90 rounded-lg text-gray-800 font-medium w-full flex space-x-4 justify-center items-center transition-colors ease-in"
            >
              <GithubIcon />
              <span>Sign in with Github</span>
            </button>
            {/* <div className="w-full">
              <button
                onClick={() => setIsLogin((prev) => !prev)}
                className="focus:outline-none px-4 py-2 bg-gray-500/80 hover:bg-gray-500 rounded-lg text-white w-full"
              >
                {isLogin
                  ? 'Do not have an account? Signup'
                  : 'Already have an account? Signin'}
              </button>
            </div> */}
          </div>
        </div>
      </main>
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
