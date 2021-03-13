import database from 'utils/firebase'

import canPlaySuite from 'utils/GameLogic/canPlaySuite'

const onPlayCard = (playedCard, lobby) => {
  // disable if game has ended
  if (lobby.state === 'END_GAME') return false

  // disable if currently showing cut animation
  if (lobby.gotCut) return false

  // disable if currently showing pile full animation
  if (lobby.pileFull) return false

  // disable if it is not current user's turn
  if (playedCard.playerID !== lobby.table.turn) return false

  // check if played card is a legal move
  const canPlay = canPlaySuite({ suite: playedCard.suite, lobby })

  if (!canPlay) return false

  // add card to table pile
  lobby.addCardToTablePile(playedCard)

  // remove from current player's hand
  lobby.removeCardFromPlayer(playedCard)

  if (canPlay === 'CUT') {
    // getting max card from pile excluding cutted player (current player)
    const gotCuttedPlayerID = lobby.getHighestPlayerIDFromPileExcludingPlayer(playedCard.playerID)
    // update the db to show cut animation
    database().ref(`${lobby.name}/gotCut`).set({ playerID: gotCuttedPlayerID, card: playedCard })
  } else {
    if (lobby.isPileFull()) {
      // update the db to show discard pile
      database().ref(`${lobby.name}/pileFull`).set(true)
    } else {
      // change turn
      const playerIDsWithCards = lobby.getPlayerIDsWithCards()
      const currentPlayerIndex = playerIDsWithCards.findIndex(playerID => playerID === playedCard.playerID)
      const nextPlayerIndex = (currentPlayerIndex + 1) % playerIDsWithCards.length
      const nextPlayerID = playerIDsWithCards[nextPlayerIndex]
      lobby.changeTurn(nextPlayerID || null)
    }
  }

  // update firebase
  database().ref(`${lobby.name}/table`).set(lobby.table)

  // check for winning condition
  // we skip winning check if this turn was cut because we check winning condition after cut animation
  if (canPlay !== 'CUT' && lobby.isEndGame()) {
    lobby.emptyDiscard()
    database().ref(`${lobby.name}`).update({
      state: 'END_GAME',
      donkey: lobby.getPlayerIDsWithCards()[0]
    })
  }
}

export default onPlayCard
