import database from 'utils/firebase'

import canPlaySuite from 'utils/GameLogic/canPlaySuite'

const onPlayCard = (playedCard, lobby) => {
  // check if its current user's turn
  if (playedCard.playerID !== lobby.table.turn) return false

  // check for endgame and return if true
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
    if (canPlay === 'CUT') {
      database().ref(`${lobby.name}/gotCuttedPlayerID`).set(gotCuttedPlayerID)
    }

    // move existing pile cards to the player who got cut
    lobby.movePileCardsToPlayer(gotCuttedPlayerID)

    // change turn
    lobby.changeTurn(gotCuttedPlayerID)
  } else {
    if (lobby.isPileFull()) {
      // change turn
      lobby.changeTurn(lobby.getHighestPlayerIDFromPile())

      // discard the pile
      lobby.discardPile()
    } else {
      // change turn
      const players = lobby.getPlayers()
      const currentPlayerIndex = players.findIndex(({ playerID }) => playerID === playedCard.playerID)
      const nextPlayerIndex = (currentPlayerIndex + 1) % players.length
      const nextPlayer = players[nextPlayerIndex]
      lobby.changeTurn(nextPlayer.playerID)
    }
  }

  // check for winning condition
  if (lobby.getPlayersWithCards().length === 1) {
    lobby.emptyDiscard()
    database().ref(`${lobby.name}`).update({
      state: 'END_GAME',
      donkey: lobby.getPlayersWithCards()[0]
    })
  }

  // update firebase
  database().ref(`${lobby.name}/table`).set(lobby.table)
}

export default onPlayCard
