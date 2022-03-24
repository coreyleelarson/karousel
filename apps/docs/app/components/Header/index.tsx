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
          <Link to="/demos">Demos</Link>
        </li>
        <li>
          <Link to="/usage">Usage</Link>
        </li>
      </ul>
    </nav>
    </header>
  );
}