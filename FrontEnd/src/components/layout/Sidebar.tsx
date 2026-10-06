import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/work">Work</NavLink>

        <NavLink to="/plugins">Plugins</NavLink>

        <NavLink to="/agents">My Agents</NavLink>

        <NavLink to="/settings">Settings</NavLink>

        <NavLink to="/help">Help</NavLink>
      </nav>

      <div className="recent-chats">
        <h3>Recent Chats</h3>

        <button type="button">Screen CV for Senior Developer</button>
        <button type="button">Prepare Interview List</button>
        <button type="button">Employee Onboarding</button>
        <button type="button">Recruitment Campaign</button>
      </div>
    </aside>
  );
}

export default Sidebar;
