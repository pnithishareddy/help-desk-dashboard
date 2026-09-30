function Navbar({ onMenuClick }) {
  return (
    <header className="navbar">

      <button
        className="menu-button"
        onClick={onMenuClick}
      >
        ☰
      </button>

      <div>
        <h2>Helpdesk</h2>
        <span> DASHBOARD </span>
      </div>

      <div className="profile">
        <div className="avatar">
          A
        </div>

        <div className="profile-info">
          <strong>Admin User</strong>
          <small>Administrator</small>
        </div>
      </div>

    </header>
  );
}

export default Navbar;