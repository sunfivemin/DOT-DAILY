// 임시 데이터가 수정될 수 있도록 let으로 변경하고, 외부에서 직접 접근하지 못하도록 숨깁니다.
const tasksData: { [date: string]: Task[] } = {};

// 보류함(archive) 데이터
export let archiveTasks: Task[] = [];

export type TaskPriority = 'must' | 'should' | 'remind';

export interface Task {
  id: number;
  title: string;
  priority: TaskPriority;
  date: string; // YYYY-MM-DD
  done: boolean;
  retryCount: number;
}

export interface CreateTaskRequest {
  title: string;
  priority: TaskPriority;
  date: string; // YYYY-MM-DD
}

export interface UpdateTaskRequest {
  title?: string;
  priority?: TaskPriority;
  date?: string;
  done?: boolean;
}

let globalId = 1; // 전역적으로 유일한 id 생성

/**
 * 특정 날짜의 할 일 목록을 가져오는 가짜 API 함수.
 * 발표 데모를 위해 1초의 딜레이를 시뮬레이션합니다.
 * @param date - 할 일을 가져올 날짜
 */
export const getTasksByDate = async (date: Date): Promise<Task[]> => {
  console.log(`${date.toLocaleDateString()}의 할 일 데이터를 "서버"에서 가져오는 중...`);
  
  // API 호출을 시뮬레이션하기 위해 1초 대기
  await new Promise(resolve => setTimeout(resolve, 1000));

  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const filteredTasks = tasksData[dateString] || [];
  
  return JSON.parse(JSON.stringify(filteredTasks));
}

/**
 * 새로운 할 일을 생성하는 가짜 API 함수.
 * @param taskData - 생성할 할 일 데이터
 */
export const createTask = async (taskData: CreateTaskRequest): Promise<Task> => {
  console.log('새로운 할 일을 "서버"에서 생성하는 중...', taskData);
  
  // API 호출 시뮬레이션 (0.5초)
  await new Promise(resolve => setTimeout(resolve, 500));

  const dateString = taskData.date;
  const newTask: Task = { id: globalId++, ...taskData, done: false, retryCount: 0 };
  if (!tasksData[dateString]) tasksData[dateString] = [];
  tasksData[dateString].push(newTask);
  
  console.log('할 일 생성 성공!', newTask);
  return newTask;
};

/**
 * 할 일을 수정하는 가짜 API 함수.
 * @param id - 수정할 할 일의 ID
 * @param taskData - 수정할 데이터
 */
export const updateTask = async (id: number, taskData: UpdateTaskRequest): Promise<Task> => {
  console.log(`할 일(ID: ${id})을 "서버"에서 수정하는 중...`, taskData);
  
  // API 호출 시뮬레이션 (0.5초)
  await new Promise(resolve => setTimeout(resolve, 500));

  let foundTask: Task | undefined;
  let foundDate: string | undefined;
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      foundTask = tasksData[date][idx];
      foundDate = date;
      // 날짜가 변경되면 해당 날짜로 이동
      if (taskData.date && taskData.date !== date) {
        const updatedTask = { ...foundTask, ...taskData, date: taskData.date };
        tasksData[date].splice(idx, 1);
        if (!tasksData[taskData.date]) tasksData[taskData.date] = [];
        tasksData[taskData.date].push(updatedTask);
        return updatedTask;
      } else {
        tasksData[date][idx] = { ...foundTask, ...taskData };
        return tasksData[date][idx];
      }
    }
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 할 일을 삭제하는 가짜 API 함수.
 * @param id - 삭제할 할 일의 ID
 */
export const deleteTask = async (id: number): Promise<void> => {
  console.log(`할 일(ID: ${id})을 "서버"에서 삭제하는 중...`);
  
  // API 호출 시뮬레이션 (0.5초)
  await new Promise(resolve => setTimeout(resolve, 500));

  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      tasksData[date].splice(idx, 1);
      console.log('할 일 삭제 성공!');
      return;
    }
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 할 일의 완료 상태를 토글하는 가짜 API 함수.
 * @param id - 토글할 할 일의 ID
 */
export const toggleTaskStatus = async (id: number): Promise<Task> => {
  console.log(`할 일(ID: ${id}) 상태를 "서버"에서 토글하는 중...`);
  
  // API 호출 시뮬레이션 (0.5초)
  await new Promise(resolve => setTimeout(resolve, 500));

  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      const updatedTask = { ...tasksData[date][idx], done: !tasksData[date][idx].done };
      // 배열 자체도 새로 할당 (불변성 보장)
      tasksData[date] = [
        ...tasksData[date].slice(0, idx),
        updatedTask,
        ...tasksData[date].slice(idx + 1)
      ];
      console.log('상태 토글 성공!', updatedTask);
      console.log('tasksData 전체:', JSON.stringify(tasksData, null, 2));
      return updatedTask;
    }
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 할 일을 보류(미루기)하여 retryCount를 1 증가시키고, 날짜를 다음날로 이동하는 함수
 */
export const increaseRetryAndMoveToTomorrow = async (id: number): Promise<Task> => {
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      const task = tasksData[date][idx];
      // 날짜를 내일로 이동
      const tomorrow = new Date(task.date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      // retryCount 증가
      const updatedTask = { ...task, retryCount: task.retryCount + 1, date: tomorrowStr };
      // 기존 날짜에서 제거
      tasksData[date].splice(idx, 1);
      // 내일 날짜에 추가
      if (!tasksData[tomorrowStr]) tasksData[tomorrowStr] = [];
      tasksData[tomorrowStr].push(updatedTask);
      return updatedTask;
    }
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 할 일을 보류함으로 이동시키는 함수 (retryCount는 변경하지 않음)
 */
export const moveToArchive = async (id: number): Promise<Task> => {
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      const task = tasksData[date][idx];
      // 오늘 리스트에서 제거
      tasksData[date].splice(idx, 1);
      // 보류함에 추가
      archiveTasks.push(task);
      return task;
    }
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 보류함에서 오늘 할 일로 이동시키는 함수
 */
export const moveToTodayFromArchive = async (id: number | string): Promise<Task> => {
  const numId = Number(id);
  const idx = archiveTasks.findIndex(task => Number(task.id) === numId);
  if (idx !== -1) {
    const task = archiveTasks[idx];
    // 오늘 날짜로 이동
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const movedTask = { ...task, date: todayStr };
    // 보류함에서 제거
    archiveTasks.splice(idx, 1);
    // 오늘 할 일에 추가
    if (!tasksData[todayStr]) tasksData[todayStr] = [];
    tasksData[todayStr].push(movedTask);
    return movedTask;
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 보류함에서 할 일을 삭제하는 함수
 */
export const deleteArchiveTask = async (id: number): Promise<void> => {
  const idx = archiveTasks.findIndex(task => task.id === id);
  if (idx !== -1) {
    archiveTasks.splice(idx, 1);
    return;
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 보류함에서 할 일을 수정하는 함수
 */
export const updateArchiveTask = async (id: number, data: Partial<Task>): Promise<Task> => {
  const idx = archiveTasks.findIndex(task => task.id === id);
  if (idx !== -1) {
    // id가 data에 있으면 제거
    const { id: _ignore, ...rest } = data;
    const updated = { ...archiveTasks[idx], ...rest };
    updated.id = Number(archiveTasks[idx].id); // 원본 id를 number로 강제
    archiveTasks[idx] = updated;
    return archiveTasks[idx];
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
}; 