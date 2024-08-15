import { createSlice } from '@reduxjs/toolkit';
import { IAgent } from '../../types/interfaces/agent';
import { IProject } from '../../types/interfaces/project';
import { ITool } from '../../types/interfaces/tool';
import { addNewAgent } from '../../utils/agents';
import { addNewProject } from '../../utils/projects';

export interface IState {
  tools: ITool[];
  alivableAgents: IAgent[];
  projects: IProject[];
}

const initialState: IState = {
  tools: [],
  alivableAgents: [],
  projects: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addAgent(state, action) {
      const agent = addNewAgent(action.payload);
      state.alivableAgents.push(agent);
    },
    addProject(state, action) {
      const project = addNewProject(action.payload.values, action.payload.alivableAgents);
      if (!project) {
        return;
      }
      state.projects.push(project);
    },
    addAgentToProject(state, action) {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      state.projects[projectIndex].agents.push(action.payload.agentId);
      state.projects[projectIndex].workflow.nodes.push(action.payload.workflow.node);
      state.projects[projectIndex].workflow.edges.push(action.payload.workflow.edge);
    },
    setWorkflow(state, action) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          project.workflow = action.payload.workflow;
        }
        return project;
      });
    },
    setTools(state, action) {
      state.tools = action.payload;
    },
    setAgents(state, action) {
      state.alivableAgents = action.payload;
    },
    setProjects(state, action) {
      state.projects = action.payload;
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
    },
    updateAgent(state, action) {
      const agentIndex = state.alivableAgents.findIndex((agent) => agent.id === action.payload.id);
      state.alivableAgents[agentIndex] = action.payload;
      state.projects = state.projects.map((project) => {
        if (project.agents.includes(action.payload.id)) {
          const agentIndex = project.agents.findIndex((id) => id === action.payload.id);
          project.agents[agentIndex] = action.payload.id;
        }
        if (project.workflow.nodes.some((node) => node.data.id === action.payload.id)) {
          project.workflow.nodes = project.workflow.nodes.map((node) => {
            if (node.data.id === action.payload.id) {
              node.data.label = action.payload.role;
            }
            return node;
          });
        }
        return project;
      });
    },
    deleteAgent(state, action) {
      state.alivableAgents = state.alivableAgents.filter((agent) => agent.id !== action.payload);
      state.projects = state.projects.map((project) => {
        project.agents = project.agents.filter((id) => id !== action.payload);
        project.workflow.nodes = project.workflow.nodes.filter(
          (node) => node.data.id !== action.payload
        );
        project.workflow.edges = project.workflow.edges.filter(
          (edge) => edge.source !== action.payload && edge.target !== action.payload
        );
        return project;
      });
    },
    deleteNode(state, action) {
      state.projects = state.projects.map((project) => {
        project.workflow.nodes = project.workflow.nodes.filter(
          (node) => node.data.id !== action.payload
        );
        project.workflow.edges = project.workflow.edges.filter(
          (edge) => edge.source !== action.payload && edge.target !== action.payload
        );
        project.agents = project.agents.filter((id) => id !== action.payload);
        return project;
      });
    }
  }
});

export const {
  addAgent,
  addProject,
  setTools,
  setAgents,
  setProjects,
  deleteProject,
  updateAgent,
  deleteAgent,
  addAgentToProject,
  setWorkflow,
  deleteNode
} = userSlice.actions;

export default userSlice.reducer;
