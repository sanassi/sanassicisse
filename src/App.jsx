import "./App.css";
import "./ProjectInfo";
import "./Global.css";

import Me from "./Me";
import SideNavBar from "./SideNavBar";
import Links from "./Links";
import SpotifyEmbed from "./SpotifyEmbed";
import Projects from "./Projects";
import Experiences from "./Experiences";
import About from "./About";
import BlogPost from "./BlogPost";
import BlogList from "./BlogList";

import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function ResumePage() {
  return (
    <div className="main-content">
      <div className="side-bar">
        <Me />
        <SideNavBar />
        <Links />
      </div>
      <div className="main">
        <About />
        <Experiences />
        <Projects />
        <SpotifyEmbed src="https://open.spotify.com/embed/track/141hcjVM8lNPxi4wjNLgdX?utm_source=generator" />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root (/) to /resume */}
        <Route path="/" element={<Navigate to="/resume" replace />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>

      <footer>Built by Sanassi Mory Cissé</footer>
    </Router>
  );
}

export default App;
