import { EdgeProps, type Edge, BaseEdge, getBezierPath } from '@xyflow/react';

type CustomEdgeType = Edge<
  { id: string; sourceX: number; sourceY: number; targetX: number; targetY: number },
  'customEdge'
>;

const CustomEdge = (data: EdgeProps<CustomEdgeType>) => {
  if (!data) return null;
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = data;
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return <BaseEdge id={id} path={edgePath} />;
};

export default CustomEdge;
