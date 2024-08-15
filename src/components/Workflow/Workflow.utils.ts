import { type Node } from '@xyflow/react';

import { INode, IProject, IEdge } from '../../types/interfaces/project';
import { IAgent } from '../../types/interfaces/agent';
import { getProjectAgents } from '../../utils/projects';

export const createNode = (agentId: string, agentRole: string, isSequential: boolean) => {
  const node: INode = {
    id: agentId,
    data: { label: agentRole, id: agentId, isSequential },
    position: {
      x: 0,
      y: 0
    },
    type: 'customNode'
  };
  return node;
};
export const createEdge = (agentId: string, previousAgent: string) => {
  return {
    id: `${previousAgent}-${agentId}`,
    source: previousAgent,
    target: agentId,
    type: 'customEdge'
  };
};
export const addNodeAndEdge = (
  agentId: string,
  agentRole: string,
  projectId: string,
  projects: IProject[]
) => {
  const project: IProject | undefined = projects.find(
    (project: IProject) => project.id === projectId
  );
  if (!project) return;

  const node = createNode(agentId, agentRole, project.isSequential);
  const edge = createEdge(agentId, project.workflow.nodes[project.workflow.nodes.length - 1].id);
  return { node, edge };
};

export const createNodesArray = (
  agentsId: string[],
  isSequential: boolean,
  alivableAgents: IAgent[]
): INode[] => {
  const agents = getProjectAgents(agentsId, alivableAgents);
  const nodeSpacing = 100;
  const nodeWidth = 200;
  const maxRowWidth = 1000;
  const initialPosition = { x: 0, y: 50 };

  const nodes = agents.map((agent, index) => {
    const x = initialPosition.x + (nodeWidth + nodeSpacing) * index;
    const y = initialPosition.y + Math.floor(x / maxRowWidth) * 200;

    const adjustedX = x % maxRowWidth;

    return {
      id: agent.id,
      type: 'customNode',
      position: {
        x: adjustedX,
        y: y
      },
      data: { label: agent.role, id: agent.id, isSequential }
    };
  });
  return nodes;
};

export const createEdgesArray = (nodes: Node[]): IEdge[] => {
  const edges: IEdge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const ifLastNode = i === nodes.length - 1;
    edges.push({
      id: `${nodes[i].id}-${ifLastNode ? 'end' : nodes[i + 1].id}`,
      source: nodes[i].id,
      target: ifLastNode ? '' : nodes[i + 1].id,
      type: 'customEdge'
    });
  }
  return edges;
};
