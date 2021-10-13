const filter = [

    {
        key :'1',
        label: 'Adı',
        name: 'productname',
        type: 'text',
        hidden: false,
    },
    {

        key :'2',
        label: 'Barkodu',
        name: 'bc',
        type: 'text',
        hidden: false,
    },

    {

        key :'3',
        label: 'Alş qiyməti',
        name: 'buyPrice',
        start: 'bprb',
        end: 'bpre',
        type: 'range',
        hidden: false,
    },
    {
        key :'4',
        label: 'Satış Qiyməti',
        name: 'salePrice',
        start: 'prb',
        end: 'pre',
        type: 'range',
        hidden: false,
    },
    {

        key :'5',
        label: 'Məhsul Qrupu',
        name: 'gp',
        controller: 'productfolders',
        type: 'select',
        hidden: false,
    },
    {
        key :'6',
        label: 'Arxivli',
        name: 'ar',
        controller: 'yesno',
        default:0,
        type: 'selectDefaultYesNo',
        hidden: false,
    },
    {
        key :'7',
        label: 'Çəkili',
        name: 'wg',
        controller: 'yesno',
        default:'',
        type: 'selectDefaultYesNo',
        hidden: false,
    },
  

]

export default filter