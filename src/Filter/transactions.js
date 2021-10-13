const Filter = [

    {
        key :'1',
        label: 'Sənəd №',
        name: 'docNumber',
        type: 'text',
        hidden: false,
    },

    {

        key :'2',
        label: 'Şöbə',
        name: 'departmentName',
        controller: 'departments',
        type: 'select',
        hidden: true,
    },
    {
        key :'3',
        label: 'Cavabdeh',
        name: 'ownerName',
        controller: 'owners',
        type: 'select',
        hidden: true,
    },
    {
        key :'4',
        label: 'Dəyişmə tarixi',
        name: 'modifedDate',
        type: 'date',
        hidden: true,
    },
    {
        key :'5',
        label: 'Xərc maddələri',
        name: 'spenditem',
        controller: 'spenditems',
        type: 'select',
        hidden: false,
    },
    {
        key :'6',
        label: 'Qarşı-tərəf',
        name: 'customerName',
        controller: 'customers',
        type: 'select',
        hidden: false,
    },

    {
        key :'7',
        label: 'Ödəniş',
        name: 'paytype',
        controller: 'yesno',
        default:'',
        type: 'selectDefaultPayment',
        hidden: false,
    },

    {
        key :'8',
        label: 'Əməliyyat',
        name: 'paydir',
        controller: 'yesno',
        default:'',
        type: 'selectDefaultPayDir',
        hidden: false,
    },
    {

        key :'9',
        label: 'Məbləğ',
        name: 'docPrice',
        start: 'amb',
        end: 'ame',
        type: 'range',
        hidden: true,
    },
    {

        key :'10',
        label: 'Tarixi',
        name: 'createdDate',
        type: 'date',
        hidden: false,
    },

]

export default Filter