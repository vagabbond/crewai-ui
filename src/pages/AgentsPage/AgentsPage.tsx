import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoClose, IoSearch } from 'react-icons/io5';
import { FaSortAlphaDown } from 'react-icons/fa';
import { MdDelete, MdEdit, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { GoDash } from 'react-icons/go';
import { CiCirclePlus } from 'react-icons/ci';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteAgent } from '../../redux/user/userSlice';
import { usePagination } from '../../hooks/usePagination';

import { IAgent } from '../../types/interfaces/agent';

import Modal from '../../components/Modal/Modal';
import FormAddAgent from '../../components/FormAddAgent/FormAddAgent';
import FormEditAgent from '../../components/FormEditAgent/FormEditAgent';

const AgentsPage = () => {
  const { alivableAgents } = useAppSelector((state) => state.user);

  const [sort, setSort] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const [currentItem, setCurrentItem] = useState<IAgent | null>(null);
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  const [timer, setTimer] = useState<number | null>(null);
  const [itemGoal, setItemGoal] = useState<string>('');

  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const id = state?.id || null;

  const { currentItems, totalPages, currentPage, paginate } = usePagination({
    itemsPerPage: 6,
    items: alivableAgents,
    isSort: sort,
    search
  });

  const items = currentItems as IAgent[];

  const toggleSort = () => {
    setSort(!sort);
  };
  const toggleModal = () => {
    setIsAddOpen(!isAddOpen);
  };
  const openEditModal = (agent?: IAgent) => {
    setIsEditOpen(!isEditOpen);
    if (!agent) return;
    setCurrentItem(agent);
  };
  const closeEditModal = () => {
    setIsEditOpen(false);
    setCurrentItem(null);
  };
  const handleDeleteClick = (id: string) => {
    dispatch(deleteAgent(id));
  };

  const headerAddContent = (
    <header>
      <h2 className="text-2xl font-bold text-center">Add Agent</h2>
      <button className="absolute top-3 right-3" onClick={toggleModal} aria-label="Close modal">
        <IoClose size={24} />
      </button>
    </header>
  );
  const headerEditContent = (
    <header>
      <h2 className="text-2xl font-bold text-center">Edit Agent</h2>
      <button className="absolute top-3 right-3" onClick={closeEditModal} aria-label="Close modal">
        <IoClose size={24} />
      </button>
    </header>
  );

  useEffect(() => {
    if (id) {
      setItemGoal(id);
      const timeout = setTimeout(() => {
        setItemGoal('');
      }, 3000);
      setTimer(timeout);
      return () => {
        if (timer) {
          clearTimeout(timer);
          setItemGoal('');
        }
      };
    }
  }, [id]);

  return (
    <>
      <section className="relative p-4 mx-auto h-screen ">
        <header className="sm:flex sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-x-3">
              <h2 className="text-lg font-medium text-gray-800 ">Agents</h2>
              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
                {alivableAgents.length} agents
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500 ">
              Here you can view and manage all existing agents for your projecs.
            </p>
          </div>

          <div className="flex items-center gap-x-3">
            <Link
              to={'/projects'}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100  0">
              <span>Projects Page</span>
            </Link>
            <button
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 "
              onClick={toggleModal}>
              <CiCirclePlus className="w-5 h-5" />
              <span>Add new agent</span>
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
                      <tr key={'head'}>
                        <th
                          key={'role'}
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          <button
                            className="flex items-center gap-x-3 focus:outline-none"
                            onClick={toggleSort}>
                            <span>Agent role</span>
                            <FaSortAlphaDown className="h-6" />
                          </button>
                        </th>
                        <th
                          key={'goal'}
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Goal
                        </th>
                        <th
                          key={'backstory'}
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Backstory
                        </th>
                        <th
                          key={'tools'}
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Tools
                        </th>
                        <th
                          key={'model'}
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                          Manager LLM
                        </th>

                        <th key={'edit'} scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {items.length > 0 ? (
                        items.map((agent: IAgent) => {
                          return (
                            <tr
                              key={agent.id}
                              className={`${itemGoal === agent.id ? 'bg-[#90909090]' : ''} `}>
                              <td
                                key={agent.role}
                                className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div>
                                  <h2 className="font-medium text-gray-800 capitalize">
                                    {agent.role}
                                  </h2>
                                </div>
                              </td>
                              <td key={agent.goal} className="px-4 py-4 text-sm ">
                                <div>
                                  <p className="text-gray-500 ">{agent.goal}</p>
                                </div>
                              </td>
                              <td key={agent.backstory} className="px-4 py-4 text-sm ">
                                <div>
                                  <p className="text-gray-500 ">{agent.backstory}</p>
                                </div>
                              </td>
                              <td key={agent.tools.join('')} className="px-4 py-4 text-sm">
                                <div className="flex items-center">
                                  {agent.tools.length > 0 ? (
                                    agent.tools.map((tool, index) => (
                                      <p
                                        key={tool}
                                        className="text-xs  text-blue-500 whitespace-nowrap">
                                        {tool}
                                        {index < agent.tools.length - 1 && ', '}
                                      </p>
                                    ))
                                  ) : (
                                    <GoDash className="text-gray-500" />
                                  )}
                                </div>
                              </td>
                              <td
                                key={agent.modelName + agent.id}
                                className="px-4 py-4 text-sm whitespace-nowrap">
                                <p className="text-xs text-blue-500 ">
                                  {agent.modelName.toLocaleUpperCase()}
                                </p>
                              </td>
                              <td
                                key={agent.id + 'tools'}
                                className="px-4 py-4 text-sm whitespace-nowrap">
                                <button
                                  key={agent.id + 'edit'}
                                  type="button"
                                  className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
                                  onClick={() => {
                                    openEditModal(agent);
                                  }}>
                                  <MdEdit className="w-6 h-6" />
                                </button>
                                <button
                                  key={agent.id + 'delete'}
                                  type="button"
                                  className="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg  hover:bg-gray-100"
                                  onClick={() => {
                                    handleDeleteClick(agent.id);
                                  }}>
                                  <MdDelete className="w-6 h-6" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr key={'notfound'}>
                          <td colSpan={5} className="px-4 py-4 text-sm font-medium text-gray-500 ">
                            No agents found
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
        isOpen={isAddOpen}
        toggleModal={toggleModal}
        headerContent={headerAddContent}
        mainContent={<FormAddAgent toggleModal={toggleModal} />}
      />
      <Modal
        isOpen={isEditOpen}
        toggleModal={closeEditModal}
        headerContent={headerEditContent}
        mainContent={
          currentItem && <FormEditAgent item={currentItem} toggleModal={closeEditModal} />
        }
      />
    </>
  );
};

export default AgentsPage;
