import { WorkStatus } from '../types/interfaces/project';

export const checkStatus = (status: WorkStatus) => {
  switch (status) {
    case WorkStatus.NotStarted:
      return 'bg-yellow-500 text-white';
    case WorkStatus.Working:
      return 'bg-[#54B4D3] text-white';
    case WorkStatus.Done:
      return 'Done';
    case WorkStatus.Failed:
      return 'bg-green-500 text-white';
    default:
      return 'Unknown status';
  }
};
