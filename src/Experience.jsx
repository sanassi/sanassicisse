import "./Experience.css";

export default function Experience(props) {
  let techStack = props.techs.map((tech, idx) => <div key={idx}>{tech}</div>);
  let desc = props.description.map((elt, idx) => <div key={idx}>{elt}</div>);

  return (
    <div className="experience">
      <div className="experience-description">
        <label className="experience-title">{props.title}</label>
        <label className="experience-company">{props.company}</label>
        <label className="experience-duration">
          {`${props.duration["start"]} - ${props.duration["end"]}`}
        </label>
        {desc}
        <div className="experience-techs">{techStack}</div>
      </div>
    </div>
  );
}

