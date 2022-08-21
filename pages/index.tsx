/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion, useTransform, useScroll } from 'framer-motion';
import MacWrap from '../components/MacWrap';
import Demo from '../components/Demo';

const rotateVariants = {
  outView: { opacity: 0, scale: 0.5 },
  inView: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'backOut',
      duration: 0.8,
      delay: 0.3,
    },
  },
  inViewFirst: {},
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 0.3], [30, 0]);
  const [show, setShow] = useState(false);

  const hideDemo = () => setShow(false);

  return (
    <>
      <Header title="Formify" />

      <main className="bg-gray-50 overflow-hidden">
        <div className="py-2 pt-7 max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center sm:container mx-3 px-2 md:px-8">
            <Link href="/">
              <a className="border-none select-none text-4xl">
                <Image
                  src="/images/logo.svg"
                  width={150}
                  height={54}
                  alt="Formify logo"
                />
              </a>
            </Link>
            <ul className="flex items-center mb-0 space-x-20 text-black text-[1.1rem]">
              <Link href="/login">
                <a className="border-none hover:text-purple-500 sm:inline font-medium hidden">
                  <li>Get started</li>
                </a>
              </Link>
              <Link href="https://github.com/Basharath/Formify">
                <a
                  className="border-none hover:text-purple-500 sm:inline font-medium"
                  target="_blank"
                >
                  <li>Github</li>
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
          <div className="h-[80vh] bg-hero-image relative">
            <div className="flex items-center justify-center md:p-10 md:px-14 rounded-2xl mt-10 mb-16 md:mb-20 px-4">
              <div className="text-center text-gray-800">
                <h1 className="text-4xl sm:text-5xl leading-[120%]">
                  <span className="font-Charm">f</span>ormify any site with No
                  Code
                </h1>
                <p className="max-w-2xl mx-auto my-10 text-xl">
                  <span className="font-Charm">f</span>ormify is an{' '}
                  <span className="font-semibold italic">open source</span>{' '}
                  application that lets you{' '}
                  <span className="font-medium italic">create</span>,{' '}
                  <span className="font-medium italic">manage</span> and{' '}
                  <span className="font-medium italic">embed</span> forms on any
                  site without writing single line of code
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-x-5 sm:space-y-0">
                  <div className="border-none text-black hover:text-gray-50">
                    <button
                      onClick={() => setShow(true)}
                      className="p-2.5 px-8  w-full md:w-auto rounded-full border border-blue-500 hover:bg-blue-500"
                    >
                      🪄 Demo
                    </button>
                  </div>
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
            {/* Product hunt */}
            <div className="flex justify-center">
              <a
                href="https://www.producthunt.com/products/formify?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-formify"
                target="_blank"
                rel="noopener noreferrer"
                className="border-none shadow-md hover:shadow-lg overflow-hidden rounded-lg"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=356112&theme=light&period=daily"
                  alt="Formify - Create&#0044;&#0032;manage&#0032;and&#0032;embed&#0032;forms&#0032;on&#0032;static&#0032;sites&#0032;with&#0032;no&#0032;code | Product Hunt"
                  style={{ width: 250, height: 54 }}
                  width="250"
                  height="54"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-image">
          {/* Explore */}
          <div className="p-4">
            <div id="explore" className="text-5xl text-center mb-14 p-4">
              🚀
            </div>
            <div
              className="grid place-content-center mb-20 md:mb-40"
              style={{ perspective: 100 }}
            >
              <div className="text-4xl md:text-5xl drop-shadow-md mb-4 text-center ">
                Create and manage multiple forms ⛏
              </div>
              <motion.div
                style={{
                  rotateX: rotate,
                }}
              >
                <MacWrap
                  alt="Fomify dashboard"
                  src="/images/formify-dashboard.png"
                  url="https://formify.vercel.app/dashboard"
                />
              </motion.div>
            </div>
            <div className="grid place-content-center mb-20 md:mb-40">
              <div className="text-4xl md:text-5xl text-center mb-4">
                Access all submitted forms 🦾
              </div>
              <motion.div
                className="rotate-6"
                variants={rotateVariants}
                initial="outView"
                whileInView="inView"
              >
                <MacWrap
                  alt="Fomify dashboard"
                  src="/images/form-submissions-formify.png"
                  width={875}
                  height={383}
                  url="https://formify.vercel.app/form/946ea95d-c79b"
                />
              </motion.div>
            </div>
            <div className="grid place-content-center mb-20">
              <div className="text-4xl md:text-5xl text-center mb-4">
                Embed forms easily 🍭
              </div>
              <motion.div
                className="rotate-0"
                variants={rotateVariants}
                initial="outView"
                whileInView="inView"
              >
                <MacWrap
                  alt="Fomify dashboard"
                  src="/images/formify-embed.png"
                  // width={875}
                  // height={346}
                  url="https://codepen.io/Basharath/pen/KKoGJaZ"
                />
              </motion.div>
            </div>
          </div>

          {/* Support */}
          <motion.div
            className="flex flex-col items-center space-y-6 mb-20 p-4"
            id="support"
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 4,
              delay: 0.3,
            }}
          >
            <div className="text-3xl text-medium text-center">
              You can support <span className="font-Charm">f</span>ormify by
              buying a Coffee!
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
          </motion.div>

          <Footer />
        </div>
      </main>

      {/* Youtube demo */}
      <Demo show={show} hide={hideDemo} />
    </>
  );
}
