import "./SideNavBar.css";
import { HashLink as Link } from "react-router-hash-link";

export default function SideNavBar() {
  return (
    <div className="side-nav-bar">
      <Link smooth to="/resume#about">
        ABOUT
      </Link>
      <Link smooth to="/resume#experiences">
        EXPERIENCES
      </Link>
      <Link smooth to="/resume#projects">
        PROJECTS
      </Link>
      <Link to="/blog">BLOG</Link>
    </div>
  );
}

