import './SpotifyEmbed.css'
export default function SpotifyEmbed(props) {
  return (
    <div>
      <label className='spotify-label'>Song of the Moment</label>
      <div className='spotify-link'>
        <iframe style={{"border-radius":"12px"}}
                src={props.src} width="50%"
                height="152" frameBorder="0" allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"></iframe>
      </div>
    </div>
  );
};