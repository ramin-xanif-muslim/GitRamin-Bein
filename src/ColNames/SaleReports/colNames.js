const cols = [{


    dataField: 'ProductName',
    text: 'ProductName',
    sort: true,
    hidden: false
},

{
    dataField: 'Quantity',
    text: 'Quantity',
    sort: true,
    hidden: false,
    priceFormat: true

},
{

    dataField: 'SumCost',
    text: 'Total Cost Price',
    sort: true,
    hidden: false,
    showFooter: true,
    footerName: 'SumCost',
    priceFormat: true

},
{
    dataField: 'SumPrice',
    text: 'Total Sum Price',
    sort: true,
    hidden: false,
    showFooter: true,
    footerName: 'SumPrice',
    priceFormat: true

},
{
    dataField: 'RetQuantity',
    text: 'RetQuantity',
    sort: true,
    hidden: false,
    priceFormat: true,

    style: (cell, row, rowIndex, colIndex) => {
        return {
            borderLeft: '1px solid black'
        }
    }
},
{
    dataField: 'RetSumCost',
    text: 'RetSumCost',
    sort: false,
    hidden: false,
    showFooter: true,
    footerName: 'RetSumCost',
    priceFormat: true

},
{
    dataField: 'RetSumPrice',
    text: 'RetSumPrice',
    sort: true,
    hidden: false,
    priceFormat: true,

    showFooter: true,
    footerName: 'RetSumPrice',
    style: (cell, row, rowIndex, colIndex) => {
        return {
            borderRight: '1px solid black'
        }
    }
},
{
    dataField: 'Profit',
    text: 'Profit',
    sort: true,
    hidden: false,
    showFooter: true,
    footerName: 'ProfitSumReports',
    priceFormat: true

},
{
    dataField: 'ProfitPercent',
    text: 'Profit Percent',
    sort: true,
    hidden: false,
    showFooter: true,
    footerName: 'ProfitPercent',
    


}
]

export default cols


