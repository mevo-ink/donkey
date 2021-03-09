const canPlaySuite = (suite, playerID, lobby, myCards) => {
  // check if its current user's turn
  if (playerID !== lobby.table.turn) {
    return false
  }

  if (!lobby.table.pile) {
    return 'GOOD_PILE_EMPTY'
  } else {
    const topPileCard = Object.values(lobby.table.pile)[0]
    // check if playing card's suite === topPileCard's suite
    if (suite === topPileCard.suite) {
      return 'GOOD' // legal move
    } else {
      const hasMatchingSuite = myCards.some(({ suite }) => suite === topPileCard.suite)
      if (hasMatchingSuite) {
        return false // invalid move
      } else {
        return 'CUT' // cutting
      }
    }
  }
}

export default canPlaySuite
