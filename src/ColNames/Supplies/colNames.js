const cols = [

    {
        dataField: 'Name',
        text: 'Supply Number',
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
        dataField: 'CustomerName',
        text: 'CustomerName',
        sort: true,
        hidden: false
    },
    {
        dataField: 'Amount',
        text: 'AmountMoney',
        sort: true,
        hidden: false,
        showFooter : true,
        footerName : 'Amount',
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
        dataField: 'CustomerDiscount',
        text: 'CustomerDiscount',
        sort: true,
        hidden: true
    },

    {
        dataField: 'Consumption',
        text: 'Consumption',
        sort: true,
        hidden: true
    },
    {
        dataField: 'Discount',
        text: 'Discount',
        sort: true,
        hidden: true
    }
]

export default cols