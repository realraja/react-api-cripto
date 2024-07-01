import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { Container, HStack, Heading, Image, VStack,Text } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {

    const [exchanges,setExchanges] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);

    useEffect(() =>{
        const fetchExchanges = async() =>{
            try {
                const {data} = await axios.get(`${server}/exchanges`);
                // console.log(data);
                setExchanges(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        }

        fetchExchanges();
    },[]);

    if (error) return <ErrorComponent message={'errer while fetching data!'} />;


  return (
    <Container maxW={'container.xl'}>
        {loading?<Loader />: <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
             {exchanges.map((i) =>(
                <ExchangeCards name={i.name} key={i.id} rank={i.trust_score_rank} img={i.image} url={i.url} />
             ))}
            </HStack>}
    </Container>
  );
};

const ExchangeCards = ({name,rank,img,url}) =>(
    <a href={url} target='blank'>
        <VStack w={52} shadow={'lg'} p={8} borderRadius={'lg'} transition={'all 0.3s'} m={4}
        css={{"&:hover":{
            transform:'scale(1.1)',
        }}}>
        <Image src={img} alt={name} h={'10'} w={'10'} objectFit={'contain'} />

        <Heading size={'md'} noOfLines={1}>{rank}</Heading>
        <Text noOfLines={1}>{name}</Text>
        </VStack>

    </a>
)

export default Exchanges
