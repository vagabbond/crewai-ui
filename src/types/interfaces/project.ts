export interface INode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: { label: string; id: string; isSequential: boolean };
}
export interface IEdge {
  id: string;
  source: string;
  target: string;
  type: string;
}

export interface IWorkflow {
  nodes: INode[];
  edges: IEdge[];
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  agents: string[];
  llm: string;
  workflow: IWorkflow;
  isSequential: boolean;
}
