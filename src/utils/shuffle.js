/*
  Randomize an array in-place using Durstenfeld shuffle algorithm

  It picks a random element for each original array element, and
  excludes it from the next draw, like picking randomly from a deck of cards.

  This clever exclusion swaps the picked element with the current one, then
  picks the next random element from the remainder, looping backwards for
  optimal efficiency, ensuring the random pick is simplified (it can always start at 0),
  and thereby skipping the final element.

  Algorithm runtime is O(n). Note that the shuffle is done in-place so if you don't
  want to modify the original array, first make a copy of it with .slice(0)
*/
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

export default shuffle
