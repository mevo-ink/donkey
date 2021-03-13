const canPlaySuite = ({ suite, lobby }) => {
  const pile = lobby.getPileCards()

  if (pile.length === 0) {
    return 'GOOD_PILE_EMPTY'
  } else {
    const topPileCard = pile[0]
    // check if playing card's suite === topPileCard's suite
    if (suite === topPileCard.suite) {
      return 'GOOD' // legal move
    } else {
      const hasMatchingSuite = lobby.getMyCards().some(({ suite }) => suite === topPileCard.suite)
      if (hasMatchingSuite) {
        return false // invalid move
      } else {
        return 'CUT' // cutting
      }
    }
  }
}

export default canPlaySuite
