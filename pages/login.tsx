import Head from 'next/head';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { UserType } from '../types';
import { signin, signout, signup } from '../http';
import toast from 'react-hot-toast';

interface LoginProps {
  user: UserType;
}

export default function Login({ user }: LoginProps) {
  const [input, setInput] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  if (process.browser) {
    if (user) router.push('/dashboard');
  }

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignin = async (e: MouseEvent) => {
    e.preventDefault();
    if (input.email === '' || input.password === '') return;

    const { email, password } = input;
    const data = {
      email,
      password,
    };
    try {
      const result = await signin(data);
      if (result.data) location.href = '/dashboard';
    } catch (err: any) {
      console.error('signin', err);
      toast.error(err?.response?.data);
    }
  };
  const handleSignup = async (e: MouseEvent) => {
    e.preventDefault();
    if (input.email === '' || input.password === '' || input.name === '')
      return;
    try {
      const result = await signup(input);
      if (result.data) {
        location.href = '/dashboard';
      }
    } catch (err: any) {
      console.error('signup', err);
      toast.error(err?.response?.data);
    }
  };

  return (
    <div>
      <Head>
        <title>Feedback form</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-screen">
        <div className="flex mb-2">
          <button
            onClick={() => setIsLogin(true)}
            className="border text-center px-6"
            style={{ backgroundColor: isLogin ? 'dodgerblue' : 'white' }}
          >
            Sign in{' '}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className="border text-center px-6"
            style={{ backgroundColor: isLogin ? 'white' : 'dodgerblue' }}
          >
            Sign up
          </button>
        </div>
        <form className="flex flex-col space-y-4 items-center justify-center">
          {!isLogin && (
            <input
              onChange={handleInput}
              type="text"
              name="name"
              value={input.name}
              className="border rounded p-2"
              placeholder="Enter name"
            />
          )}
          <input
            onChange={handleInput}
            type="email"
            name="email"
            value={input.email}
            className="border rounded p-2"
            placeholder="Enter email"
          />
          <input
            onChange={handleInput}
            type="password"
            name="password"
            value={input.password}
            placeholder="Enter password"
            className="border rounded p-2"
          />
          {isLogin ? (
            <button
              onClick={handleSignin}
              type="submit"
              className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg text-white"
            >
              SignIn
            </button>
          ) : (
            <button
              onClick={handleSignup}
              type="submit"
              className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg text-white"
            >
              SignUp
            </button>
          )}
        </form>
      </main>

      <footer></footer>
    </div>
  );
}

// export async function getStaticProps(context) {
//   const data = await prisma.product.findMany({
//     include: {
//       category: true,
//     },
//   });

//   //convert decimal value to string to pass through as json
//   const products = data.map((product) => ({
//     ...product,
//     price: product.price.toString(),
//   }));
//   return {
//     props: { products },
//   };
// }
