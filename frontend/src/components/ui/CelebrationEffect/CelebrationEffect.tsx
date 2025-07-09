'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface CelebrationEffectProps {
  show: boolean;
  onComplete?: () => void;
}

// 파티클 하나의 컴포넌트
const Particle = ({ delay = 0 }: { delay?: number }) => {
  const randomX = Math.random() * 200 - 100; // -100 ~ 100
  const randomY = Math.random() * 200 - 100; // -100 ~ 100
  const randomRotate = Math.random() * 360;
  const randomScale = 0.5 + Math.random() * 0.5; // 0.5 ~ 1.0
  
  const emojis = ['🎉', '✨', '🎊', '⭐', '💫', '🌟'];
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <motion.div
      className="absolute text-2xl pointer-events-none"
      initial={{ 
        x: 0, 
        y: 0, 
        opacity: 1, 
        scale: 0,
        rotate: 0 
      }}
      animate={{ 
        x: randomX, 
        y: randomY, 
        opacity: 0, 
        scale: randomScale,
        rotate: randomRotate 
      }}
      transition={{ 
        duration: 1.5, 
        delay,
        ease: "easeOut" 
      }}
    >
      {emoji}
    </motion.div>
  );
};

export default function CelebrationEffect({ show, onComplete }: CelebrationEffectProps) {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    if (show) {
      // 파티클 생성
      setParticles(Array.from({ length: 8 }, (_, i) => i));
      
      // 축하 효과 완료 후 콜백 호출
      const timer = setTimeout(() => {
        onComplete?.();
        setParticles([]);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 중앙 축하 메시지 */}
          <motion.div
            className="text-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20,
              delay: 0.2 
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-yellow-400">
                             <motion.div
                 className="text-4xl mb-2"
                 animate={{ 
                   rotate: [0, 10, 0],
                   scale: [1, 1.1, 1]
                 }}
                 transition={{ 
                   duration: 0.6,
                   repeat: 1,
                   delay: 0.5,
                   type: "tween"
                 }}
               >
                🎉
              </motion.div>
              <motion.h2 
                className="text-xl font-bold text-gray-800 mb-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                모든 할 일 완료!
              </motion.h2>
              <motion.p 
                className="text-sm text-gray-600 font-kkonghae"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                오늘 하루도 수고하셨습니다 ✨
              </motion.p>
            </div>
          </motion.div>

          {/* 파티클 효과 */}
          <div className="absolute inset-0 flex items-center justify-center">
            {particles.map((index) => (
              <Particle key={index} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 