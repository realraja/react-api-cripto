import { Box,Image,Text } from '@chakra-ui/react'
import React from 'react'
import criptoImg from '../assets/btc.png'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.500'} w={'full'} h={'90vh'}>
      <motion.div style={{height:'80vh'}} animate={{translateY:'20px'}} transition={{duration:1.5,repeat:Infinity,repeatType:'reverse'}}>
        <Image src={criptoImg} w={'full'} h={'full'} objectFit={'contain'} filter={'grayscale(1)'} /></motion.div>
      

      <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.800'} mt={'-40px'}>Xcripto</Text>
    </Box>
  )
}

export default Home
