/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Feedback form</title>
        <meta name="description" content="PlanetScale Quickstart for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-to-r from-purple-100 to-blue-100 h-screen">
        <div className="py-2 pt-10 max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center sm:container mx-3 px-2 md:px-8">
            <Link href="/formeasy">
              <a className="border-none select-none text-4xl">
                <Image
                  src="/images/logo.svg"
                  width={150}
                  height={54}
                  alt="Formify logo"
                />
              </a>
            </Link>
            <ul className="list-none sm:flex items-center mb-0 space-x-20 text-black text-[1.1rem]">
              {/* <span
                className="border-none hover:text-purple-500 cursor-pointer"
                // onClick={displayDemo}
              >
                <li>Demo</li>
              </span> */}
              <Link href="/login">
                <a className="border-none hover:text-purple-500 sm:inline">
                  <li>Get started</li>
                </a>
              </Link>
              {/* <Link href="#formeasy_github">
                <a
                  className="border-none hover:text-purple-500 hidden sm:inline"
                  // target='_blank'
                  // rel='noopener'
                >
                  <li>Github</li>
                </a>
              </Link> */}
              <Link href="#support">
                <a
                  className="border-none hover:text-purple-500 hidden sm:inline"
                  // rel='noopener'
                  // target='_blank'
                >
                  <li>Support</li>
                </a>
              </Link>
            </ul>
          </div>
        </div>

        {/* Hero */}
        <div>
          <div className="h-[80vh]">
            <div className="flex items-center justify-center md:p-10 md:px-14 rounded-2xl my-10 mb-24 px-4">
              <div className="text-center text-gray-800">
                <span className="text-4xl sm:text-5xl leading-[120%]">
                  <span className="font-Charm">f</span>ormify any site with No
                  Code
                </span>
                <p className="max-w-2xl mx-auto my-10 text-xl">
                  <span className="font-Charm">f</span>ormify is an{' '}
                  <span className="font-semibold italic">open source</span>{' '}
                  application that lets you{' '}
                  <span className="font-medium italic">collect</span>,{' '}
                  <span className="font-medium italic">manage</span> and{' '}
                  <span className="font-medium italic">embed</span> forms on any
                  sites without writing single line of code
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-5 sm:space-y-0">
                  <Link href="#explore">
                    <a className="border-none text-black hover:text-gray-50">
                      <button className="p-2.5 px-8  w-full md:w-auto rounded-full border border-blue-500 hover:bg-blue-500">
                        🪄 Explore
                      </button>
                    </a>
                  </Link>
                  <Link href="/login">
                    <a className="border-none text-black hover:text-gray-50">
                      <button className="p-2.5 px-8  w-full md:w-auto rounded-full border border-purple-500 hover:bg-purple-600">
                        🏹 Try out
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
