'use client';

import { Button } from '@/components/ui/Button/Button';
import EmotionSelector from './EmotionSelector';
import { motion } from 'framer-motion';

interface RetrospectModalProps {
  selectedEmotion: string;
  retrospectText: string;
  onEmotionSelect: (emotion: string) => void;
  onTextChange: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function RetrospectModal({
  selectedEmotion,
  retrospectText,
  onEmotionSelect,
  onTextChange,
  onClose,
  onSubmit
}: RetrospectModalProps) {
  return (
    <motion.div
      key="retrospect-modal"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'tween', duration: 0.3 }}
      className="
        absolute inset-y-0 z-10
        flex flex-col justify-between
        top-[54px] bottom-[61px]
        w-[430px]
        bg-white
        px-4 py-6
        "
    >
      <div>
        <button onClick={onClose}>
          <img src="/back.svg" alt="회고 이모션" />
        </button>
        <EmotionSelector
          selectedEmotion={selectedEmotion}
          onEmotionSelect={onEmotionSelect}
        />

        <section aria-label="회고 작성">
          <label className="font-kkonghae">2025년 6월 18일 - zustand로 날짜</label>
          <textarea
            value={retrospectText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="오늘 하루는 어떠셨나요? 자유롭게 작성해보세요."
            maxLength={3000}
            className="
              font-kkonghae 
              w-full h-40 p-4 mt-2
              border border-gray-200 rounded-lg
              resize-none
            "
          />
          <div className="text-right text-xs text-gray-400">
            {retrospectText.length}/3000
          </div>
        </section>
      </div>

      <Button
        label="오늘 회고 등록하기"
        disabled={!selectedEmotion || !retrospectText.trim()}
        onClick={onSubmit}
        variant="solid" // variant를 outline에서 solid로 변경
        className="
          disabled:bg-gray-400 
          disabled:border-none
          disabled:cursor-not-allowed
        "
      />
    </motion.div>
  );
}
