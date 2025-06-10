export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-white text-gray-900">
      {/* Pretendard Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">
          📦 Pretendard 가변 폰트 테스트
        </h2>
        <div className="space-y-2">
          {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(weight => (
            <p
              key={weight}
              style={{ fontWeight: weight }}
              className="font-sans text-lg"
            >
              Pretendard {weight} - 그 해 우리는 벚꽃 아래서 미래를 이야기했다.
            </p>
          ))}
        </div>
      </section>

      {/* 온글잎 김콩해 Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">
          🍀 온글잎 김콩해 폰트 테스트
        </h2>
        <p className="font-kkonghae text-2xl leading-relaxed">
          그 해 우리는 벚꽃 아래서 미래를 이야기했다. 함께 걷던 그 길 위에서
          우리는 웃고 또 울었다.
        </p>
      </section>
    </main>
  );
}
