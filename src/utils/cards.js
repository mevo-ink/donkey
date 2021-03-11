import shuffle from 'utils/shuffle'

// 1 = Ace = 14 (highest in game)
const NUMBERS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const SUITES = ['hearts', 'diamonds', 'clubs', 'spades']

const getCardURL = ({ suite, number }) => {
  const baseURL = 'https://firebasestorage.googleapis.com/v0/b/donkeycardgame.appspot.com/o/cards%2F'
  return `${baseURL}${suite}_${number}.png?alt=media`
}

export const getCards = () => {
  const cards = []
  for (const number of NUMBERS) {
    for (const suite of SUITES) {
      cards.push({
        suite,
        number,
        url: getCardURL({ suite, number })
      })
    }
  }
  shuffle(cards)
  return cards
}

const preloadCardImages = () => {
  for (const number of NUMBERS) {
    for (const suite of SUITES) {
      const card = new window.Image()
      card.src = getCardURL({ suite, number })
    }
  }
}

export default preloadCardImages
