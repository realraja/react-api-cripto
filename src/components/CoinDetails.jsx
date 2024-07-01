import { Box, Container, HStack, Radio, RadioGroup, VStack,Text,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import { server } from '../index'
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

const CoinDetails = () => {

    const [coin,setCoin] = useState({});
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [currency,setCurrency] = useState('inr');
    const [days,setDays] = useState('24h');
    const [chartArray,setChartArray] = useState([]);

    const params = useParams();

    const currencySymbol = currency==='inr'?'₹':currency==='usd'?'$':'€';

    const btns = ['1h','24h','7d','14d','30d','60d','200d','1y','max'];

    const switchChartStats = (key) => {
      //let dayyy = days;
      setDays(key);
      // (key=!dayyy)?setLoading(true):
      // (key===dayyy)?console.log(dayyy):setLoading(true)
      // console.log(dayyy);
      // setLoading(true)
      
      // switch(key){
      //   case '24h':
      //     setDays('24h');
      //     setLoading(true);
      //     break;
      //   case '7d':
      //     setDays('7d');
      //     setLoading(true);
      //     break;
      //   default:
      //     setDays('24h');
      //     setLoading(true);
      // }
    }

    useEffect(() =>{
      const fetchCoin = async() =>{
          try {
              const {data} = await axios.get(`${server}/coins/${params.id}`);
              const {data:ChartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
              console.log(data);

              setCoin(data);
              setChartArray(ChartData.prices);
              setLoading(false);
          } catch (err) {
              setLoading(false);
              setError(true);
          }
      }

      fetchCoin();
  },[params.id,days,currency]);

  if (error) return <ErrorComponent message={'errer while fetching data!'} />;

  return (
    <Container maxW={'container.xl'}>
      {
        loading?<Loader />:<>
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={4}>
            <Radio value={'inr'}>INR</Radio>
            <Radio value={'usd'}>USD</Radio>
            <Radio value={'eur'}>EUR</Radio>
          </HStack>
        </RadioGroup>

         <Box w={'full'} borderWidth={'1'}>
          <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={4} wrap={'wrap'}>
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>

         

        <VStack p={16} spacing={4} alignItems={'flex-start'}>
          <Text fontSize={'small'} alignSelf={'center'} opacity={0.7}>Last Updated On {Date(coin.market_data.last_updated).split('G')[0]}</Text>

          <Image src={coin.image.large} w={16} h={16} objectFit={'contain'} />

          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>
              {currencySymbol}
              {coin.market_data.current_price[currency]}
            </StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data['price_change_percentage_'+days] > 0 ? 'increase':'decrease'} />
                {coin.market_data['price_change_percentage_'+days]}%
            </StatHelpText>
          </Stat>

          <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
            #{coin.market_cap_rank}
          </Badge>

          <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

          <Box w={'full'} p={4}>
            <Item title={'Max Suplly'} value={coin.market_data.max_supply} />
            <Item title={'Circulating Suplly'} value={coin.market_data.circulating_supply} />
            <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
            <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
            <Item title={'All Time high'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
          </Box>
        </VStack>

        {
  // console.log(days)
  // console.log(coin.market_data['price_change_percentage_'+days])
        }
        </>
      }
    </Container>
  )
}

const Item = ({title,value}) =>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>  
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{value}</Text>  
  </HStack>
)

const CustomBar = ({high, low}) =>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}> 
      <Badge children={low} colorScheme='red' />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme='green' />
    </HStack>
  </VStack>
)

export default CoinDetails
