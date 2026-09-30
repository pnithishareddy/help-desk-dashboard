function Sidebar({
  activePage,
  setActivePage,
  isOpen,
  onClose,
  onContactAdmin
}) {
  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Tickets", icon: "🎫" }
  ];

  const accountItems = [
    { name: "Profile", icon: "👤" },
    { name: "Settings", icon: "⚙️" }
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="sidebar-logo">
          <span>🎧</span>
          <h2>SupportDesk</h2>
        </div>

        <div className="menu-title">
          MAIN MENU
        </div>

        {menuItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => {
              setActivePage(item.name);
              onClose();
            }}
          >
            <span>{item.icon}</span>
            {item.name}
          </button>
        ))}

        <div className="menu-title">
          SUPPORT
        </div>

        <button
          className={
            activePage === "Contact Admin"
              ? "menu-item active"
              : "menu-item"
          }
          onClick={() => {
            if (onContactAdmin) {
              onContactAdmin();
            } else {
              setActivePage("Contact Admin");
              onClose();
            }
          }}
        >
          <span>📞</span>
          Contact Admin
        </button>

        <div className="menu-title">
          ACCOUNT
        </div>

        {accountItems.map((item) => (
          <button
            key={item.name}
            className={
              activePage === item.name
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => {
              setActivePage(item.name);
              onClose();
            }}
          >
            <span>{item.icon}</span>
            {item.name}
          </button>
        ))}
      </aside>
    </>
  );
}

export default Sidebar;