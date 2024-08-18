import { NodeToolbar, Position, NodeProps, Node, Handle } from '@xyflow/react';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useAppDispatch } from '../../redux/store';
import { deleteNode } from '../../redux/user/userSlice';

type CustomNodeType = Node<
  {
    label: string;
    id: string;
    isSequential: boolean;
    toggleDrawer: (nodeId?: string) => void;
  },
  'customNode'
>;

const CustomNode = ({ data }: NodeProps<CustomNodeType>) => {
  const { label, id, isSequential, toggleDrawer } = data;
  const dispatch = useAppDispatch();
  const onDelete = () => {
    dispatch(deleteNode(id));
  };

  return (
    <div className="relative flex w-[200px] justify-center items-center p-2 rounded-lg bg-white border border-[#1A192B] text-base text-gray-700 font-medium">
      <NodeToolbar position={Position.Bottom} className="flex gap-2">
        <button type="button" onClick={onDelete} className="rounded-full bg-red-700 text-white p-2">
          <MdDeleteOutline />
        </button>
        <button
          type="button"
          onClick={() => toggleDrawer(id)}
          className="rounded-full bg-yellow-500 text-white p-2">
          <MdEdit />
        </button>
      </NodeToolbar>
      {label.replace('-', ' ')}
      {isSequential && (
        <>
          <Handle type="target" position={Position.Left} />
          <Handle type="source" position={Position.Right} />
        </>
      )}
    </div>
  );
};

export default CustomNode;
