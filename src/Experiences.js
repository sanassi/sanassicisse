import Experience from "./Experience";
import './Experiences.css'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Experiences() {
  return (
    <div id='experiences'>
      <label className='experience-label'>Experience</label>
      <div className="experiences">
        <Experience duration={{'start' : 'Sept. 2024', 'end' : 'Present'}}
                    title='Teaching Assistant (ACU)'
                    description={['In charge of the 42sh project. (4-week project for 3rd year students in C).', 'Still teaching and assisting students in programming activities.']}
                    company='Epita'
                    techs={['C', 'Shell']}/>
        <Experience duration={{'start' : 'Jan. 2024', 'end' : 'July 2024'}}
                    title='Teaching Assistant (YAKA)'
                    description={['Teaching Computer Science and Programming to 3rd year students']}
                    company='Epita'
                    techs={['Java', 'C++', 'Javascript']}/>
        <Experience duration={{'start' : 'Sept. 2023', 'end' : 'Jan. 2024'}}
                    title='Backend Developer Intern'
                    description={['Added features and optimizations on the monolithic server',
                    'Worked on the migration to micro services (written in Scala)']}
                    company='Rakuten France'
                    techs={['Java', 'Scala', 'ElasticSearch']}/>
        <Experience duration={{'start' : 'Sept. 2022', 'end' : 'July 2023'}}
                    title='Teaching Assistant (ACDC)'
                    description={['Teaching Computer Science and Programming to first year students.',
                      'Writing, testing and deploying weekly programming practicals for students in C#']}
                    company='Epita Paris'
                    techs={['C#']}/>
      </div>
      <div className='resume-link'>
        <a href={process.env.PUBLIC_URL + '/sanassi_cv_ing1_en.pdf'}>
          Open Full Résumé
          <OpenInNewIcon />
        </a>
      </div>
    </div>
  );
};
