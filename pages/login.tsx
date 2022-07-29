import Head from 'next/head';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { signin, signout, signup } from '../http';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import LoginBtn from '../components/LoginBtn';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

// interface LoginProps {
//   user: UserType;
// }
// { user }: LoginProps

export default function Login() {
  const [input, setInput] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignin = async (e: MouseEvent) => {
    e.preventDefault();
    if (input.email === '' || input.password === '') {
      toast.error('Please fill the details');
      return;
    }

    const { email, password } = input;
    const data = {
      email,
      password,
    };
    try {
      const result = await signin(data);
      if (result.data) location.href = '/dashboard';
    } catch (err) {
      // console.error('signin', err);
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
  };
  const handleSignup = async (e: MouseEvent) => {
    e.preventDefault();
    if (input.email === '' || input.password === '' || input.name === '') {
      toast.error('Please fill the details');
      return;
    }
    try {
      const result = await signup(input);
      if (result.data) {
        location.href = '/dashboard';
      }
    } catch (err) {
      // console.error('signup', err);
      if (err instanceof AxiosError) {
        toast.error(err?.response?.data);
      }
    }
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
            {/* <div className="w-full mb-2">
            <button
              onClick={() => setIsLogin((prev) => !prev)}
              className="focus:outline-none px-4 py-2 bg-blue-500/80 hover:bg-blue-500 rounded-lg text-white w-full"
            >
              Google Login
            </button>
          </div> */}
            <div className="w-full">
              <button
                onClick={() => setIsLogin((prev) => !prev)}
                className="focus:outline-none px-4 py-2 bg-gray-500/80 hover:bg-gray-500 rounded-lg text-white w-full"
              >
                {isLogin
                  ? 'Do not have an account? Signup'
                  : 'Already have an account? Signin'}
              </button>
            </div>
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
