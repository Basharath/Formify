import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [input, setInput] = useState({ email: '', password: '' });
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

  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    if (input.email === '' || input.password === '') return;

    try {
      const res = await fetch('/api/users/signin', {
        method: 'POST',
        body: JSON.stringify(input),
      });
      const result = await res.json();
      if (result.data.message === 'OK') {
        return router.push('/dashboard');
      } else {
        throw new Error('Cannot login');
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

      <main className="flex justify-center items-center h-screen">
        <div className="flex flex-col space-y-4 items-center justify-center">
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
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-rose-400 hover:bg-rose-500 rounded-lg text-white"
          >
            Login
          </button>
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
