// 임시 데이터가 수정될 수 있도록 let으로 변경하고, 외부에서 직접 접근하지 못하도록 숨깁니다.
const tasksData: { [date: string]: Task[] } = {};

// 보류함(archive) 데이터
const archiveTasks: Task[] = [];

// 보류함 데이터를 가져오는 getter 함수
export const getArchiveTasks = (): Task[] => {
  return JSON.parse(JSON.stringify(archiveTasks));
};

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
  // console.log(`${date.toLocaleDateString()}의 할 일 데이터를 "서버"에서 가져오는 중...`);
  // await new Promise(resolve => setTimeout(resolve, 1000)); // 딜레이 제거
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const filteredTasks = tasksData[dateString] || [];
  return JSON.parse(JSON.stringify(filteredTasks));
}

/**
 * 새로운 할 일을 생성하는 가짜 API 함수.
 * @param taskData - 생성할 할 일 데이터
 */
export const createTask = async (taskData: CreateTaskRequest): Promise<Task> => {
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  const dateString = taskData.date;
  const newTask: Task = { id: globalId++, ...taskData, done: false, retryCount: 0 };
  if (!tasksData[dateString]) tasksData[dateString] = [];
  tasksData[dateString].push(newTask);
  return newTask;
};

/**
 * 할 일을 수정하는 가짜 API 함수.
 * @param id - 수정할 할 일의 ID
 * @param taskData - 수정할 데이터
 */
export const updateTask = async (id: number, taskData: UpdateTaskRequest): Promise<Task> => {
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  let foundTask: Task | undefined;
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      foundTask = tasksData[date][idx];
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
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      tasksData[date].splice(idx, 1);
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
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      const updatedTask = { ...tasksData[date][idx], done: !tasksData[date][idx].done };
      tasksData[date] = [
        ...tasksData[date].slice(0, idx),
        updatedTask,
        ...tasksData[date].slice(idx + 1)
      ];
      return updatedTask;
    }
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
};

/**
 * 할 일을 보류(미루기)하여 retryCount를 1 증가시키고, 날짜를 다음날로 이동하는 함수
 */
export const increaseRetryAndMoveToTomorrow = async (id: number): Promise<Task> => {
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      const task = tasksData[date][idx];
      const tomorrow = new Date(task.date);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      const updatedTask = { ...task, retryCount: task.retryCount + 1, date: tomorrowStr };
      tasksData[date].splice(idx, 1);
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
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  for (const date in tasksData) {
    const idx = tasksData[date].findIndex(task => task.id === id);
    if (idx !== -1) {
      const task = tasksData[date][idx];
      tasksData[date].splice(idx, 1);
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
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  const numId = Number(id);
  const idx = archiveTasks.findIndex(task => Number(task.id) === numId);
  if (idx !== -1) {
    const task = archiveTasks[idx];
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const movedTask = { ...task, date: todayStr };
    archiveTasks.splice(idx, 1);
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
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
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
  // await new Promise(resolve => setTimeout(resolve, 500)); // 딜레이 제거
  const idx = archiveTasks.findIndex(task => task.id === id);
  if (idx !== -1) {
    const { ...rest } = data;
    const updated = { ...archiveTasks[idx], ...rest };
    updated.id = Number(archiveTasks[idx].id);
    archiveTasks[idx] = updated;
    return archiveTasks[idx];
  }
  throw new Error('해당 할 일을 찾을 수 없습니다.');
}; 