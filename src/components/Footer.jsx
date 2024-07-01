import { Avatar, Box, Stack, VStack,Text } from '@chakra-ui/react'
import React from 'react'
import avtaarSrc from '../assets/IMG_20230116_153105.jpg'

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color={'whiteAlpha.700'} minH={'50'} px={16} py={['16','8']}>
      <Stack direction={['column','row']} h={'full'} alignItems={'center'} >
        <VStack w={'full'} align={['center','flex-start']}>
            <Text fontWeight={'bold'}>About Us</Text>
            <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center','left']}>We are the best cripto currency in india if you want to invest in our currency you can contact us now.</Text>
        </VStack>
        <VStack>
            <Avatar boxSize={'28'} mt={['4','0']} src={avtaarSrc} />
            <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  )
}

export default Footer
