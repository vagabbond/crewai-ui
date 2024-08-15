import { IAgent, IArgs } from '../types/interfaces/agent';

export const addNewAgent = (data: IArgs): IAgent => {
  const agent = {
    role: data.role,
    id: Math.random().toString(36).substr(2, 9),
    goal: data.goal,
    backstory: data.backstory,
    modelName: data.modelName,
    tools: data.tools
  };
  return agent;
};
