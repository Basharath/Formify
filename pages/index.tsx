/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Home() {
  useEffect(() => {}, []);

  return (
    <>
      <Header title="Formify" />

      <main className="bg-gradient-to-r from-purple-100 to-blue-100 overflow-hidden">
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
              <Link href="/login">
                <a className="border-none hover:text-purple-500 sm:inline font-medium">
                  <li>Get started</li>
                </a>
              </Link>
              <Link href="#support">
                <a className="border-none hover:text-purple-500 hidden sm:inline font-medium">
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
                <h1 className="text-4xl sm:text-5xl leading-[120%]">
                  <span className="font-Charm">f</span>ormify any site with No
                  Code
                </h1>
                <p className="max-w-2xl mx-auto my-10 text-xl">
                  <span className="font-Charm">f</span>ormify is an{' '}
                  <span className="font-semibold italic">open source</span>{' '}
                  application that lets you{' '}
                  <span className="font-medium italic">collect</span>,{' '}
                  <span className="font-medium italic">manage</span> and{' '}
                  <span className="font-medium italic">embed</span> forms on any
                  site without writing single line of code
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

        {/* Explore */}
        <div className="p-4">
          <div id="explore" className="text-5xl text-center mb-20 p-4">
            🚀
          </div>
          <div className="grid place-content-center mb-20 md:mb-40">
            <div className="text-4xl md:text-5xl drop-shadow-md mb-4 text-center ">
              Create and manage multiple forms ⛏
            </div>
            <div className="-rotate-6 mt-10 md:mt-20 drop-shadow-md">
              <img
                alt="Fomify dashboard"
                src="/images/formify-dashboard.png"
                width={875}
                height={383}
              />
            </div>
          </div>
          <div className="grid place-content-center mb-20 md:mb-40">
            <div className="text-4xl md:text-5xl text-center mb-4">
              Access all submitted forms ♛
            </div>
            <div className="rotate-6 mt-10 md:mt-20 drop-shadow-md">
              <img
                alt="Fomify dashboard"
                src="/images/form-submissions-formify.png"
                width={875}
                height={383}
                data-aos="zoom-out-up"
              />
            </div>
          </div>
          <div className="grid place-content-center mb-20">
            <div className="text-4xl md:text-5xl text-center mb-4">
              ☼ Embed forms easily
            </div>
            <div className="rotate-0 mt-10 drop-shadow-md">
              <img
                alt="Fomify dashboard"
                src="/images/formify-embed.png"
                width={875}
                height={346}
                data-aos="zoom-out-up"
              />
            </div>
          </div>
        </div>

        {/* Support */}
        <div
          className="flex flex-col items-center space-y-6 mb-20"
          id="support"
        >
          <div className="text-3xl text-medium text-center">
            You can support <span className="font-Charm">f</span>ormify by bying
            a Coffee!
          </div>
          <Link href="https://www.buymeacoffee.com/basharath">
            <a
              target="_blank"
              className="m-0 border-none transition ease-in-out delay-150 hover:scale-110 drop-shadow-md hover:drop-shadow-lg"
            >
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style={{ height: 44, width: 160 }}
              />
            </a>
          </Link>
        </div>

        <Footer />
      </main>
    </>
  );
}
