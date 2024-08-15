import { FC } from 'react';
import Workflow from '../../components/Workflow/Workflow';

const ConstructorPage: FC = () => {
  return (
    <div className="flex gap-3 relative h-full">
      <div className="w-full h-svh">
        <Workflow />
      </div>
    </div>
  );
};

export default ConstructorPage;
