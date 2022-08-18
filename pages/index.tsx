/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { motion, useTransform, useScroll } from 'framer-motion';
import MacWrap from '../components/MacWrap';

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
          <div className="h-[80vh] relative">
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
                  <span className="font-medium italic">create</span>,{' '}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              style={{ margin: 'auto', zIndex: 1 }}
              height="249"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 1491 249"
              className="absolute w-full md:w-[1491px] -bottom-24 md:-bottom-4 z-0"
            >
              <g transform="translate(745.5,124.5) scale(1,-1) translate(-745.5,-124.5)">
                <linearGradient
                  id="lg-0.44885828191862953"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="0"
                >
                  <stop stopColor="#67b5ff" offset="0"></stop>
                  <stop stopColor="#9f60ff" offset="1"></stop>
                </linearGradient>
                <path d="" fill="url(#lg-0.44885828191862953)" opacity="0.4">
                  <animate
                    attributeName="d"
                    dur="11.11111111111111s"
                    repeatCount="indefinite"
                    keyTimes="0;0.333;0.667;1"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                    begin="0s"
                    values="M0 0L 0 203.59613326042813Q 149.1 153.80057595435804  298.2 131.34218447075546T 596.4 103.53397547816911T 894.6 131.60933558637242T 1192.8 72.33174291805594T 1491 23.86718426031257L 1491 0 Z;M0 0L 0 203.82505710843913Q 149.1 158.0753859246929  298.2 138.9152273786489T 596.4 158.06451657423958T 894.6 123.11869178654898T 1192.8 25.174673729685992T 1491 -8.948652807982853L 1491 0 Z;M0 0L 0 184.3713521185493Q 149.1 198.37956039177294  298.2 168.09288921838356T 596.4 131.38305501373264T 894.6 104.9057113235629T 1192.8 56.70285290242322T 1491 47.04025650852006L 1491 0 Z;M0 0L 0 203.59613326042813Q 149.1 153.80057595435804  298.2 131.34218447075546T 596.4 103.53397547816911T 894.6 131.60933558637242T 1192.8 72.33174291805594T 1491 23.86718426031257L 1491 0 Z"
                  ></animate>
                </path>
                <path d="" fill="url(#lg-0.44885828191862953)" opacity="0.4">
                  <animate
                    attributeName="d"
                    dur="11.11111111111111s"
                    repeatCount="indefinite"
                    keyTimes="0;0.333;0.667;1"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                    begin="-2.2222222222222223s"
                    values="M0 0L 0 233.86586103876547Q 149.1 189.25411458080671  298.2 159.3755466432891T 596.4 165.9582148963203T 894.6 100.21781784144636T 1192.8 54.437577818000136T 1491 76.07822270199941L 1491 0 Z;M0 0L 0 216.48709008549625Q 149.1 203.81956288393016  298.2 175.64114041322443T 596.4 86.74144161178432T 894.6 53.18080194539752T 1192.8 64.96176065905112T 1491 -5.294327238160605L 1491 0 Z;M0 0L 0 180.14801522210377Q 149.1 244.4840287616749  298.2 211.1313861062414T 596.4 107.8482829729949T 894.6 81.77007994947218T 1192.8 105.44519142843112T 1491 -6.682104799696901L 1491 0 Z;M0 0L 0 233.86586103876547Q 149.1 189.25411458080671  298.2 159.3755466432891T 596.4 165.9582148963203T 894.6 100.21781784144636T 1192.8 54.437577818000136T 1491 76.07822270199941L 1491 0 Z"
                  ></animate>
                </path>
                <path d="" fill="url(#lg-0.44885828191862953)" opacity="0.4">
                  <animate
                    attributeName="d"
                    dur="11.11111111111111s"
                    repeatCount="indefinite"
                    keyTimes="0;0.333;0.667;1"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                    begin="-4.444444444444445s"
                    values="M0 0L 0 235.90253257807757Q 149.1 185.96597412171712  298.2 163.67419435908008T 596.4 78.33229151296096T 894.6 51.95518707016028T 1192.8 63.83194670269506T 1491 -12.743378430671441L 1491 0 Z;M0 0L 0 179.2330990080043Q 149.1 235.42588691169212  298.2 205.13290762992455T 596.4 113.60494298782439T 894.6 102.12479718449165T 1192.8 26.967207227378083T 1491 14.399281324504273L 1491 0 Z;M0 0L 0 177.4906656192456Q 149.1 160.6948109303776  298.2 138.9467634134083T 596.4 168.9713810142458T 894.6 109.82460014353622T 1192.8 55.35879803570987T 1491 47.25075451641564L 1491 0 Z;M0 0L 0 235.90253257807757Q 149.1 185.96597412171712  298.2 163.67419435908008T 596.4 78.33229151296096T 894.6 51.95518707016028T 1192.8 63.83194670269506T 1491 -12.743378430671441L 1491 0 Z"
                  ></animate>
                </path>
                <path d="" fill="url(#lg-0.44885828191862953)" opacity="0.4">
                  <animate
                    attributeName="d"
                    dur="11.11111111111111s"
                    repeatCount="indefinite"
                    keyTimes="0;0.333;0.667;1"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                    begin="-6.666666666666666s"
                    values="M0 0L 0 239.24643183829727Q 149.1 224.43185798217237  298.2 190.47547898983873T 596.4 128.73373318287025T 894.6 82.36453756063872T 1192.8 16.425941548945502T 1491 -2.3644804230814316L 1491 0 Z;M0 0L 0 184.65758778653955Q 149.1 198.03503632069481  298.2 158.7595905396415T 596.4 162.8051311517063T 894.6 67.24928139469324T 1192.8 78.12889159041674T 1491 52.73985792082863L 1491 0 Z;M0 0L 0 178.06876464473675Q 149.1 178.48391964899884  298.2 157.1984813148014T 596.4 149.69567774648658T 894.6 123.5213367481477T 1192.8 35.644644547492135T 1491 55.12385660550035L 1491 0 Z;M0 0L 0 239.24643183829727Q 149.1 224.43185798217237  298.2 190.47547898983873T 596.4 128.73373318287025T 894.6 82.36453756063872T 1192.8 16.425941548945502T 1491 -2.3644804230814316L 1491 0 Z"
                  ></animate>
                </path>
                <path d="" fill="url(#lg-0.44885828191862953)" opacity="0.4">
                  <animate
                    attributeName="d"
                    dur="11.11111111111111s"
                    repeatCount="indefinite"
                    keyTimes="0;0.333;0.667;1"
                    calcMode="spline"
                    keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1"
                    begin="-8.88888888888889s"
                    values="M0 0L 0 208.9130963858152Q 149.1 213.37148291508194  298.2 190.81619959133943T 596.4 134.57966663830166T 894.6 90.45608057881151T 1192.8 35.26974414268909T 1491 17.60629415789674L 1491 0 Z;M0 0L 0 201.30325336346922Q 149.1 204.17238229005468  298.2 174.8546329946922T 596.4 90.53013529425557T 894.6 92.40888766623956T 1192.8 23.67515380421679T 1491 -37.78080797029426L 1491 0 Z;M0 0L 0 168.086062272001Q 149.1 234.525121632506  298.2 198.917385281949T 596.4 132.08905401615118T 894.6 103.14385993702734T 1192.8 61.213846283299915T 1491 10.99444801643773L 1491 0 Z;M0 0L 0 208.9130963858152Q 149.1 213.37148291508194  298.2 190.81619959133943T 596.4 134.57966663830166T 894.6 90.45608057881151T 1192.8 35.26974414268909T 1491 17.60629415789674L 1491 0 Z"
                  ></animate>
                </path>
              </g>
            </svg>
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
    </>
  );
}
