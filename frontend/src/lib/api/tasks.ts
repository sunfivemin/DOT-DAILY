// 임시 데이터가 수정될 수 있도록 let으로 변경하고, 외부에서 직접 접근하지 못하도록 숨깁니다.
let tasksData = {
    must: [
      { id: 'must-1', label: '6.2일 강의 완강', done: false, retryCount: 1 },
      { id: 'must-2', label: '투표하기', done: true },
      { id: 'must-3', label: '프로젝트 기획서 초안 작성', done: false },
      { id: 'must-4', label: '팀 회의 준비', done: false },
    ],
    should: [
      { id: 'should-1', label: '건전지 사기', done: false },
      { id: 'should-2', label: '회의내용 정리하기', done: true },
      { id: 'should-3', label: '운동화 세탁 맡기기', done: true },
      { id: 'should-4', label: '서점 들러서 책 찾아보기', done: false },
      { id: 'should-5', label: '점심 약속 장소 예약', done: true },
    ],
    remind: [
      { id: 'remind-1', label: '엄마한테 전화하기', done: false },
      { id: 'remind-2', label: '5km 러닝하기', done: true },
      { id: 'remind-3', label: 'OTT 구독 해지하기', done: false },
      { id: 'remind-4', label: '휴가 계획 세우기', done: false },
      { id: 'remind-5', label: '친구 생일 선물 주문', done: true },
      { id: 'remind-6', label: '영양제 챙겨먹기', done: true },
    ],
  };

  export type TaskPriority = 'must' | 'should' | 'remind';

  export interface Task {
      id: string;
      label: string;
      done: boolean;
      retryCount?: number;
  }
  
  export interface Tasks {
    must: Task[];
    should: Task[];
    remind: Task[];
  }

/**
 * 특정 날짜의 할 일 목록을 가져오는 가짜 API 함수.
 * 발표 데모를 위해 1초의 딜레이를 시뮬레이션합니다.
 * @param date - 할 일을 가져올 날짜 (현재는 사용되지 않음)
 */
export const getTasksByDate = async (date: Date): Promise<Tasks> => {
    console.log(`${date.toLocaleDateString()}의 할 일 데이터를 "서버"에서 가져오는 중...`);
    
    // API 호출을 시뮬레이션하기 위해 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 실제로는 date를 사용해 해당 날짜의 데이터를 필터링해야 합니다.
    // 객체의 복사본을 반환하여 실제 API처럼 동작하게 만듭니다.
    return JSON.parse(JSON.stringify(tasksData));
}

/**
 * 할 일의 완료 상태를 업데이트하는 가짜 API 함수.
 * @param {object} params
 * @param {TaskPriority} params.priority - 업데이트할 태스크의 우선순위
 * @param {string} params.id - 업데이트할 태스크의 ID
 * @param {boolean} params.done - 새로운 완료 상태
 */
export const updateTaskStatus = async ({
  priority,
  id,
  done,
}: {
  priority: TaskPriority;
  id: string;
  done: boolean;
}): Promise<{ success: boolean }> => {
  console.log(
    `"서버"에서 ${priority} 우선순위의 태스크(ID: ${id}) 상태를 ${done}으로 업데이트하는 중...`
  );
  // API 호출 시뮬레이션 (0.5초)
  await new Promise(resolve => setTimeout(resolve, 500));

  // 메모리 내 데이터 직접 수정
  const taskList = tasksData[priority];
  const taskIndex = taskList.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    tasksData[priority][taskIndex].done = done;
    console.log('업데이트 성공!');
    return { success: true };
  } else {
    console.error('해당 태스크를 찾을 수 없습니다.');
    // 실제 앱에서는 에러 처리를 해야 합니다.
    return { success: false };
  }
}; 