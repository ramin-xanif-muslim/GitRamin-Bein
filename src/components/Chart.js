import React from 'react';
import { Line } from '@ant-design/charts';

var num;

function Chart(props) {
   
    var chartJSON = props.days
    var saleDAilyPrices =  props.indicators.totalDailySalePrices
    for(let a= 0; a< saleDAilyPrices.length; a++){
        chartJSON[a].value = saleDAilyPrices[a]
    }

    var data = []
    data = chartJSON

    const config = {
        data,
        height: 400,
        xField: 'year',
        yField: 'value',
        point: {
            size: 5,
            shape: 'diamond',
        },
    };
    return (

        <Line {...config} />
    )

}

export default Chart;
