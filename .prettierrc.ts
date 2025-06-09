import type { Options } from 'prettier';

const config: Options = {
  // 들여쓰기 간격 (2칸)
  tabWidth: 2,

  // 탭 대신 스페이스 사용
  useTabs: false,

  // 세미콜론 붙이기 여부
  semi: true,

  // 작은 따옴표 사용 ('hello' vs "hello")
  singleQuote: true,

  // JSX에서도 작은 따옴표 사용
  jsxSingleQuote: true,

  // 객체나 배열에서 마지막 요소 뒤에 쉼표 추가 여부
  trailingComma: 'es5', // 가능하면 쉼표 붙임

  // 객체 키의 따옴표 사용 여부 ("key": vs key:)
  quoteProps: 'as-needed',

  // 화살표 함수 매개변수 괄호 사용 여부
  arrowParens: 'avoid',

  // 줄바꿈 기준 너비
  printWidth: 80,
};

export default config;