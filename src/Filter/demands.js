const Filter = [

    {
        key :'1',
        label: 'Satış №',
        name: 'docNumber',
        type: 'text',
        hidden: false,
    },
    {

        key :'2',
        label: 'Məhsul adı',
        name: 'productName',
        type: 'select',
        controller: 'products',
        hidden: false,
    },


    {
        key :'3',
        label: 'Anbar',
        name: 'stockName',
        type: 'select',
        controller: 'stocks',
        hidden: false,
    },
    {

        key :'4',
        label: 'Şöbə',
        name: 'departmentName',
        controller: 'departments',
        type: 'select',
        hidden: true,
    },
    {
        key :'5',
        label: 'Cavabdeh',
        name: 'ownerName',
        controller: 'owners',
        type: 'select',
        hidden: true,
    },
    {
        key :'6',
        label: 'Dəyişmə tarixi',
        name: 'modifedDate',
        type: 'date',
        hidden: true,
    },
    {
        key :'7',
        label: 'Qarşı-tərəf',
        name: 'customerName',
        controller: 'customers',
        type: 'select',
        hidden: false,
    },
    {

        key :'8',
        label: 'Məbləğ',
        name: 'docPrice',
        start: 'amb',
        end: 'ame',
        type: 'range',
        hidden: true,
    },
    {

        key :'9',
        label: 'Tarixi',
        name: 'createdDate',
        type: 'date',
        hidden: false,
    },

]

export default Filter