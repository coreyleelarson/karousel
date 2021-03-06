import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/docs">Docs</Link>
          </li>
          <li>
            <Link to="/api">API</Link>
          </li>
          <li>
            <a
              href="https://github.com/coreyleelarson/karousel"
              rel="noreferrer"
              target="_blank"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
