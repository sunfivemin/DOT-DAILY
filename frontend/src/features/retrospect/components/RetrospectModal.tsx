'use client';

import { Button } from '@/components/ui/Button/Button';
import EmotionSelector from './EmotionSelector';
import { motion } from 'framer-motion';
import { useDateStore } from '@/store/useDateStore';
import { formatDisplayDate } from '../utils';
import { useState } from 'react';
import Image from 'next/image';
import { Emotion } from '@/constants/emotion';

interface RetrospectModalProps {
  onClose: () => void;
  onSubmit: (emotion: Emotion['id'] | '', retrospectText: string) => void;
}

export default function RetrospectModal({ onClose, onSubmit }: RetrospectModalProps) {
  const { selectedDate } = useDateStore();
  const [retrospectText, setRetrospectText] = useState<string>(''); // 추후 zustand
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion['id'] | ''>('');

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRetrospectText(e.target.value);
  }

  return (
    <motion.div
      key="retrospect-modal"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="flex flex-col flex-1"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <button onClick={onClose} aria-label="뒤로가기">
          <Image src="/back.svg" alt="back" width={24} height={24} />
        </button>
        <h2 className="text-sm text-gray-400">오늘 회고</h2>
        <div className="w-6" />
      </div>

      <div className="flex-1 px-6 py-4">
        <EmotionSelector selectedEmotion={selectedEmotion} setSelectedEmotion={setSelectedEmotion} />
        <section aria-label="회고 작성">
          <label className="font-kkonghae">{formatDisplayDate(selectedDate)}</label>
          <textarea
            value={retrospectText}
            onChange={onTextChange}
            placeholder="오늘 하루는 어떠셨나요? 자유롭게 작성해보세요."
            maxLength={3000}
            className="font-kkonghae w-full h-40 p-4 mt-2 border border-gray-200 rounded-lg resize-none"
          />
          <div className="text-right text-xs text-gray-400">
            {retrospectText.length}/3000
          </div>
        </section>
      </div>

      <div className="px-4 pb-6">
        <Button
          label="오늘 회고 등록하기"
          size="lg"
          variant="primary"
          disabled={!selectedEmotion || !retrospectText.trim()}
          className="
            w-full 
            rounded-full
            disabled:bg-gray-400 
            disabled:border-none
            disabled:cursor-not-allowed
          "
          onClick={() => onSubmit(selectedEmotion, retrospectText)}
        />
      </div>
    </motion.div>
  );
}
