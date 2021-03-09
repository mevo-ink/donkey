import database from 'utils/firebase'

import { maxBy, cloneDeep } from 'lodash'

import canPlaySuite from 'utils/GameLogic/canPlaySuite'

const onPlayCard = (playedCard, playerID, lobby, myCards) => {
  // check for endgame and return if true
  const canPlay = canPlaySuite(playedCard.suite, playerID, lobby, myCards)

  if (canPlay) {
    // get local copy of table
    let table = cloneDeep(lobby.table)

    // convert firebase objects (cards, pile, discard) to actual js arrays
    table = {
      ...table,
      cards: Object.values(table.cards),
      pile: Object.values(table.pile || {}),
      discard: Object.values(table.discard || {})
    }

    // add card to table pile and remove from current player's hand
    table = {
      ...table,
      pile: [playedCard, ...table.pile],
      cards: table.cards.map(card => card.suite === playedCard.suite && card.number === playedCard.number ? { ...card, playerID: null } : card)
    }

    // get the highest number from current pile
    const maxPileCard = maxBy(table.pile, 'number') || {}

    // get remaining players
    let playersWithCards = []
    table.cards.map(card => card.playerID && playersWithCards.push(card.playerID))
    playersWithCards = [...new Set(playersWithCards)]
    // let playersWithCards = Object.keys(lobby.players).reduce((accumulator, playerID) => {
    //   accumulator[playerID] = true
    //   return accumulator
    // }, {})
    // for (const card of table.cards) {
    //   if (card.playerID) {
    //     playersWithCards[card.playerID] = true
    //   }
    // }
    /*
      {
        playerID: true,
        playerID: true,
        ...
      }
    */
    // playersWithCards = Object.keys(playersWithCards)
    // [playerID, playerID, ...etc]

    if (canPlay === 'CUT') {
      // getting pile without the last card
      const temp = cloneDeep(table.pile)
      temp.shift()
      const maxCardInCuttedPile = maxBy(temp, 'number') || {}

      // variable named by @arun99-dev (like and sub <3)
      const gotCuttedPlayerID = maxCardInCuttedPile.playerID
      const pileCardsObject = {}
      for (const pileCard of table.pile) {
        pileCardsObject[`${pileCard.number}-to-${pileCard.suite}`] = pileCard
      }
      // add to existing cards of the player who got cut and empty the pile and change turn
      table = {
        ...table,
        cards: table.cards.map(card => table.pile.find(pileCard => pileCard.cardID === card.cardID) ? { ...card, playerID: gotCuttedPlayerID } : card),
        pile: [],
        turn: gotCuttedPlayerID
      }
    } else {
      // discard pile if full
      if (table.pile.length === playersWithCards.length) {
        // find maxCard's player from pile and set as next turn
        const maxCardPlayerID = maxPileCard.playerID
        table = {
          ...table,
          pile: [],
          discard: [...table.pile, ...table.discard],
          turn: maxCardPlayerID
        }
      } else {
        // change turn
        const currentPlayerIndex = playersWithCards.findIndex(ID => ID === playerID)
        const nextPlayerIndex = (currentPlayerIndex + 1) % playersWithCards.length
        const nextPlayerID = playersWithCards[nextPlayerIndex]
        table = {
          ...table,
          turn: nextPlayerID
        }
      }
    }

    // convert cards array back to firebase object
    table = {
      ...table,
      cards: table.cards.reduce((accumulator, card) => {
        accumulator[card.cardID] = card
        return accumulator
      }, {}),
      time: 0
    }

    // check for winning condition
    if (playersWithCards.length === 1) {
      database().ref(`${lobby.name}`).update({
        state: 'END_GAME',
        donkey: playersWithCards[0],
        table: null
      })
    } else {
      // update table
      database().ref(`${lobby.name}/table`).set(table)
    }
  }
}

export default onPlayCard
