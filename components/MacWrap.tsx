/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { motion } from 'framer-motion';

interface MacWrapProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  url: string;
}

// absolute top-1/2 -translate-y-1/2 left-4 h-auto
export default function MacWrap({
  src,
  alt,
  width,
  height,
  url,
}: MacWrapProps) {
  return (
    <>
      <motion.div
        className="mt-10 drop-shadow-md"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          ease: 'backOut',
          duration: 0.8,
          delay: 0.3,
        }}
      >
        <div className=" rounded-2xl bg-gray-300 overflow-hidden">
          <div className="h-12 bg-gray-50 relative flex justify-center items-center">
            <div className="absolute top-4 left-4 h-auto -translate-y-1 sm:-translate-y-0.5">
              <span className="w-3 h-3 sm:w-4 sm:h-4 bg-rose-500 rounded-full inline-block mr-2"></span>
              <span className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-500 rounded-full inline-block mr-2"></span>
              <span className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full inline-block"></span>
            </div>
            <div className="rounded-full bg-gray-200 w-1/2 sm:w-2/5 px-3 py-0.5 sm:py-1 flex items-center ">
              <span className="mr-2">
                <svg
                  fill="#15803d"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 30 30"
                  width="16px"
                  height="16px"
                >
                  {' '}
                  <path d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 22 11 L 22 9 C 22 5.2715823 19.036581 2.2685653 15.355469 2.0722656 A 1.0001 1.0001 0 0 0 15 2 z M 15 4 C 17.773666 4 20 6.2263339 20 9 L 20 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 z" />
                </svg>
              </span>
              <span className="text-sm sm:text-base text-ellipsis overflow-hidden whitespace-nowrap">
                {url}
              </span>
            </div>
          </div>
          <div className="select-none">
            <img
              alt={alt}
              src={src}
              width={width || 875}
              height={height || 383}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
