import { NavLink, Outlet } from "react-router-dom";
import styles from './styles.module.css';

export const Docs = () => {
  return (
    <main className={styles.docs}>
      <aside className={styles.sidebar}>
        <nav>
          <ul>
            <li>
              <NavLink to="/docs">Overview</NavLink>
            </li>
            <li>
              <NavLink to="styling">Styling</NavLink>
            </li>
            <li>
              <NavLink to="ssr">Server-Side Rendering</NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <section className={styles.content}>
        <div className="container">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
