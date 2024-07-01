import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js'
ChartJS.register(
    CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend
)
const Chart = ({arr=[],currency,days}) => {
    const prices=[]
    const dates = []
    
    for (let i = 0; i < arr.length; i++) {
        if(days==='24h' || days==='1h') dates.push(new Date(arr[i][0]).toLocaleTimeString());
        else dates.push(new Date(arr[i][0]).toLocaleDateString());
        
        prices.push(arr[i][1]);        
    }

    const data = {
        label:`Prices in ${currency}`,
        data:prices,
        borderColor:'green',
        backgroundColor:'yellowgreen',
    }

    // console.log(arr)
  return (
    <Line
     options={{
        responsive: true,
     }}
     data={{
        labels:dates,
        datasets:[data]
     }}
    />
  )
}

export default Chart
