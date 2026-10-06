function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <span className="logo">In0</span>
        <span className="header-context">AI Assistant</span>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          🔔
        </button>

        <div className="user-menu">
          <div className="user-avatar">HR</div>

          <div className="user-info">
            <span className="user-name">HR User</span>
            <span className="user-role">HR</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
