export default function Character(props: {
  character: string;
  pinyin: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl">{props.character}</div>
      <div className="text-primary">{props.pinyin}</div>
    </div>
  );
}
