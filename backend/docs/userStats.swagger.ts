export const userStatsSwagger = {
  '/api/v1/user/stats': {
    get: {
      summary: '마이페이지 유저 통계 조회',
      tags: ['User'],
      responses: {
        200: {
          description: '유저 프로필과 통계 반환',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    type: 'object',
                    properties: {
                      username: { type: 'string', example: 'johndoe' },
                      email: { type: 'string', example: 'johndoe@example.com' },
                    },
                  },
                  todos: {
                    type: 'object',
                    example: {
                      success: 5,
                      retry: 2,
                      archive: 3,
                      pending: 1,
                    },
                  },
                  stickers: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        stickerId: { type: 'integer', example: 1 },
                        label: { type: 'string', example: '좋음' },
                        emoji: { type: 'string', example: '😊' },
                        count: { type: 'integer', example: 10 },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        500: { description: '서버 에러' },
      },
    },
  },
};
