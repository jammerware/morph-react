// Fisher-Yates (aka Knuth) Shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export function arrayShuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  
  return array;
}