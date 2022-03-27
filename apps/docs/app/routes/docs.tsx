import { LinksFunction, NavLink, Outlet } from "remix";
import docsStyles from "~/styles/routes/docs.css";

export const links: LinksFunction = () => [
  { href: docsStyles, rel: "stylesheet" },
];

export default function Docs() {
  return (
    <main className="docs">
      <aside className="docs__sidebar">
        <nav>
          <ul>
            <li>
              <NavLink to="overview">Overview</NavLink>
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
      <section className="docs__content">
        <div className="container">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
