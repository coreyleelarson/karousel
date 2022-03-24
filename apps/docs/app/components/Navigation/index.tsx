import { Link } from "remix";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/demos">Demos</Link>
        </li>
        <li>
          <Link to="/usage">Usage</Link>
        </li>
      </ul>
    </nav>
  );
}