export default function CharacterFrequency(props: { freqRank: number }) {
  return (
    <>
      {props.freqRank}
      {calculateSuffix(props.freqRank)}
    </>
  );
}

function calculateSuffix(freqRank: number) {
  const asString = String(freqRank);

  if (!asString) {
    return "";
  }

  switch (asString[asString.length - 1]) {
    case "1":
      return "st";
    case "2":
      return "nd";
    case "3":
      return "rd";
    default:
      return "th";
  }
}
