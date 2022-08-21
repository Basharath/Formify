import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import YoutubeEmbed from './YoutubeEmbed';

interface DemoProps {
  show: boolean;
  hide: () => void;
}

export default function Demo({ show, hide }: DemoProps) {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      {show && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-purple-300/70 via-purple-300/70 to-blue-400/70 flex justify-center items-center z-100 overflow-hidden p-4"
          onClick={hide}
          initial={{ opacity: 0, y: '-100vh' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: '100vh' }}
          transition={{
            duration: 0.8,
            type: 'spring',
            damping: 25,
            stiffness: 500,
          }}
        >
          <YoutubeEmbed id="ddXu8QpzpO8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
