import { Link, Outlet } from "remix";

export default function Docs() {
  return (
    <>
      <aside>
        <nav>
          <ul>
            <li>
              <Link to="ssr">Server-Side Rendering</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <Outlet />
    </>
  );
}
