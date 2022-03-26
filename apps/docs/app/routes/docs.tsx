import { Link, LinksFunction, Outlet } from "remix";
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
              <Link to="overview">Overview</Link>
            </li>
            <li>
              <Link to="ssr">Server-Side Rendering</Link>
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
