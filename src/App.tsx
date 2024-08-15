import { FC, useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './redux/store';
import { setAgents, setProjects, setTools } from './redux/user/userSlice';

import { agents } from './data/agents';
import { projects } from './data/projects';
import { tools } from './data/tools';

import AgentsPage from './pages/AgentsPage/AgentsPage';
import ConstructorPage from './pages/ConstructorPage/ConstructorPage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { projects: userProjects, alivableAgents } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!userProjects.length && !alivableAgents.length) {
      dispatch(setAgents(agents));
      dispatch(setProjects(projects));
      dispatch(setTools(tools));
    }
  }, [dispatch, userProjects.length, alivableAgents.length]);

  return (
    <Routes>
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/constructor/:id" element={<ConstructorPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="*" element={<Navigate to={'/projects'} />} />
    </Routes>
  );
};
