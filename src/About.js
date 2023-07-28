import './About.css'
export default function About() {
  let text = ['I am a 21 year old Computer Science Student at Epita Paris.',
    'I am interested in the design of interpreters and compilers, as well as frontend and backend development.',
    'I also enjoy playing and watching basketball and learning to play the electric guitar.'];
  return (
    <div id='about' className='about'>
      <label className='about-label'>About</label>
      <div className='about-text'>
        {text.map((t) => <div>{t}</div>)}
      </div>
    </div>
  );
};