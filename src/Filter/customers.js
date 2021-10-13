const filter = [

    {
        key :'1',
        label: 'Adı',
        name: 'customername',
        type: 'text',
        hidden: false,
    },
    {
        key :'2',
        label: 'Kart nömrəsi',
        name: 'card',
        type: 'number',
        hidden: false,
    },
    {

        key :'3',
        label: 'Telefon',
        name: 'phone',
        type: 'number',
        hidden: false,
    },

    {

        key :'4',
        label: 'Endirim',
        name: 'discount',
        start: 'disb',
        end: 'dise',
        type: 'range',
        hidden: false,
    },
    {

        key :'5',
        label: 'Bonus',
        name: 'bonus',
        start: 'bonusb',
        end: 'bonuse',
        type: 'range',
        hidden: false,
    },
    {

        key :'6',
        label: 'Qrupu',
        name: 'gp',
        controller: 'customergroups',
        type: 'select',
        hidden: false,
    },
    {
        key :'7',
        label: 'Email',
        name: 'email',
        type: 'text',
        hidden: false,
    },
  
  

]

export default filter