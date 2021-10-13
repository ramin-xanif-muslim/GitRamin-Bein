const Filter = [

    {
        key :'1',
        label: 'Nömrə',
        name: 'docNumber',
        type: 'text',
        hidden: false,
    },
 

  
    {
        key :'2',
        label: 'Dəyişmə tarixi',
        name: 'modifedDate',
        type: 'date',
        hidden: true,
    },
    {
        key :'3',
        label: 'Satış nöqtəsi',
        name: 'spnt',
        controller: 'salepoints',
        type: 'select',
        hidden: false,
    },
    {

        key :'4',
        label: 'Məbləğ',
        name: 'docPrice',
        start: 'amb',
        end: 'ame',
        type: 'range',
        hidden: true,
    },
    {

        key :'5',
        label: 'Tarixi',
        name: 'createdDate',
        type: 'date',
        hidden: false,
    },

]

export default Filter