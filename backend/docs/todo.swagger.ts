export const todoSwagger = {
  '/api/v1/todos': {
    post: {
      summary: '투두 생성',
      tags: ['Todo'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'date'],
              properties: {
                title: {
                  type: 'string',
                  example: 'TS 책 5장 블로그 정리하기',
                },
                date: {
                  type: 'string',
                  example: '2025-06-26',
                },
                status: {
                  type: 'string',
                  enum: ['pending', 'success', 'retry', 'archive'],
                  example: 'pending',
                },
                priority: {
                  type: 'string',
                  enum: ['must', 'should', 'remind'],
                  example: 'must',
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: '투두 생성 성공',
        },
        400: {
          description: '유효성 검사 실패 (Zod)',
        },
        500: {
          description: '서버 에러',
        },
      },

      get: {
        summary: '전체 투두 목록 조회',
        tags: ['Todos'],
        responses: {
          200: { description: '전체 투두 목록 조회 성공' },
          500: { description: '서버 에러' },
        },
      },
    },
    '/api/v1/todos/by-date': {
      get: {
        summary: '날짜별 투두 목록 조회',
        tags: ['Todos'],
        parameters: [
          {
            in: 'query',
            name: 'date',
            required: true,
            schema: { type: 'string', example: '2025-07-10' },
          },
        ],
        responses: {
          200: { description: '날짜별 투두 목록 조회 성공' },
          400: { description: '날짜 누락' },
          500: { description: '서버 에러' },
        },
      },
    },
    '/api/v1/todos/{id}': {
      put: {
        summary: '투두 수정',
        tags: ['Todos'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string', example: '수정된 제목' },
                  status: {
                    type: 'string',
                    enum: ['pending', 'success', 'retry', 'archive'],
                    example: 'success',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: '투두 수정 성공' },
          404: { description: '투두 없음' },
          500: { description: '서버 에러' },
        },
      },
      delete: {
        summary: '투두 삭제',
        tags: ['Todos'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', example: 1 },
          },
        ],
        responses: {
          200: { description: '투두 삭제 성공' },
          404: { description: '투두 없음' },
          500: { description: '서버 에러' },
        },
      },
    },
  },
};
