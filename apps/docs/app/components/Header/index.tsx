import { Link } from "remix";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">Karousel</Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/docs/overview">Docs</Link>
          </li>
          <li>
            <Link to="/demo">Demo</Link>
          </li>
          <li>
            <Link to="/api">API</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
