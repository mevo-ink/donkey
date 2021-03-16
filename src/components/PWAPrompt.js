import { useState, useEffect } from 'react'

import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'

export default function PWAPrompt () {
  const { onClose } = useDisclosure()

  const [promptInstall, setPromptInstall] = useState(null)

  useEffect(() => {
    const handler = e => {
      e.preventDefault()
      console.log('we are being triggered :D')
      setPromptInstall(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('transitionend', handler)
  }, [])

  const onClick = async evt => {
    evt.preventDefault()
    if (!promptInstall) {
      return
    }
    promptInstall.prompt()
    // Wait for the user to respond to the prompt
    const { outcome } = await promptInstall.userChoice
    if (outcome === 'accepted') {
      setPromptInstall(null)
    }
  }

  return (
    <Modal isOpen={promptInstall} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <Button
            onClick={onClick}
          >
            INSTALL KARTHTAHEY
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
