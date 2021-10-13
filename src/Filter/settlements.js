const Filter = [

    {
        key :'1',
        label: 'Qarşı-tərəf',
        name: 'customerName',
        controller: 'customers',
        type: 'select',
        hidden: false,
    },
    {

        key :'2',
        label: 'Məbləğ',
        name: 'docPrice',
        start: 'amb',
        end: 'ame',
        type: 'range',
        hidden: false,
    },

    {
        key: '3',
        label: 'Borclar',
        name: 'zeros',
        controller: 'yesno',
        default: 3,
        type: 'selectDefaultBorrows',
        hidden: false,
    },
    
    {
        key :'4',
        label: 'Tarix',
        name: 'moment',
        type: 'onemoment',
        hidden: false,
    },
,


]

export default Filter