import { IAgent } from '../types/interfaces/agent';
import { IProject } from '../types/interfaces/project';

type T = IAgent | IProject;
interface ICheckIfExist {
  items: T[];
  keyWord: string;
}
export const checkIfExist = ({ items, keyWord }: ICheckIfExist): boolean => {
  if ('role' in items[0]) {
    return (items as IAgent[]).some((item) => item.role === keyWord);
  }
  return (items as IProject[]).some((item) => item.name === keyWord);
};
