import styles from "./Sidebar.module.css";

function Sidebar() {
  const menuItems = [
    { id: 1, title: "Homepage", icon: "bi-house-door-fill" },
    { id: 2, title: "Pages", icon: "bi-file-text-fill" },
    { id: 3, title: "Groups", icon: "bi-people-fill" },
    { id: 4, title: "Marketplace", icon: "bi-shop" },
    { id: 5, title: "Friends", icon: "bi-person-fill" },
    { id: 6, title: "Settings", icon: "bi-gear-fill" },
    { id: 7, title: "Profile", icon: "bi-person-square" },
  ];

  return (
    <aside
      className={`${styles.sidebar} d-flex flex-column justify-content-between`}
    >
      <div>
        <ul className="list-unstyled m-0">
          {menuItems.map((item) => (
            <li key={item.id} className={styles.sidebarItem}>
              <i className={`bi ${item.icon} ${styles.sidebarIcon}`}></i>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
