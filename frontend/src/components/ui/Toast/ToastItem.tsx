'use client';

import { motion } from 'framer-motion';

export default function ToastItem({ message }: { message: string }) {
  return (
    <motion.div
      className="bg-black text-white text-sm px-4 py-2 rounded shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {message}
    </motion.div>
  );
}
