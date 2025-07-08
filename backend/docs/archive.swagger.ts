export const archiveSwagger = {
  '/api/v1/archive': {
    get: {
      summary: '보관함 투두 목록 조회',
      tags: ['Archive'],
      responses: {
        200: { description: '조회 성공' },
        401: { description: '인증 필요' },
      },
    },
  },
  '/api/v1/archive/{id}': {
    patch: {
      summary: '보관함 투두 수정',
      tags: ['Archive'],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                title: { type: 'string', example: '수정된 투두' },
                date: { type: 'string', example: '2024-07-06' },
                priority: {
                  type: 'string',
                  enum: ['must', 'should', 'remind'],
                  example: 'should',
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: '수정 성공' },
        400: { description: '잘못된 요청' },
      },
    },
    delete: {
      summary: '보관함 투두 삭제',
      tags: ['Archive'],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: {
        200: { description: '삭제 성공' },
        400: { description: '잘못된 요청' },
      },
    },
  },
  '/api/v1/archive/{id}/restore': {
    patch: {
      summary: '보관함 투두를 오늘의 할일로 복구 (오늘 날짜로 이관)',
      tags: ['Archive'],
      parameters: [
        { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
      ],
      responses: {
        200: { description: '복구 성공' },
        400: { description: '보관함에 없거나 잘못된 요청' },
      },
    },
  },
};
