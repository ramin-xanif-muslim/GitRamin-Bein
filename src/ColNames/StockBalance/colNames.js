const cols = [


    {

        dataField: 'ProductName',
        text: 'Name',
        classes: 'nameField',
        sort: true,
        hidden: false
    },
    {
        dataField: 'BarCode',
        text: 'BarCode',
        sort: true,
        hidden: false
    },
    {
        dataField: 'ArtCode',
        text: 'ArtCode',
        sort: true,
        hidden: false
    },
    {
        dataField: 'Quantity',
        text: 'Quantity',
        sort: true,
        hidden: false,
        showFooter: true,
        footerName: 'QuantitySum',
        priceFormat: true

    },
    {
        dataField: 'CostPrice',
        text: 'Cost Price',
        sort: true,
        hidden: false,
        priceFormat: true

    },
    {
        dataField: 'Amount',
        text: 'Total Cost Price',
        sort: true,
        hidden: false,
        showFooter: true,
        footerName: 'CostSum',
        priceFormat: true

    },
    {
        dataField: 'Price',
        text: 'Product Price',
        sort: true,
        hidden: false,
        priceFormat: true

    },
    {
        dataField: 'TotalSumPrice',
        text: 'Total Sum Price',
        sort: true,
        hidden: false,
        showFooter: true,
        footerName: 'SaleSum',
        priceFormat: true

    },
    {
        dataField: 'BuyPrice',
        text: 'BuyPrice',
        sort: true,
        hidden: true,
        priceFormat: true

    },

    {
        dataField: 'Moment',
        text: 'Moment',
        sort: true,
        hidden: true
    },
]

export default cols