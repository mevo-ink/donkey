import firebase from 'firebase/app'

import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCH1OOGPH1daqH03CrW9xZYyGqGwqYQXeg',
  authDomain: 'donkeycardgame.firebaseapp.com',
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: 'donkeycardgame',
  storageBucket: 'donkeycardgame.appspot.com',
  messagingSenderId: '200596235949',
  appId: '1:200596235949:web:cbd14933642af5d428c824'
}

firebase.initializeApp(firebaseConfig)

export default firebase.database
