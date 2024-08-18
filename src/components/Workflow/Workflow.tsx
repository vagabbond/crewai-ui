import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ReactFlow,
  addEdge as addEdgeFlow,
  NodeTypes,
  EdgeTypes,
  OnConnect,
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

import { useAppDispatch, useAppSelector } from '../../redux/store';

import { setWorkflow } from '../../redux/user/userSlice';

import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import WorkflowBody from './WorkflowBody';

import { IEdge, INode, IProject } from '../../types/interfaces/project';

const nodeTypes: NodeTypes = {
  customNode: CustomNode
};
const edgeTypes: EdgeTypes = {
  customEdge: CustomEdge
};

export default function Workflow() {
  const { projects } = useAppSelector((state) => state.user);

  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [nodes, setNodes] = useState<Node[]>();
  const [edges, setEdges] = useState<Edge[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState<string>('');

  const edgeReconnectSuccessful = useRef(true);

  const toggleDrawer = (nodeId?: string) => {
    setIsOpen((prevState) => !prevState);
    if (nodeId) {
      setNodeId(nodeId);
    }
  };
  useEffect(() => {
    const project: IProject = projects.find((project: IProject) => project.id === id);
    if (project && project.workflow.nodes && project.workflow.edges) {
      const nodes = project.workflow.nodes.map((node) => {
        return {
          id: node.id,
          type: 'customNode',
          data: {
            label: node.data.label,
            id: node.id,
            isSequential: node.data.isSequential,
            toggleDrawer
          },
          position: node.position
        };
      });
      setNodes(nodes);
      setEdges(project.workflow.edges);
    }
  }, [id, projects]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (nodes) {
        dispatch(
          setWorkflow({
            id,
            workflow: {
              nodes: nodes.map((node) => ({
                id: node.id,
                type: node.type,
                position: node.position,
                data: {
                  label: node.data.label,
                  id: node.data.id,
                  isSequential: node.data.isSequential
                }
              })),
              edges
            }
          })
        );
      }
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
    (changes) => {
      setEdges((eds) => eds && applyEdgeChanges(changes, eds));
    },
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
  const saveWorkflow = () => {
    if (nodes) {
      console.log('saveWorkflow', nodes);
      dispatch(
        setWorkflow({
          id,
          workflow: {
            nodes: nodes.map((node) => ({
              id: node.id,
              type: node.type,
              position: node.position,
              data: {
                label: node.data.label,
                id: node.data.id,
                isSequential: node.data.isSequential
              }
            })),
            edges
          }
        })
      );
    }
  };

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={saveWorkflow}
        edges={edges}
        edgeTypes={edgeTypes}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        fitView>
        <WorkflowBody
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          nodeId={nodeId}
          toggleDrawer={toggleDrawer}
          addNode={addNode}
          addEdge={addEdge}
        />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
