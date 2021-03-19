const onPlayCard = async (playedCard, lobby) => {
  // disable if game has ended
  if (lobby.table.state === 'ENDGAME') return false

  // disable if currently showing cut animation
  if (lobby.table.gotCut) return false

  // disable if currently showing pile full animation
  if (lobby.table.tableCardsFull) return false

  // disable if it is not current user's turn
  if (playedCard.playerID !== lobby.table.turn) return false

  // check if played card is a legal move
  const canPlay = lobby.canPlaySuite(playedCard.suite)

  if (!canPlay) return false

  // add card to table pile
  await lobby.addCardToTable(playedCard)

  if (canPlay === 'CUT') {
    // getting max card from pile excluding cutted player (current player)
    const gotCuttedPlayerID = lobby.getHighestPlayerIDFromTableCardsExcludingPlayer(playedCard.playerID)
    // update the db to show cut animation
    await lobby.setCutAnimation(gotCuttedPlayerID, playedCard)
  } else {
    if (lobby.isTableCardsFull()) {
      // update the db to show discard pile
      await lobby.setDiscardAnimation()
    } else {
      // change turn
      const playerIDsWithCards = lobby.getAllPlayersWithCards().map(({ playerID }) => playerID)
      const currentPlayerIndex = playerIDsWithCards.findIndex(playerID => playerID === playedCard.playerID)
      const nextPlayerIndex = (currentPlayerIndex + 1) % playerIDsWithCards.length
      const nextPlayerID = playerIDsWithCards[nextPlayerIndex]
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
