import { FC } from 'react';
import { Panel, Background, BackgroundVariant, Controls } from '@xyflow/react';

import Drawer from './Drawer';
import SideBar from '../SideBar/SideBar';
import SpeedDail from '../SpeedDial/SpeedDail';

import { IEdge, INode } from '../../types/interfaces/project';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  nodeId: string;
  toggleDrawer: () => void;
  addNode: (node: INode) => void;
  addEdge: (edge: IEdge) => void;
}

const WorkflowBody: FC<IProps> = ({
  isOpen,
  setIsOpen,
  nodeId,
  toggleDrawer,
  addNode,
  addEdge
}) => {
  return (
    <>
      <Panel position={'top-left'} className="z-10">
        <SideBar addNode={addNode} addEdge={addEdge} />
      </Panel>
      <Panel position={'bottom-right'}>
        <SpeedDail />
      </Panel>
      <Background variant={BackgroundVariant.Dots} />
      <Controls position={'bottom-left'} />
      <Panel position={'top-right'} className="z-40">
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} nodeId={nodeId} toggleDrawer={toggleDrawer} />
      </Panel>
    </>
  );
};

export default WorkflowBody;
