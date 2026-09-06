export default function Character(props: { character: string; pinyin: string }) {
  return (
    <div>
      <div className="text-6xl">{props.character}</div>
      <div className="text-primary-content">{props.pinyin}</div>
    </div>
  );
}
