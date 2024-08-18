import { FC } from 'react';
import { OverlayDrawer, DrawerBody, DrawerHeader } from '@fluentui/react-drawer';
import DrawerEditNode from '../DrawerEditNode/DrawerEditNode';

interface IProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  nodeId: string;
  toggleDrawer: () => void;
}

const Drawer: FC<IProps> = ({ isOpen, setIsOpen, nodeId, toggleDrawer }) => {
  return (
    <OverlayDrawer
      position="end"
      open={isOpen}
      onOpenChange={(_, { open }) => setIsOpen(open)}
      style={{ width: `400px` }}>
      <DrawerBody className="bg-white border border-r-gray-500 h-full">
        <div className="p-4">
          <DrawerHeader>
            <h2 className="text-2xl font-bold text-center">Edit Agent</h2>
          </DrawerHeader>
          <DrawerEditNode nodeId={nodeId} toggleDrawer={toggleDrawer} />
        </div>
      </DrawerBody>
    </OverlayDrawer>
  );
};

export default Drawer;
