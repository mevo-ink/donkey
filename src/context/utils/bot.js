const randomCardPicker = (array) => {
  return array[array.length * Math.random() << 0]
}

const Bot = (lobby) => {
  // force the current player to play a card - BOT
  // select a random playable card from current player's stack
  const myCards = lobby.getPlayerCards(lobby.table.turn)

  const tableCards = lobby.getTableCards()
  let randomCard
  if (tableCards.length > 0) {
    randomCard = myCards
      .find(card => card.suite === tableCards[0].suite)
    // player doesn't have a suitable card, CUT with a random card
    if (!randomCard) {
      randomCard = randomCardPicker(myCards)
    }
  } else {
    // choose a random card if there is no card on the table
    randomCard = randomCardPicker(myCards)
  }
  // call onPlayCard(card)
  randomCard && lobby.playCard(randomCard)
}

export default Bot
