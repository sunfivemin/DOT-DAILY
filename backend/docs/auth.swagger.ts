export const authSwagger = {
  '/api/v1/auth/signup': {
    post: {
      summary: '로컬 회원가입',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['username', 'email', 'password', 'confirm_password'],
              properties: {
                username: { type: 'string', example: 'johndoe' },
                email: { type: 'string', example: 'johndoe@example.com' },
                password: { type: 'string', example: 'password123' },
                confirm_password: { type: 'string', example: 'password123' },
              },
            },
          },
        },
      },
      responses: {
        201: { description: '회원가입 성공' },
        422: { description: '유효성 검사 실패' },
        500: { description: '서버 에러' },
      },
    },
  },
  '/api/v1/auth/login': {
    post: {
      summary: '로컬 로그인',
      tags: ['Auth'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: { type: 'string', example: 'johndoe@example.com' },
                password: { type: 'string', example: 'password123' },
              },
            },
          },
        },
      },
      responses: {
        200: { description: '로그인 성공 및 토큰 반환' },
        401: { description: '인증 실패' },
        422: { description: '유효성 검사 실패' },
        500: { description: '서버 에러' },
      },
    },
  },
};
