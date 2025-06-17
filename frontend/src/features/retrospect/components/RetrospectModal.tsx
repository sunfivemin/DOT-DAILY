'use client';

import { Button } from '@/components/ui/Button';
import EmotionSelector from './EmotionSelector';

interface RetrospectModalProps {
  isOpen: boolean;
  selectedEmotion: string;
  retrospectText: string;
  onEmotionSelect: (emotion: string) => void;
  onTextChange: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function RetrospectModal({
  isOpen,
  selectedEmotion,
  retrospectText,
  onEmotionSelect,
  onTextChange,
  onClose,
  onSubmit
}: RetrospectModalProps) {
  return (
    <div className="
      flex-1 flex flex-col 
      justify-between
      px-4 py-6
    ">
      <div>
        <button
          onClick={onClose}
        >
          <img src="/back-arrow.svg" alt="회고 이모션" />
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
        variant="outline"
        className="
          w-full
          bg-black
          hover:bg-gray-700 
          text-white
          disabled:bg-gray-400 
          disabled:border-none
          disabled:cursor-not-allowed
        "
      />
    </div>
  );
}
