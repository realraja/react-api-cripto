import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { server } from '../index'
import { Button, Container, HStack, RadioGroup,Radio } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCards from './CoinCards';

const Coins = () => {

    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState('inr');

    const changePage = (page) =>{
      setPage(page);
      setLoading(true);
    }

    const currencySymbol = currency==='inr'?'₹':currency==='usd'?'$':'€';

    const btns = new Array(99).fill(1);
    
    useEffect(() =>{
        const fetchCoins = async() =>{
            try {
                const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
                // console.log(data);
                setCoins(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(true);
            }
        }

        fetchCoins();
    },[currency,page]);

    if (error) return <ErrorComponent message={'errer while fetching data!'} />;


  return (
    <Container maxW={'container.xl'}>
        {loading?<Loader />:<> 
        
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={4}>
            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
          </HStack>
        </RadioGroup>

        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
             {coins.map((i) =>(
                <CoinCards name={i.name} key={i.id} symbol={i.symbol} img={i.image} id={i.id} price={i.current_price} currencySymbol={currencySymbol} />
             ))}
            </HStack>
            
            <HStack w={'full'} overflowX={'auto'} p={8}>
              {
                btns.map((item,index) =>(
                  <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>
                    {index+1}
                  </Button>
                ))
              }
            </HStack>
            </>}
    </Container>
  );
};

// const ExchangeCards = ({name,rank,img,url}) =>(
    
// )


export default Coins
