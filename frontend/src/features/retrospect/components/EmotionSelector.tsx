import { EMOTIONS } from '@/constants/emotion';

interface EmotionSelectorProps {
  selectedEmotion: string;
  onEmotionSelect: (emotion: string) => void;
}

export default function EmotionSelector({ selectedEmotion, onEmotionSelect }: EmotionSelectorProps) {
  return (
    <section aria-label="감정 선택">
      <h3 className="mt-6 mb-4">
        오늘 하루를 스마일카드 표현해 보세요
      </h3>

      <div className="flex gap-6 mb-8">
        {EMOTIONS.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => onEmotionSelect(emotion.id)}
            className="flex flex-col items-center gap-2"
          >
            <img
              alt={emotion.label}
              src={selectedEmotion === emotion.id ? `/${emotion.id}-on.svg` : `/${emotion.id}-off.svg`}
            />
            <span className="text-xs text-gray-600">
              {emotion.label}
            </span>
          </button>
        ))}
      </div>
    </section >
  );
}