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
                     lang={["Javascript"]}
                     description={['Pixel Art Editor', 'Built with Vanilla Javascript']}
                     link={{
                       "site":"github",
                       "url":"https://github.com/sanassi/pixElArt"}} />
        <ProjectInfo name="Portfolio Website"
                     lang={["ReactJS"]}
                     description={["First iteration of my portfolio website"]}
                     link={{
                       "site":"github",
                       "url":"https://github.com/sanassi/random-stuff"}} />
      </div>
    </div>
  );
};