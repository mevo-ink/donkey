const IMAGE_BASE_URL = 'https://firebasestorage.googleapis.com/v0/b/donkeycardgame.appspot.com/o/cards%2F'

const preloadCardImages = () => {
  const numbers = Array.from(Array(13).keys())
  const suites = ['hearts', 'diamonds', 'clubs', 'spades']

  for (const number of numbers) {
    for (const suite of suites) {
      const card = new window.Image()
      card.src = `${IMAGE_BASE_URL}${suite}_${number + 1}.png?alt=media`
    }
  }
}

export const getCard = (suite, number) => {
  return `${IMAGE_BASE_URL}${suite}_${number + 1}.png?alt=media`
}

export default preloadCardImages
