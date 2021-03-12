import onPlayCard from 'utils/GameLogic/onPlayCard'

const randomCardPicker = function (array) {
  return array[array.length * Math.random() << 0]
}

const Bot = (lobby) => {
  // force the current player to play a card - BOT
  // select a random playable card from current player's stack
  const myCards = Object.values(lobby.table?.cards || {})
    .filter(card => card.playerID === lobby.table.turn)
  let randomCard
  if (lobby.table.pile) {
    randomCard = myCards
      .find(card => card.suite === lobby.table.pile[0].suite)
    // player don't have a suitable card, CUT with a random card
    if (!randomCard) {
      randomCard = randomCardPicker(myCards)
    }
  } else {
    // choose a random card if there is no card the table
    randomCard = randomCardPicker(myCards)
  }
  // call onPlayCard(card)
  onPlayCard(randomCard, lobby, myCards)
}

export default Bot
