export const dailyReviewSwagger = {
  '/api/v1/daily-reviews': {
    post: {
      summary: '하루 회고 등록',
      tags: ['DailyReviews'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['date', 'stickerId', 'memo'],
              properties: {
                date: { type: 'string', example: '2024-07-18' },
                stickerId: { type: 'integer', example: 1 },
                memo: { type: 'string', example: '오늘 하루가 즐거웠다!' },
                compareNote: { type: 'string', example: '어제보다 나았다.' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: '하루 회고 등록 성공' },
        500: { description: '서버 에러' },
      },
    },
  },
  '/api/v1/daily-reviews/{date}': {
    get: {
      summary: '특정 날짜의 하루 회고 조회',
      tags: ['DailyReviews'],
      parameters: [
        {
          name: 'date',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '2024-07-18' },
        },
      ],
      responses: {
        200: { description: '회고 조회 성공' },
        404: { description: '회고가 존재하지 않음' },
        500: { description: '서버 에러' },
      },
    },
    put: {
      summary: '특정 날짜의 하루 회고 수정',
      tags: ['DailyReviews'],
      parameters: [
        {
          name: 'date',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '2024-07-18' },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                stickerId: { type: 'integer', example: 2 },
                memo: { type: 'string', example: '수정된 메모입니다.' },
                compareNote: { type: 'string', example: '수정된 비교 메모' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: '회고 수정 성공' },
        500: { description: '서버 에러' },
      },
    },
    delete: {
      summary: '특정 날짜의 하루 회고 삭제',
      tags: ['DailyReviews'],
      parameters: [
        {
          name: 'date',
          in: 'path',
          required: true,
          schema: { type: 'string', example: '2024-07-18' },
        },
      ],
      responses: {
        200: { description: '회고 삭제 성공' },
        500: { description: '서버 에러' },
      },
    },
  },
  '/api/v1/daily-reviews/month': {
    get: {
      summary: '한달치 회고 조회',
      tags: ['DailyReviews'],
      parameters: [
        {
          name: 'year',
          in: 'query',
          required: true,
          schema: { type: 'integer', example: 2024 },
          description: '조회할 연도 (예: 2024)',
        },
        {
          name: 'month',
          in: 'query',
          required: true,
          schema: { type: 'integer', example: 7 },
          description: '조회할 월 (예: 7)',
        },
      ],
      responses: {
        200: {
          description: '한달치 회고 목록 반환',
        },
        400: {
          description: '쿼리 파라미터 누락',
        },
        500: {
          description: '서버 오류',
        },
      },
    },
  },
};
