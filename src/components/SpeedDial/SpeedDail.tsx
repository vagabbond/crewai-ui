import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdDelete, MdDone } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { deleteProject } from '../../redux/user/userSlice';

const SpeedDail: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const togleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handeleDelete = () => {
    dispatch(deleteProject(id));
    navigate(`/projects`);
  };
  const handeleDone = () => {
    navigate(`/projects`);
  };

  return (
    <div data-dial-init onMouseEnter={togleDropdown} onMouseLeave={togleDropdown}>
      <div className={`flex-col items-center mb-4 space-y-2 ${isOpen ? 'flex' : 'hidden'}`}>
        <button
          type="button"
          onClick={handeleDone}
          className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200  shadow-sm hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 focus:outline-none">
          <MdDone className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handeleDelete}
          className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200  hover:bg-gray-50  focus:ring-4 focus:ring-gray-300 focus:outline-none">
          <MdDelete className="w-5 h-5" />
        </button>
      </div>
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-default"
        aria-controls="speed-dial-menu-default"
        aria-expanded="false"
        className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800  focus:ring-4 focus:ring-blue-300 focus:outline-none ">
        <FaPlus className={`w-5 h-5 transition-transform ${isOpen && 'rotate-45'}`} />
      </button>
    </div>
  );
};

export default SpeedDail;
