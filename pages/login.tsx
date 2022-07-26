import Head from 'next/head';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [input, setInput] = useState({ email: '', password: '', name: '' });
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // const data = {
  //   name: 'Mary',
  //   email: 'Mary@gmail.com',
  //   password: '12345678',
  // };
  // const createUser = async () => {
  //   const res = await fetch('/api/users', {
  //     method: 'POST',
  //     body: JSON.stringify(data),
  //   });
  //   const result = await res.json();
  //   console.log('POST', result);
  // };

  // const getUsers = async () => {
  //   const res = await fetch('/api/users');
  //   const result = await res.json();
  //   console.log('GET', result);
  // };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignin = async () => {
    if (input.email === '' || input.password === '') return;

    const { email, password } = input;
    const data = {
      email,
      password,
    };
    try {
      const res = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.msg === 'OK') {
        return router.push('/dashboard');
      } else {
        console.log('res', result.msg);
      }
    } catch (err) {
      console.error('err', err);
    }
  };
  const handleSignup = async () => {
    if (input.email === '' || input.password === '' || input.name === '')
      return;
    try {
      const res = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      const result = await res.json();
      console.log('signup', result);
      if (result.msg === 'OK') {
        return router.push('/dashboard');
      } else {
        console.log('res', result.msg);
      }
    } catch (err) {
      console.error('err', err);
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
        <div className="flex flex-col space-y-4 items-center justify-center">
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
              className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg text-white"
            >
              SignIn
            </button>
          ) : (
            <button
              onClick={handleSignup}
              className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg text-white"
            >
              SignUp
            </button>
          )}
        </div>
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
