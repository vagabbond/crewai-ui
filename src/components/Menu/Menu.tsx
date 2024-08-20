import { FC } from 'react';
import {
  Menu as MenuComponent,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger
} from '@fluentui/react-menu';
import { IoMdMore } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { deleteProject, setProjectStatus } from '../../redux/user/userSlice';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IProject, WorkStatus } from '../../types/interfaces/project';
import { checkIfAllAgentHaveTask } from '../../utils/projects';

interface IProps {
  id: string;
  status: WorkStatus;
}

const Menu: FC<IProps> = ({ id, status }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleEditClick = (projectId: string) => {
    navigate(`/constructor/${projectId}`);
  };
  const handleDeleteClick = (projectId: string) => {
    dispatch(deleteProject(projectId));
  };

  const startProject = (projectId: string) => {
    dispatch(setProjectStatus({ id: projectId, status: WorkStatus.Working }));
  };
  const { projects } = useAppSelector((state) => state.user);
  const project = projects.find((project: IProject) => project.id === id);
  return (
    <MenuComponent closeOnScroll={true}>
      <MenuTrigger>
        <button
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray">
          <IoMdMore className="w-6 h-6" />
        </button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList className="p-2 flex items-center justify-center bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
          <MenuItem className="w-full">
            <button
              key={id + 'edit'}
              type="button"
              className="px-1 py-1 w-full flex justify-center items-center gap-2 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
              onClick={() => {
                handleEditClick(id);
              }}>
              <MdEdit className="w-6 h-6" /> Edit
            </button>
          </MenuItem>
          <MenuItem className="w-full">
            <button
              key={id + 'delete'}
              type="button"
              className="px-1 py-1 w-full flex justify-center items-center gap-2 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
              onClick={() => {
                handleDeleteClick(id);
              }}>
              <MdDelete className="w-6 h-6" /> Delete
            </button>
          </MenuItem>
          <MenuItem className="w-full">
            <button
              key={id + 'setStatus'}
              type="button"
              className="px-1 py-1 w-full flex justify-center items-center gap-2 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => {
                startProject(id);
              }}
              disabled={
                status === WorkStatus.Working ||
                !checkIfAllAgentHaveTask(project.agents, project.tasks)
              }>
              Start project
            </button>
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </MenuComponent>
  );
};

export default Menu;
