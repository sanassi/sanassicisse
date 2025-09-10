import './App.css';
import './ProjectInfo'
import './Global.css'
import Me from "./Me";
import SideNavBar from "./SideNavBar";
import Links from "./Links";
import SpotifyEmbed from "./SpotifyEmbed";
import Projects from "./Projects";
import Experiences from "./Experiences";
import About from "./About";

function App() {
  return (
    <div className="App">
       <div className="main-content">
          <div className="side-bar">
             <Me />
             <SideNavBar/>
             <Links />
          </div>
          <div className="main">
             <About/>
             <Experiences/>
             <Projects/>
             <SpotifyEmbed src="https://open.spotify.com/embed/track/141hcjVM8lNPxi4wjNLgdX?utm_source=generator"/>
          </div>
       </div>

      <footer>Built by Sanassi Mory Cissé</footer>
    </div>
  );
}
export default App;
