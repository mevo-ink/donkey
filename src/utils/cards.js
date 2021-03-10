import shuffle from 'utils/shuffle'

const IMAGE_BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/donkeycardgame.appspot.com/o/cards%2F'

const preloadCardImages = () => {
  const numbers = Array.from(Array(13).keys())
  const suites = ['hearts', 'diamonds', 'clubs', 'spades']

  for (const number of numbers) {
    for (const suite of suites) {
      const card = new window.Image()
      card.src = `${IMAGE_BASE_URL}${suite}_${number + 2}.png?alt=media`
    }
  }
}

const getCard = ({ suite, number }) => {
  return `${IMAGE_BASE_URL}${suite}_${number}.png?alt=media`
}

export const getCards = () => {
  const numbers = Array.from(Array(13).keys())
  const suites = ['hearts', 'diamonds', 'clubs', 'spades']

  const cards = []
  for (const number of numbers) {
    for (const suite of suites) {
      cards.push({
        suite,
        number: number + 2,
        url: getCard({ suite, number: number + 2 })
      })
    }
  }

  shuffle(cards)
  return cards
}

export default preloadCardImages
