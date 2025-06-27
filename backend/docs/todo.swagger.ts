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
    },
  },
};
