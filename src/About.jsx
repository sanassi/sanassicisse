import "./About.css";
export default function About() {
  let text = [
    "I am a 23 year old Computer Science Graduate from Epita Paris.",
    "I majored in Embedded and Realtime Systems.",
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
