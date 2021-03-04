import {
  Icon,
  Flex,
  Button
} from '@chakra-ui/react'

export default function CancelDone ({ isLoading, onSubmit, nickname }) {
  return (
    <Flex
      width='150px'
      justifyContent='space-between'
    >
      <Button
        mt={8}
        color='black'
        zIndex='1'
        width='40px'
        height='40px'
        background='linear-gradient(180deg, #E35B5B 0%, #7E1717 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='50%'
        _active={{ bg: 'unherit' }}
        _hover={{ bg: 'unherit' }}
        onClick={() => { window.location.href = '/' }}
        isLoading={isLoading}
      >
        <Icon width='22px' height='22px' viewBox='0 0 22 22' fill='none'>
          <path d='M22 3.43948L17.9456 0L10.8222 8.28609L3.81242 0.0284178L0 3.95008C2.09458 6.59477 4.84367 9.36139 7.66517 11.9327L0.180583 20.5929L1.41167 21.956C3.22483 20.7322 6.89425 17.9472 10.7662 14.6609C14.7116 18.0252 18.3801 20.7689 20.1428 22L21.4711 20.8285L13.9049 11.9144C16.918 9.18905 19.9402 6.08967 22 3.43948Z' fill='black' />
        </Icon>
      </Button>
      <Button
        mt={8}
        color='black'
        zIndex='1'
        width='40px'
        height='40px'
        background='linear-gradient(180deg, #45DB54 0%, #197027 100%)'
        boxShadow='0px 5px 6px rgba(0, 0, 0, 0.25)'
        borderRadius='50%'
        _active={{ bg: 'unherit' }}
        _hover={{ bg: 'unherit' }}
        onClick={onSubmit}
        isDisabled={!nickname}
        isLoading={isLoading}
      >
        <Icon width='24px' height='21px' viewBox='0 0 24 21' fill='none'>
          <path d='M0 10.6175L2.053 8.69615C4.454 9.87306 5.977 10.7674 8.675 12.7161C13.748 6.88521 17.101 3.92674 23.332 0L24 1.55571C18.861 6.09723 15.098 11.1563 9.679 21C6.336 17.0135 4.105 14.4713 0 10.6175V10.6175Z' fill='black' />
        </Icon>
      </Button>
    </Flex>
  )
}
