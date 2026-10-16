import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from '../components/layout/AppLayout';
import AuthLayout from '../components/layout/AuthLayout';
import AgentDetail from '../pages/agents/AgentDetail';
import CreateAgent from '../pages/agents/CreateAgent';
import MyAgents from '../pages/agents/MyAgents';
import Login from '../pages/auth/Login';
import ResetPassword from '../pages/auth/ResetPassword';
import Welcome from '../pages/auth/Welcome';
import Chat from '../pages/chat/Chat';
import Help from '../pages/help/Help';
import Home from '../pages/home/Home';
import Plugins from '../pages/plugins/Plugins';
import Profile from '../pages/profile/Profile';
import Knowledge from '../pages/settings/Knowledge';
import KnowledgeForm from '../pages/settings/KnowledgeForm';
import Policy from '../pages/settings/Policy';
import PolicyForm from '../pages/settings/PolicyForm';
import Settings from '../pages/settings/Settings';
import Work from '../pages/work/Work';
import WorkDetail from '../pages/work/WorkDetail';

import { paths } from './paths';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.chat} element={<Chat />} />
          <Route path={paths.work} element={<Work />} />
          <Route path={`${paths.work}/:workId`} element={<WorkDetail />} />
          <Route path={paths.plugins} element={<Plugins />} />
          <Route path={paths.agents} element={<MyAgents />} />
          <Route path={paths.agentNew} element={<CreateAgent />} />
          <Route path={`${paths.agents}/:agentId`} element={<AgentDetail />} />
          <Route path={paths.settings} element={<Settings />} />
          <Route path={paths.knowledge} element={<Knowledge />} />
          <Route path={`${paths.knowledge}/new`} element={<KnowledgeForm />} />
          <Route
            path={`${paths.knowledge}/:documentId/edit`}
            element={<KnowledgeForm />}
          />
          <Route path={paths.policy} element={<Policy />} />
          <Route path={`${paths.policy}/new`} element={<PolicyForm />} />
          <Route
            path={`${paths.policy}/:documentId/edit`}
            element={<PolicyForm />}
          />
          <Route path={paths.help} element={<Help />} />
          <Route path={paths.profile} element={<Profile />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path={paths.welcome} element={<Welcome />} />
          <Route path={paths.login} element={<Login />} />
          <Route path={paths.resetPassword} element={<ResetPassword />} />
        </Route>

        <Route path="*" element={<Navigate to={paths.home} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
