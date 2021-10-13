const Filter = [

    {
        key: '1',
        label: 'Məhsul Qrupu',
        name: 'gp',
        controller: 'productfolders',
        type: 'select',
        hidden: false,
    },
    {

        key: '2',
        label: 'Məhsul adı',
        name: 'productName',
        type: 'select',
        controller: 'products',
        hidden: false,
    },

    {

        key: '3',
        label: 'Barkodu',
        name: 'bc',
        type: 'text',
        hidden: false,
    },
    {
        key: '4',
        label: 'Anbar',
        name: 'stockName',
        type: 'select',
        controller: 'stocks',
        hidden: false,
    },
    {

        key: '5',
        label: 'Maya dəyəri',
        name: 'docPrice',
        start: 'costprb',
        end: 'costpre',
        type: 'range',
        hidden: false,
    },
    {

        key: '6',
        label: 'Satış qiyməti',
        name: 'salePrice',
        start: 'prb',
        end: 'pre',
        type: 'range',
        hidden: false,
    },
    {

        key: '7',
        label: 'Anbar qalığı',
        name: 'docPrice',
        start: 'amb',
        end: 'ame',
        type: 'range',
        hidden: false,
    },
    {
        key: '8',
        label: 'Çəkili',
        name: 'wg',
        controller: 'yesno',
        default: '',
        type: 'selectDefaultYesNo',
        hidden: false,
    },
    {
        key: '9',
        label: 'Arxivli',
        name: 'ar',
        controller: 'yesno',
        default: 0,
        type: 'selectDefaultYesNo',
        hidden: false,
    },
    {
        key: '9',
        label: 'Siyahı',
        name: 'zeros',
        controller: 'yesno',
        default: 3,
        type: 'selectDefaultZeros',
        hidden: false,
    },


]

export default Filter