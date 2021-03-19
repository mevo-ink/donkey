const canPlaySuite = (suite, lobby) => {
  const tableCards = lobby.getTableCards()

  if (tableCards.length === 0) {
    return 'GOOD_PLAY_ANY_CARD'
  } else {
    const topTableCard = tableCards[0]
    // check if playing card's suite === topTableCard's suite
    if (suite === topTableCard.suite) {
      return 'GOOD_PLAYED_CARD' // legal move
    } else {
      const hasMatchingSuite = lobby.getPlayerCards(lobby.table.turn).some(({ suite }) => suite === topTableCard.suite)
      if (hasMatchingSuite) {
        return false // invalid move
      } else {
        return 'CUT' // cutting
      }
    }
  }
}

export default canPlaySuite
