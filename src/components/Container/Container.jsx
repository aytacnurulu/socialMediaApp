import styles from "./Container.module.css";

export default function Container({ sidebar, header, children }) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        {header}
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          {sidebar}
        </aside>

        <main className={styles.content}>
          <div className={styles.postsWrapper}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}