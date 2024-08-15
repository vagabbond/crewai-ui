import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoClose, IoSearch } from 'react-icons/io5';
import { FaSortAlphaDown } from 'react-icons/fa';
import { MdDelete, MdEdit, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { GoDash } from 'react-icons/go';
import { CiCirclePlus } from 'react-icons/ci';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { usePagination } from '../../hooks/usePagination';
import { deleteProject } from '../../redux/user/userSlice';
import { IProject } from '../../types/interfaces/project';

import Modal from '../../components/Modal/Modal';
import FormAddProject from '../../components/FormAddProject/FormAddProject';

const ProjectsPage = () => {
  const [sort, setSort] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { projects } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentItems, totalPages, currentPage, paginate } = usePagination({
    itemsPerPage: 7,
    items: projects,
    isSort: sort,
    search
  });
  const items = currentItems as IProject[];
  const toggleSort = () => {
    setSort(!sort);
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const onLinkClick = (id: string) => {
    navigate(`/agents`, { state: { id } });
  };

  const headerContent = (
    <header>
      <h2 className="text-2xl font-bold text-center">Add Project</h2>
      <button className="absolute top-3 right-3" onClick={toggleModal} aria-label="Close modal">
        <IoClose size={24} />
      </button>
    </header>
  );

  const handleEditClick = (id: string) => {
    navigate(`/constructor/${id}`);
  };
  const handleDeleteClick = (id: string) => {
    dispatch(deleteProject(id));
  };

  return (
    <>
      <section className="relative p-4 mx-auto h-screen">
        <header className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 ">Projects</h2>
              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
                {projects.length} projects
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 ">
              Here you can view and manage all your projects and their status.
            </p>
          </div>

          <div className="flex items-center gap-x-3">
            <Link
              to={'/agents'}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100  0">
              <span>Agents Page</span>
            </Link>
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 "
              onClick={toggleModal}>
              <CiCirclePlus className="w-5 h-5" />
              <span>Add new project</span>
            </button>
          </div>
        </header>
        <main>
          <div className="mt-6 md:flex md:items-center md:justify-between">
            <form className="relative flex items-center mt-4 md:mt-0">
              <span className="absolute top-2 left-2">
                <IoSearch className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </form>
          </div>
          <div className="flex flex-col mt-6">
            <div className="overflow-x-auto ">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 ">
                    <thead className="bg-gray-50 ">
                      <tr key="head">
                        <th
                          key="project"
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          <button
                            className="flex items-center gap-x-3 focus:outline-none"
                            onClick={toggleSort}>
                            <span>Project name</span>
                            <FaSortAlphaDown className="h-6" />
                          </button>
                        </th>

                        <th
                          key="about"
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          About
                        </th>

                        <th
                          key="agents"
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Agents involved
                        </th>
                        <th
                          key="llm"
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Manager LLM
                        </th>
                        <th key="edit" scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.length > 0 ? (
                        items.map((project: IProject) => (
                          <tr key={project.id}>
                            <td
                              key={project.name}
                              className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 className="font-medium text-gray-800 ">{project.name}</h2>
                              </div>
                            </td>
                            <td key={project.description} className="px-4 py-4 text-sm ">
                              <div>
                                <p className="text-gray-500 ">{project.description}</p>
                              </div>
                            </td>
                            <td key={project.agents.join('')} className="px-4 py-4 text-sm">
                              <div
                                key={project.agents.join('') + project.id}
                                className="flex items-center">
                                {project.agents.length > 0 ? (
                                  project.agents.map((agent, index) => (
                                    <button
                                      type="button"
                                      key={project.id + agent + index}
                                      onClick={() => onLinkClick(agent)}
                                      className="text-xs text-blue-500">
                                      {agent}
                                      {index < project.agents.length - 1 && ', '}
                                    </button>
                                  ))
                                ) : (
                                  <GoDash key={'noagents' + project.id} className="text-gray-500" />
                                )}
                              </div>
                            </td>
                            <td
                              key={project.llm + project.id}
                              className="px-4 py-4 text-sm whitespace-nowrap">
                              <p className="text-xs text-blue-500 ">
                                {project.llm.toLocaleUpperCase()}
                              </p>
                            </td>
                            <td
                              key={project.id + 'tools'}
                              className="px-4 py-4 text-sm whitespace-nowrap">
                              <button
                                key={project.id + 'edit'}
                                type="button"
                                className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
                                onClick={() => {
                                  handleEditClick(project.id);
                                }}>
                                <MdEdit className="w-6 h-6" />
                              </button>
                              <button
                                key={project.id + 'delete'}
                                type="button"
                                className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
                                onClick={() => {
                                  handleDeleteClick(project.id);
                                }}>
                                <MdDelete className="w-6 h-6" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr key="no-projects">
                          <td colSpan={5} className="px-4 py-4 text-sm font-medium text-gray-500 ">
                            No projects found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="absolute bottom-0 left-0 sm:flex sm:items-center sm:justify-between w-full pb-5 pr-5 pl-5">
          <div className="text-sm text-gray-500 ">
            Page{' '}
            <span className="font-medium text-gray-700 ">
              {items.length > 0 ? `${currentPage} of ${totalPages}` : 0}
            </span>
          </div>

          <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
            <button
              key="prev"
              type="button"
              onClick={() => paginate(currentPage - 1)}
              disabled={totalPages === 1 || items.length === 0 || currentPage === 1}
              className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 
              ${
                totalPages === 1 || items.length === 0 || currentPage === 1
                  ? 'bg-gray-200'
                  : 'bg-white hover:bg-gray-100'
              }
              `}>
              <MdNavigateBefore className="w-5 h-5 rtl:-scale-x-100" />
              <span>Previous</span>
            </button>
            <button
              key="next"
              type="button"
              onClick={() => paginate(currentPage + 1)}
              disabled={totalPages === 1 || items.length === 0 || currentPage === totalPages}
              className={`flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200  border rounded-md sm:w-auto gap-x-2 
              ${
                totalPages === 1 || items.length === 0 || currentPage === totalPages
                  ? 'bg-gray-200'
                  : 'bg-white hover:bg-gray-100'
              }
              `}>
              <span>Next</span>
              <MdNavigateNext className="w-5 h-5 rtl:-scale-x-100" />
            </button>
          </div>
        </footer>
      </section>
      <Modal
        isOpen={isOpen}
        toggleModal={toggleModal}
        headerContent={headerContent}
        mainContent={<FormAddProject toggleModal={toggleModal} />}
      />
    </>
  );
};

export default ProjectsPage;

// <th
//   scope="col"
//   className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
//   Status
// </th>;

//                         <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
//                           <div
//                             className={`inline px-3 py-1 text-sm capitalize font-normal rounded-full gap-x-2 ${
//                               project.status && checkStatus(project.status)
//                             } `}>
//                             {project.status}
//                           </div>
//                         </td>;
// <div className="mt-6 md:flex md:items-center md:justify-between">
//   <div className="grid grid-cols-5 gap-2 rounded-xl bg-gray-50 border border-gray-200 p-2">
//     <div>
//       <input
//         type="radio"
//         id="all"
//         value="all"
//         checked={status === 'all'}
//         onChange={checkCurrentStatus}
//         className="peer hidden"
//       />
//       <label
//         htmlFor="all"
//         className="text-xs block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
//         All
//       </label>
//     </div>
//     <div>
//       <input
//         type="radio"
//         id="done"
//         value="done"
//         className="peer hidden"
//         checked={status === 'done'}
//         onChange={checkCurrentStatus}
//       />
//       <label
//         htmlFor="done"
//         className="text-xs block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
//         Done
//       </label>
//     </div>

//     <div>
//       <input
//         type="radio"
//         id="failed"
//         value="failed"
//         className="peer hidden"
//         checked={status === 'failed'}
//         onChange={checkCurrentStatus}
//       />
//       <label
//         htmlFor="failed"
//         className="text-xs block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
//         Failed
//       </label>
//     </div>

//     <div>
//       <input
//         type="radio"
//         id="working"
//         value="working"
//         className="peer hidden"
//         checked={status === 'working'}
//         onChange={checkCurrentStatus}
//       />
//       <label
//         htmlFor="working"
//         className="text-xs block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
//         Working
//       </label>
//     </div>
//     <div>
//       <input
//         type="radio"
//         id="needs-setup"
//         value="needs-setup"
//         className="peer hidden"
//         checked={status === 'needs-setup'}
//         onChange={checkCurrentStatus}
//       />
//       <label
//         htmlFor="needs-setup"
//         className="text-xs block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
//         Needs setup
//       </label>
//     </div>
//   </div>
// <form className="relative flex items-center mt-4 md:mt-0">
//   <span className="absolute top-2 left-2">
//     <IoSearch className="w-5 h-5 text-gray-400" />
//   </span>
//   <input
//     type="text"
//     placeholder="Search"
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//   />
// </form>
// </div>;
