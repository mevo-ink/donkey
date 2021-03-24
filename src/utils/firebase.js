import firebase from 'firebase/app'

import 'firebase/database'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCH1OOGPH1daqH03CrW9xZYyGqGwqYQXeg',
  authDomain: 'donkeycardgame.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: 'donkeycardgame',
  storageBucket: 'donkeycardgame.appspot.com',
  messagingSenderId: '200596235949',
  appId: '1:200596235949:web:cbd14933642af5d428c824',
  measurementId: 'G-9SSTYQ7FMS'
}

firebase.initializeApp(firebaseConfig)

firebase.analytics()

export default firebase.database
