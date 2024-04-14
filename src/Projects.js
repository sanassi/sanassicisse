import ProjectInfo from "./ProjectInfo";

import './Projects.css'
export default function Projects() {
  return (
    <div id='projects'>
      <label className='project-label'>Projects</label>
      <div className="projects">
        <ProjectInfo name="Tiger Compiler Backend"
                     lang={["C++"]}
                     description={['Compiler for the Tiger Language.', '14 weeks group project.']}
                     link={{
                       "site": "other",
                       "url": "https://assignments.lrde.epita.fr/tools/modern_compiler_implementation/first_editions.html"
                     }} />
        <ProjectInfo name="Rash"
                     lang={["C (C99)"]}
                     description={['Shell Command Line Interpreter.', 'Conform to the Posix Standard.']}
                     link={{
                       "site":"gitlab",
                       "url":"https://gitlab.com/sanassi/rash"}} />
        <ProjectInfo name="Red Panda"
                     lang={["Java", "JavaFX"]}
                     description={['IDE for beginners',
                       'With features such as: Autocomplete, Syntax Highlighting.']}
                     link={{
                       "site":"github",
                       "url":"https://github.com/sanassi/red-panda"}} />
        <ProjectInfo name="PixElArt"
                     lang={["Javascript", "React"]}
                     description={['Pixel Art Editor', 'Built with ReactJS']}
                     link={{
                       "site":"github",
                       "url":"https://github.com/sanassi/pixelart-react"}} />
        <ProjectInfo name="Portfolio Website"
                     lang={["ReactJS"]}
                     description={["First iteration of my portfolio website (this!)"]}
                     link={{
                       "site":"github",
                       "url":"https://github.com/sanassi/sanassicisse"}} />
         <ProjectInfo name="Punto"
                      lang={["ReactJS", "Socket.IO", "ExpressJS"]}
                      description={["Punto Board Game", "Multiplayer handled with Socket.IO (2 to 4 players)"]}
                      link={{
                         "site":"github",
                         "url":"https://github.com/sanassi/punto"}} />
      </div>
    </div>
  );
};