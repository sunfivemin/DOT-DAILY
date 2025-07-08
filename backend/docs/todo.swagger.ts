export const todoSwagger = {
  '/api/v1/todos': {
    post: {
      summary: '투두 생성',
      tags: ['Todos'],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title', 'date'],
              properties: {
                title: { type: 'string', example: '오늘 공부하기' },
                date: { type: 'string', format: 'date', example: '2025-07-08' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: '투두 생성 성공' },
        401: { description: '인증 실패' },
        500: { description: '서버 에러' },
      },
    },
    get: {
      summary: '투두 전체 조회',
      tags: ['Todos'],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: '투두 목록 반환',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    title: { type: 'string', example: '운동하기' },
                    date: {
                      type: 'string',
                      format: 'date',
                      example: '2025-07-08',
                    },
                  },
                },
              },
            },
          },
        },
        401: { description: '인증 실패' },
      },
    },
  },
  '/api/v1/todos/by-date': {
    get: {
      summary: '날짜별 투두 조회',
      tags: ['Todos'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'date',
          in: 'query',
          required: true,
          schema: { type: 'string', format: 'date' },
          example: '2025-07-08',
        },
      ],
      responses: {
        200: { description: '해당 날짜 투두 반환' },
        401: { description: '인증 실패' },
      },
    },
  },
  '/api/v1/todos/{id}': {
    put: {
      summary: '투두 수정',
      tags: ['Todos'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['title'],
              properties: {
                title: { type: 'string', example: '운동 완료하기' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: '투두 수정 성공' },
        401: { description: '인증 실패' },
      },
    },
    delete: {
      summary: '투두 삭제',
      tags: ['Todos'],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
          example: 1,
        },
      ],
      responses: {
        200: { description: '투두 삭제 성공' },
        401: { description: '인증 실패' },
      },
    },
  },
};
