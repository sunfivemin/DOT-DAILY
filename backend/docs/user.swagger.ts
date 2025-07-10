export const userSwagger = {
  '/api/v1/user/stats': {
    get: {
      summary: '마이페이지 유저 통계 조회',
      tags: ['User'],
      responses: {
        200: {
          description: '유저의 투두 상태별 통계 및 스티커 통계',
        },
        500: { description: '서버 에러' },
      },
    },
  },
};
