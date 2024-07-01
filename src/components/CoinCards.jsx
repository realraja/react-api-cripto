import { Heading, VStack,Text,Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const CoinCards = ({id,symbol,price,img,name,currencySymbol='₹'}) => {
  return (
    <Link to={`/coins/${id}`}>
        <VStack w={52} shadow={'lg'} p={8} borderRadius={'lg'} transition={'all 0.3s'} m={4}
        css={{"&:hover":{
            transform:'scale(1.1)',
        }}}>
            <Image src={img} alt={name} h={'10'} w={'10'} objectFit={'contain'} />

            <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price?`${currencySymbol} ${price}`:'NA'}</Text>
        </VStack>

    </Link>
  )
}

export default CoinCards
