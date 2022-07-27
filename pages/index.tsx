import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const getUser = async () => {
    const res = await fetch('/api/users');
    const result = await res.json();

    console.log('User data', result);
  };

  return (
    <div>
      <Head>
        <title>Feedback form</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col space-y-4 items-center justify-center">
          <Link href="/login">Login</Link>
        </div>
        <button onClick={getUser}>Get user data</button>
        <Link href={'/form'}>Go to Form</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
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
