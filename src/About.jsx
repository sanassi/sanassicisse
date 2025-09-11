import "./About.css";
export default function About() {
  let text = [
    "I am a 23 year old Computer Science Student at Epita Paris.",
    "I am currently majoring in Embedded and Realtime Systems.",
    "I enjoy playing / watching basketball and learning to play the electric guitar.",
  ];
  return (
    <div id="about" className="about">
      <label className="about-label">About</label>
      <div className="about-text">
        {text.map((t) => (
          <div>{t}</div>
        ))}
      </div>
    </div>
  );
}
