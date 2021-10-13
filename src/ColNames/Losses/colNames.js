const cols = [{


    dataField: 'Name',
    text: 'Loss Number',
    classes: 'docNameField',
    sort: true,
    hidden: false
},

{
    dataField: 'Moment',
    text: 'Moment',
    sort: true,
    hidden: false
},
{

    dataField: 'StockName',
    text: 'StockName',
    sort: true,
    hidden: false
},
{
    dataField: 'Amount',
    text: 'AmountMoney',
    sort: true,
    hidden: false,
    showFooter: true,
    footerName: 'Amount',
    priceFormat: true

},
{
    dataField: 'Status',
    text: 'Status',
    sort: true,
    hidden: true
},
{
    dataField: 'Mark',
    text: 'Status',
    sort: true,
    hidden: false,
    showCustomFormatter: true,
},
{
    dataField: 'Description',
    text: 'Description',
    sort: true,
    hidden: false
},
{
    dataField: 'Modify',
    text: 'Modify',
    sort: true,
    hidden: false
},
{
    dataField: 'Consumption',
    text: 'Consumption',
    sort: true,
    hidden: true


}]

export default cols


