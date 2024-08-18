import { IInitialValues } from '../components/FormAddProject/FormAddProject';
import { createNodesArray, createEdgesArray } from '../components/Workflow/Workflow.utils';
import { IAgent } from '../types/interfaces/agent';
import { IEdge, WorkStatus } from '../types/interfaces/project';

export const addNewProject = (newProject: IInitialValues, alivableAgents: IAgent[]) => {
  if (
    !newProject.name ||
    !newProject.description ||
    !newProject.llm ||
    !newProject.agents ||
    newProject.agents.length === 0
  ) {
    return null;
  }
  const agents = newProject.agents.map((agent) => agent.value);
  const nodes = createNodesArray(agents, newProject.isSequential, alivableAgents);
  let edges: IEdge[] = [];
  if (newProject.isSequential) {
    edges = createEdgesArray(nodes);
  }
  const project = {
    id: Math.random().toString(36).substr(2, 9),
    name: newProject.name,
    description: newProject.description,
    isSequential: newProject.isSequential,
    status: WorkStatus.NotStarted,
    agents,
    llm: newProject.llm.value,
    workflow: { nodes, edges }
  };
  return project;
};

export const getProjectAgents = (agentsId: string[], alivableAgents: IAgent[]): IAgent[] => {
  return alivableAgents.filter((agent) => agentsId.includes(agent.id));
};
