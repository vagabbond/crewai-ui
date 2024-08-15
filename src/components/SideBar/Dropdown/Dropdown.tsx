import { FC, useState, ReactNode, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addAgentToProject } from '../../../redux/user/userSlice';

import { addNodeAndEdge } from '../../Workflow/Workflow.utils';

import { IAgent } from '../../../types/interfaces/agent';
import { INode, IEdge } from '../../../types/interfaces/project';

interface IProps {
  btnText: string;
  btnIcon: ReactNode;
  items: IAgent[];
  addNode: (node: INode) => void;
  addEdge: (edge: IEdge) => void;
  isSearchFoucs: boolean;
}

const Dropdown: FC<IProps> = ({ btnText, btnIcon, items, addNode, addEdge, isSearchFoucs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { id: projectId } = useParams();
  const { projects } = useAppSelector((state) => state.user);

  const togleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleAddAgent = useCallback(
    (agentId: string, agentRole: string) => {
      if (!projectId) return;
      const workflow = addNodeAndEdge(agentId, agentRole, projectId, projects);
      if (!workflow) return;
      addEdge(workflow.edge);
      addNode(workflow.node);
      dispatch(addAgentToProject({ projectId, agentId, workflow }));
    },
    [dispatch, projectId, projects]
  );
  useEffect(() => {
    if (isSearchFoucs) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isSearchFoucs]);

  return (
    <>
      <div
        role="button"
        className="flex items-center w-full p-0 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
        <button
          type="button"
          className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-gray-900"
          onClick={togleDropdown}>
          <div className="grid mr-4 place-items-center">{btnIcon}</div>
          <p className="block mr-auto font-sans text-base antialiased font-normal leading-relaxed text-blue-gray-900">
            {btnText}
          </p>
          <span className="ml-4">
            {isOpen ? (
              <RiArrowDropDownLine size={20} className="w-4 h-4 mx-auto transition-transform" />
            ) : (
              <RiArrowDropUpLine size={20} className="w-4 h-4 mx-auto transition-transform" />
            )}
          </span>
        </button>
      </div>
      {isOpen && (
        <div className="overflow-hidden">
          <div className="block w-full h-[500px] overflow-y-auto py-1 font-sans text-sm  font-light leading-normal text-gray-700 custom-scrollbar">
            <nav className="flex min-w-[240px] flex-col gap-2 p-2 font-sans text-base font-normal text-blue-gray-700">
              {items.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleAddAgent(item.id, item.role)}
                  className="flex flex-col items-start w-full p-3 leading-tight rounded-lg outline-none border border-gray">
                  <p className="text-base font-bold text-black capitalize">
                    {item.role}
                  </p>
                  <p className="text-xs font-light text-gray-500">{item.goal}</p>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Dropdown;
