const cols = [
    {
        dataField: 'Name',
        text: 'Name',
        classes: 'docNameField',
        sort: true,
        hidden: false
    },
    {
        dataField: 'SalePointName',
        text: 'SalePointName',
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

        dataField: 'CustomerName',
        text: 'CustomerName',
        sort: true,
        hidden: false
    },
    {
        dataField: 'Amount',
        text: 'Amount',
        sort: true,
        hidden: false,
        showFooter: true,
        footerName: 'Amount',
        priceFormat: true

    },
    {
        dataField: 'Bank',
        text: 'Bank',
        sort: true,
        hidden: false,
        showFooter: false,
        priceFormat: true

    },
    {
        dataField: 'Sum',
        text: 'Sum',
        sort: false,
        hidden: false,
        showFooter: false,
        priceFormat: true

    },
    {
        dataField: 'StockName',
        text: 'StockName',
        sort: true,
        hidden: false
    },

    {
        dataField: 'Description',
        text: 'Description',
        sort: true,
        hidden: false


    },
    {
        dataField: 'Profit',
        text: 'Profit',
        sort: true,
        hidden: false,
        showFooter: false,


    },
    {
        dataField: 'UseBonus',
        text: 'UseBonus',
        sort: true,
        hidden: false,
        showFooter: false,



    }]

export default cols


