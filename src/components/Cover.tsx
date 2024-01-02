export default function Cover(props: { imgUrl: string }) {
  return (
    <div className="cover">
      <div className="img-container">
        <img src={props.imgUrl} alt="album-cover" />
      </div>
    </div>
  );
}
