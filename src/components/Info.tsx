export default function Info(props: { title: string; artist: string }) {
  return (
    <div className="info">
      <h3 className="song-title">{props.title}</h3>
      <p className="artist-name">{props.artist}</p>
    </div>
  );
}
