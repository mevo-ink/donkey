import { useEffect } from 'react'

import FingerprintJS from '@fingerprintjs/fingerprintjs'

export default function useFingerprint () {
  useEffect(() => {
    // get the unique player identifier
    const loadPlayerID = async () => {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      window.localStorage.setItem('playerID', result.visitorId)
    }
    if (!window.localStorage.getItem('playerID')) {
      loadPlayerID()
    }
  }, [])
}
