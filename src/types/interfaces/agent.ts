export interface IAgent {
  role: string;
  id: string;
  goal: string;
  backstory: string;
  modelName: string;
  tools: string[];
}

export interface IArgs {
  role: string;
  goal: string;
  backstory: string;
  modelName: string;
  tools: string[];
}
