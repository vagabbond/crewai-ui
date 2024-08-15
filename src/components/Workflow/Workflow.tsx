import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  addEdge as addEdgeFlow,
  NodeTypes,
  EdgeTypes,
  OnConnect,
  BackgroundVariant,
  Panel,
  OnNodesChange,
  applyNodeChanges,
  type Node,
  type Edge,
  OnEdgesChange,
  applyEdgeChanges,
  ReactFlowProvider,
  type OnReconnect,
  reconnectEdge
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import SideBar from '../SideBar/SideBar';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useParams } from 'react-router-dom';
import { setWorkflow } from '../../redux/user/userSlice';
import CustomEdge from './CustomEdge';
import SpeedDail from '../SpeedDial/SpeedDail';
import { IEdge, INode, IProject } from '../../types/interfaces/project';

const nodeTypes: NodeTypes = {
  customNode: CustomNode
};
const edgeTypes: EdgeTypes = {
  customEdge: CustomEdge
};

export default function Workflow() {
  const edgeReconnectSuccessful = useRef(true);
  const { projects } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [nodes, setNodes] = useState<Node[]>();
  const [edges, setEdges] = useState<Edge[]>();

  useEffect(() => {
    const project: IProject = projects.find((project: IProject) => project.id === id);
    if (project) {
      setNodes(project.workflow.nodes);
      setEdges(project.workflow.edges);
    }
  }, [id, projects]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(setWorkflow({ projectId: id, workflow: { nodes, edges } }));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [id, nodes, edges, dispatch]);

  const onConnect: OnConnect = useCallback(
    (connection) => {
      setEdges((edges) => edges && addEdgeFlow(connection, edges));
    },
    [setEdges]
  );
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => nds && applyNodeChanges(changes, nds));
    },
    [setNodes]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => eds && applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const addNode = useCallback(
    (node: INode) => {
      setNodes((nodes) => [...(nodes || []), node]);
    },
    [setNodes]
  );
  const addEdge = useCallback(
    (edge: IEdge) => {
      setEdges((edges) => [...(edges || []), edge]);
    },
    [setEdges]
  );
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);
  const onReconnect: OnReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => els && reconnectEdge(oldEdge, newConnection, els));
  }, []);
  const onReconnectEnd = useCallback((_: any, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds && eds.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        fitView>
        <Panel position={'top-left'} className="z-10">
          <SideBar addNode={addNode} addEdge={addEdge} />
        </Panel>
        <Panel position={'bottom-right'}>
          <SpeedDail />
        </Panel>
        <Background variant={BackgroundVariant.Dots} />
        <Controls position={'bottom-left'} />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
