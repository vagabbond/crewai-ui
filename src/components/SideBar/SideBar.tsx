import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

import { useAppSelector } from '../../redux/store';

import { IEdge, INode, IProject } from '../../types/interfaces/project';
import { IAgent } from '../../types/interfaces/agent';

import Modal from '../Modal/Modal';
import FormAddAgent from '../FormAddAgent/FormAddAgent';
import Dropdown from './Dropdown/Dropdown';
interface IProps {
  addNode: (node: INode) => void;
  addEdge: (edge: IEdge) => void;
}

const SideBar: FC<IProps> = ({ addNode, addEdge }) => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchFoucs, setIsSearchFoucs] = useState(false);
  const { alivableAgents, projects } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const currentProject = projects.find((project: IProject) => project.id === id);
  const agents =
    currentProject &&
    alivableAgents
      .filter((agent: IAgent) => !currentProject.agents.includes(agent.id))
      .filter((agent: IAgent) => agent.role.toLowerCase().includes(value.toLowerCase()));

  const toggleModal = () => setIsOpen(!isOpen);
  const togleSearch = () => setIsSearchFoucs(!isSearchFoucs);
  const headerAddContent = (
    <header>
      <h2 className="text-2xl font-bold text-center">Add Agent</h2>
      <button className="absolute top-3 right-3" onClick={toggleModal} aria-label="Close modal">
        <IoClose size={24} />
      </button>
    </header>
  );

  return (
    <>
      <div className="relative flex h-full w-full min-w-[320px] max-w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5">
        <div className="p-2">
          <h2 className="text-lg font-bold text-blue-gray-800 mb-2">{currentProject.name}</h2>
          <div className="relative h-10 w-full">
            <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
              <CiSearch className="w-5 h-5" />
            </div>
            <input
              value={value}
              onFocus={togleSearch}
              onBlur={togleSearch}
              onChange={(e) => setValue(e.target.value)}
              className="peer h-full w-full rounded-[7px] border border-blue-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-gray-700 outline outline-0  focus:border-2 "
              placeholder="Search"
            />
          </div>
        </div>
        <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
          <div className="relative block w-full">
            <Dropdown
              isSearchFoucs={isSearchFoucs}
              key={'Agents'}
              btnText={'Agents'}
              btnIcon={<MdOutlineSupportAgent size={20} className="w-4 h-4 mx-auto" />}
              items={agents}
              addNode={addNode}
              addEdge={addEdge}
            />
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <button
            type="button"
            onClick={toggleModal}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <div className="grid mr-4 place-items-center">
              <FaPlus size={20} className="w-4 h-4 mx-auto" />
            </div>
            Add new custom Agent
          </button>
        </nav>
      </div>
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        headerContent={headerAddContent}
        mainContent={<FormAddAgent toggleModal={toggleModal} />}
      />
    </>
  );
};

export default SideBar;
