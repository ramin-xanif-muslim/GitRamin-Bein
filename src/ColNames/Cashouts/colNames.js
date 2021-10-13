const cols = [

    {

        dataField: 'SalePointName',
        text: 'SalePointName',
        sort: true,
        hidden: false,
    },
    {
        dataField: 'Moment',
        text: 'Moment',
        sort: true,
        hidden: false
    },
    {
        dataField: 'Amount',
        text: 'Amount',
        sort: false,
        hidden: false,
        showFooter: true,
        footerName: 'Amount',
        priceFormat: true

    },
    {
        dataField: 'Description',
        text: 'Description',
        sort: false,
        hidden: false
    },
    {
        dataField: 'Name',
        text: 'Name',
        sort: true,
        hidden: true
    }

]

export default cols