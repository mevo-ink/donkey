const onPlayCard = async (playedCard, lobby) => {
  // disable if game has ended
  if (lobby.table.state === 'ENDGAME') return false

  // disable if currently showing cut animation
  if (lobby.table.gotCut) return false

  // disable if currently showing tableCardsFull animation
  if (lobby.table.tableCardsFull) return false

  // disable if it is not current user's turn
  if (playedCard.playerID !== lobby.table.turn) return false

  // check if played card is a legal move
  const canPlay = lobby.canPlaySuite(playedCard.suite)

  if (!canPlay) return false

  // add card to table cards
  await lobby.addCardToTable(playedCard)

  if (canPlay === 'CUT') {
    // getting max card from table cards excluding got cut player (current player)
    const gotCutPlayerID = lobby.getHighestPlayerIDFromTableCardsExcludingPlayer(playedCard.playerID)
    // update the db to show cut animation
    await lobby.setCutAnimation(gotCutPlayerID, playedCard)
  } else {
    if (lobby.countAllPlayersWithCards() === lobby.countTableCards() + 1) {
      // update the db to show discard pile
      await lobby.setDiscardAnimation()
    } else {
      // change turn
      const nextPlayerID = lobby.getNextPlayerIDWithCards()
      await lobby.changeTurn(nextPlayerID)
      // check for winning condition
      // we skip winning check if this turn was cut because we check winning condition after cut animation
      if (lobby.isEndGame()) {
        await lobby.setEndGame()
      }
    }
  }
}

export default onPlayCard
