// 성능 모니터링 및 최적화 유틸리티

// 디바운스 함수
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 쓰로틀 함수
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 성능 측정
export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== "undefined" && window.performance) {
    const start = performance.now();
    fn();
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  } else {
    fn();
  }
}

// 레이지 로딩 헬퍼
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  if (typeof window === "undefined") return null;

  return new IntersectionObserver(callback, {
    rootMargin: "50px",
    threshold: 0.1,
    ...options,
  });
}

// 메모리 정리 헬퍼
export function cleanupAnimations() {
  // 애니메이션 정리
  const animations = document.getAnimations?.();
  animations?.forEach((animation) => {
    if (animation.playState === "finished") {
      animation.cancel();
    }
  });
}

// 성능 개선을 위한 React 최적화 헬퍼
export const performanceConfig = {
  // 애니메이션 설정
  animation: {
    duration: 0.2,
    easing: "ease-out",
    stiffness: 300,
    damping: 25,
  },

  // 디바운스 시간
  debounce: {
    search: 300,
    resize: 100,
    scroll: 16,
  },

  // 쓰로틀 시간
  throttle: {
    scroll: 16,
    resize: 100,
  },
};
