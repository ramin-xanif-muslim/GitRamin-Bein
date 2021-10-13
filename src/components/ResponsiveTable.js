import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css'
import ExportCSV from './ExportCSV';
import Trans from '../usetranslation/Trans';
import { Redirect } from 'react-router-dom';
import { Pagination } from 'antd';
import { fetchData, loadingData } from '../actions/getData-action';
import { fetchDataFast } from '../actions/getData-action';
import filterObject from '../config/filterObject';
import { updateSelectedRows } from '../actions/updateStates-action';
import { setRedirect } from '../actions/delActions/delData-action';
import { fetchDocuments } from '../actions/getData-action';
import { isCreated } from '../actions/putAactions/saveDocument';
import { exitModal, changeForm } from '../actions/updateStates-action';
import TableLoader from './TableLoader';
import { ConvertFixedTable } from '../Function/convertNumberDecimal';
import moment from 'moment';
import getMarks from '../actions/getMarks-action';
import { Button, Dropdown, Menu, Checkbox } from 'antd';
import {
    SettingOutlined,
} from '@ant-design/icons';
import LinkedDocs from './LinkedDocs';
var translatedCols = []
var translatedColsWrapper = []
var menutranslatedCols = []
var menutranslatedColsWrapper = []
var footerName;
var tableRowEvents;
var selectRow;
var markArr = []
class ResponsiveTable extends Component {
    state = {
        activePage: 0,
        page: 1,
        sizePerPage: this.props.state.datas.totalLimit,
        pageChange: false,
        selected: [],
        from: this.props.from,
        initialcols: this.props.initialcols ? this.props.initialcols : this.props.cols,
        attributes: this.props.attributes ? this.props.attributes : '',
        redirect: false,
        selectedRowId: '',
        defaultSorterName: '',
        defaultSorterDir: 0,
        visibleMenuSettings: false,
        columns: this.props.columns,
        redirectto: this.props.editPage,
        drawer: this.props.drawer ? this.props.drawer : '',
        drawerVisible: false,
        linkedDocs: {},
        name: '',
        markOpen: false,
        selectedMarkName: ''
    }


    onChangePage = (page, sizePerPage) => {
        const currentIndex = (page - 1)
        filterObject.pg = currentIndex
        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        if (JSON.parse(localStorage.getItem('user'))) {
            if (this.props.state.datas.searching !== '') {
                filterObject.fast = this.props.state.datas.searching
                this.props.fetchDataFast(this.props.from, filterObject)
            }
            else {
                filterObject.fast = ''

                this.props.fetchData(this.props.from, filterObject)
            }
        }


    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected !== this.state.selected) {
            this.props.updateSelectedRows(this.state.selected)
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        this.props.exitModal(false)
        this.props.isCreated(false)
        this.props.changeForm(false)
    }

    markOpen = () => {
        this.setState({
            markOpen: true
        })
    }

    onNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    markClose = () => {
        this.setState({
            markOpen: false
        })
    }


    componentWillReceiveProps(nextState) {
        if (this.props.columns !== nextState.columns) {
            this.setState({
                columns: this.props.columns,
                initialcols: this.props.initialcols ? this.props.initialcols : this.props.cols,
            })
        }
    }

    handleSort = (field, order) => {
        filterObject.id = ''
        filterObject.sr = field
        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        if (this.props.from === 'products') {
            filterObject.ar = 0
        }
        if (this.props.from === 'stockbalance') {
            filterObject.ar = 0
            filterObject.zeros = 3
        }

        if (this.props.from === 'settlements') {
            filterObject.zeros = 3
        }

        order === 'asc' ? filterObject.dr = 0 : filterObject.dr = 1
        if (JSON.parse(localStorage.getItem('user'))) {
            if (this.props.state.datas.searching !== '') {
                filterObject.fast = this.props.state.datas.searching
                this.props.fetchDataFast(this.state.from, filterObject)
            }
            else {
                filterObject.fast = ''
                if (this.props.from === 'salereports') {
                    filterObject.momb = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
                    filterObject.mome = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')

                }

                else {
                    filterObject.momb = null
                    filterObject.mome = null

                }
                this.props.fetchData(this.state.from, filterObject)
            }

        }
    }

    handlePriceFormatter = (cell, row) => {
        return ConvertFixedTable(`${cell}`)
    }

    handleFooter = (column, colIndex, { text }) => {
        if (column.dataField === 'PaymentIn') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.InSum)
        }
        else if (column.dataField === 'PaymentOut') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.OutSum)
        }
        else if (column.dataField === 'AmountProfit') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllInSum) + ' ₼'
        }
        else if (column.dataField === 'AmountBorrow') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllOutSum) + ' ₼'
        }

        else if (column.dataField === 'CurrentState') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllOutSum + this.props.state.datas.additionalInfo.AllInSum) + ' ₼'
        }
        else if (column.dataField === 'Quantity') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.QuantitySum) + ' əd'
        }

        else if (column.footerName === 'CostSum') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.CostSum) + ' ₼'
        }

        else if (column.footerName === 'SaleSum') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.SaleSum) + ' ₼'
        }

        else if (column.dataField === 'Amount') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllSum) + ' ₼'
        }
        else if (column.dataField === 'Bank') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.BankSum)
        }
        else if (column.dataField === 'Sum') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllSum + this.props.state.datas.additionalInfo.BankSum)
        }
        else if (column.dataField === 'Profit') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.ProfitSum)
        }
        else if (column.dataField === 'Discount') {
            footerName = ''
        }
        else if (column.dataField === 'UseBonus') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.BonusSum)
        }
        else if (column.dataField === 'SumCost') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllCost) + ' ₼'
        }
        else if (column.dataField === 'SumPrice') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllAmount) + ' ₼'
        }
        else if (column.dataField === 'RetSumCost') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.RetAllCost) + ' ₼'
        }
        else if (column.dataField === 'RetSumPrice') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.RetAllAmount) + ' ₼'
        }

        else if (column.dataField === 'ProfitPercent') {
            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllProfit * 100 / this.props.state.datas.additionalInfo.AllCost - this.props.state.datas.additionalInfo.RetAllCost) + ' %'
        }
        if (column.footerName === 'ProfitSumReports') {

            footerName = ConvertFixedTable(this.props.state.datas.additionalInfo.AllProfit) + ' ₼'
        }
        return (
            <span>{footerName}</span>
        )
    }


    handleVisibleChange = flag => {
        this.setState({ visibleMenuSettings: flag });
    };

    handleOnSelect = (row, isSelect) => {
        if (isSelect) {
            this.setState({
                selected: [...this.state.selected, row]
            });

        }
        else {
            this.setState({
                selected: this.state.selected.filter(x => x.Id !== row.Id)
            });


        }


    }

    showDrawer = (id) => {
        var linkedDocs = {}
        linkedDocs.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        linkedDocs.moment = moment()
            .format('DD/MM/YYYY HH:mm')
            .replace(/T/, " ")
            .replace(/\..+/, "")
            .replaceAll("/", ".")
            .slice(0, 16);
        linkedDocs.pg = 0
        linkedDocs.cus = id
        linkedDocs.lm = 15

        this.props.fetchDocuments(linkedDocs)
        this.setState({
            drawerVisible: true,
            linkedDocs: linkedDocs

        });

    };
    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };
    onChange = (e) => {

        var initialCols = this.state.initialcols
        var findelement;
        var findelementindex;
        var replacedElement
        findelement = initialCols.find(c => c.dataField === e.target.id)
        findelementindex = initialCols.findIndex(c => c.dataField === e.target.id)
        findelement.hidden = !e.target.checked
        replacedElement = findelement
        initialCols.splice(findelementindex, 1, { ...findelement, ...replacedElement });
        var filtered = initialCols.filter(c => c.hidden === false)
        this.setState({
            columns: filtered
        })
    }


    render() {
        translatedCols = []
        translatedColsWrapper = []
        menutranslatedCols = []
        menutranslatedColsWrapper = []
        markArr = []
        tableRowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(row.DocType)
                delete filterObject['momb'];
                delete filterObject['mome'];

                var redirectTransaction;
                if (this.props.from === 'transactions') {
                    if (row.Direct === 'o' && row.Type === 'p') {
                        redirectTransaction = 'editPaymentOut'
                    }
                    else if (row.Direct === 'i' && row.Type === 'p') {
                        redirectTransaction = 'editPaymentIn'
                    }
                    else if (row.Direct === 'o' && row.Type === 'i') {
                        redirectTransaction = 'editInvoiceOut'
                    }
                    else if (row.Direct === 'i' && row.Type === 'i') {
                        redirectTransaction = 'editInvoiceIn'
                    }
                }
                this.setState({
                    redirect: true,
                    selectedRowId: row.Id,
                    redirectname: this.props.redirectTo,
                    redirectto: this.props.from === 'transactions' ? redirectTransaction : this.props.redirectTo,
                    redirectlinkedto: row.DocType ? row.DocType === 'DemandReturn' ? 'editDemandReturn' : row.DocType === 'SupplyReturn' ? 'editSupplyReturn' : row.DocType === 'Return' ? 'editReturn' : row.DocType === 'Sale' ? 'editSale' : row.DocType === 'Demand' ? 'editDemand' : row.DocType === 'Demand' ? 'editDemand' : row.DocType === 'Supply' ? 'editSupply' : row.DocType === 'Enter' ? 'editEnter' : row.DocType === 'Loss' ? 'editLoss' : row.DocType === 'Move' ? 'editMove' : row.DocType === 'PaymentIn' ? 'editPaymentIn' : row.DocType === 'PaymentOut' ? 'editPaymentOut' : row.DocType === 'InvoiceOut' ? 'editInvoiceOut' : row.DocType === 'InvoiceIn' ? 'editInvoiceIn' : '' : '',
                    drawer: this.props.drawer,
                    cusname: row.CustomerName,
                    amount: row.Amount

                }, () => {
                    if (this.props.from === 'settlements') {
                        this.showDrawer(row.CustomerId)
                    }

                })

            },
        }


        selectRow = {
            mode: 'checkbox',
            onSelect: this.handleOnSelect,

        };

        if (this.props.from === 'documents') {
            if (this.state.redirect) {
                return <Redirect push to={{
                    pathname: `/${this.state.redirectlinkedto}/${this.state.selectedRowId}`,
                    state: {
                        fromdoc: '/p=documents',
                        doc: []
                    }
                }} />;
            }
        }
        else if (this.state.redirectname !== '') {
            if (this.state.redirect) {
                return <Redirect push to={`/${this.state.redirectto}/${this.state.selectedRowId}`} />;
            }
        }


        //markArray for status cell starts here
        if (Array.isArray(this.props.state.marks.marks)) {
            if (Object.values(this.props.state.marks.marks).length > 0) {
                Object.values(this.props.state.marks.marks).map(m =>
                    markArr.push({
                        name: m.Name,
                        label: m.Name,
                        color: m.Color,
                        id: m.Id,
                        key: m.Id,
                        value: m.Id
                    })
                )
            }
        }

        //markArray for status cell ends here

        Object.values(this.state.columns).forEach(c => {
            c.onSort = this.handleSort
            if (c.priceFormat) {
                c.formatter = this.handlePriceFormatter
            }
            if (c.showFooter === true) {
                c.footer = c.text
                c.footerFormatter = this.handleFooter
            }
            else {
                c.footer = ''
            }
        })


        for (let i = 0; i < Object.keys(this.props.state.datas.datas).length; i++) {
            this.props.state.datas.datas[i].Order = i + 1 + this.props.state.datas.totalLimit * filterObject.pg
        }

        Object.values(this.state.columns).map(c => translatedCols.push({ text: <Trans word={c.text} />, dataField: c.dataField, classes: c.classes, headerClasses: c.headerClasses, sort: c.sort, onSort: c.onSort, hidden: c.hidden, footer: c.footer, footerFormatter: c.footerFormatter, priceFormatter: c.priceFormatter, footerName: c.footerName ? c.footerName : '', formatter: c.formatter, formatExtraData: c.formatExtraData, style: c.style }))



        if (this.props.from === 'products') {
            Object.values(this.props.cols.concat(this.props.attributes)).map(c => menutranslatedCols.push({ text: <Trans word={c.text} />, dataField: c.dataField, classes: c.classes, headerClasses: c.headerClasses, sort: c.sort, onSort: c.onSort, hidden: c.hidden }))
        }
        else {
            Object.values(this.props.cols).map(c => menutranslatedCols.push({ text: <Trans word={c.text} />, dataField: c.dataField, classes: c.classes, headerClasses: c.headerClasses, sort: c.sort, onSort: c.onSort, hidden: c.hidden }))
        }



        if (this.props.from === 'settlements') {
            Object.values(this.props.state.datas.datas).forEach(c => {
                if (c.Amount > 0) {
                    c.AmountProfit = c.Amount
                    c.AmountBorrow = ''

                }
                else {
                    c.AmountBorrow = c.Amount
                    c.AmountProfit = ''

                }
                c.CurrentState = c.Amount
            })
        }

        if (this.props.from === 'transactions') {
            Object.values(this.props.state.datas.datas).forEach(c => {
                if (c.Type === 'p') {
                    c.CashOrInvoice = <Trans word={'cash'} />
                }
                else if (c.Type === 'i') {
                    c.CashOrInvoice = <Trans word={'invoice'} />
                }
                if (c.Direct === 'i') {
                    c.PaymentIn = c.Amount
                }
                else if (c.Direct === 'o') {
                    c.PaymentOut = c.Amount
                }
            })
        }
        if (this.props.from === 'sales' || this.props.from === 'returns') {
            Object.values(this.props.state.datas.datas).forEach(c => {
                c.Sum = c.Amount + c.Bank
            })
        }
        if (this.props.from === 'salepoints') {
            Object.values(this.props.state.datas.datas).forEach(c => {

                for (let a = 0; a < Object.keys(this.props.secDatas).length; a++) {
                    if (this.props.secDatas[a].Id === c.StockId) {
                        c.Stock = this.props.secDatas[a].Name
                    }
                }
            })


        }
        if (this.props.from === 'salereports') {
            Object.values(this.props.state.datas.datas).forEach(c => {
                if (parseFloat(c.SumCost - c.RetSumCost) === 0) {
                    c.ProfitPercent = '0 %'
                }
                else {
                    c.ProfitPercent = ConvertFixedTable(parseFloat(c.Profit) * 100 / parseFloat(c.SumCost - c.RetSumCost)) + ' %'
                }
            })


        }
        if (this.props.from === 'stockbalance') {


            Object.values(this.props.state.datas.datas).forEach(c => {
                c.TotalSumPrice = parseFloat(c.Quantity * c.Price).toFixed(2)
            })


        }
        if (this.props.from === 'documents') {

            Object.values(this.props.state.datas.datas).forEach(c => {
                c.TranslatedDocTypes = <Trans word={c.DocType} />
            })
        }
        Object.values(this.props.state.datas.datas).forEach(c => {
            var markName = ''
            markArr.forEach(m => {
                if (m.id === c.Mark) {
                    markName = m.name
                }
            })

            c.Mark =
                <span className={`status_label`}
                    style={{ backgroundColor: markArr.find(m => m.id === c.Mark) ? markArr.find(m => m.id === c.Mark).name === '-' ? '' : markArr.find(m => m.id === c.Mark).color : '' }}
                >
                    {markArr.find(m => m.id === c.Mark) ? markArr.find(m => m.id === c.Mark).name === '-' ? '' : markArr.find(m => m.id === c.Mark).name : ''}
                </span>

        })
        translatedColsWrapper = translatedCols
        menutranslatedColsWrapper = menutranslatedCols
        const menu = (
            <Menu>
                <Menu.ItemGroup title={<Trans word={'columns'} />} >
                    {
                        Object.values(menutranslatedColsWrapper).map(d => (
                            <Menu.Item key={d.dataField}><Checkbox id={d.dataField} hidden={d.hidden} onChange={this.onChange} defaultChecked={!d.hidden} >{d.text}</Checkbox></Menu.Item>
                        ))
                    }
                </Menu.ItemGroup>
            </Menu>
        );

        const defaultSorted = [{
            dataField: this.props.from === 'stockbalance' || this.props.from === 'salereports' ? 'Quantity' : this.props.from === 'customers' || this.props.from === 'salepoints' ? 'Name' : this.props.from === 'settlements' ? 'CustomerName' : this.props.from === 'products' ? 'GroupName' : 'Moment',
            order: 'desc'
        }];

        const rowStyle2 = (row, rowIndex) => {
            const style = {};
            if (row.Status === 0) {
                style.color = 'silver';
                style.fontStyle = 'italic'
            }

            return style;
        };


        return (

            <div className='table-container' style={{ position: 'relative' }}>
                <div className='tableButtonsWrapper'>
                    <ExportCSV datas={this.props.state.datas.fetching ? [] : Array.isArray(this.props.state.datas.datas) ? this.props.state.datas.datas : []} cols={translatedColsWrapper} />
                    <Dropdown
                        trigger={['click']}
                        overlay={menu}
                        onVisibleChange={this.handleVisibleChange}
                        visible={this.state.visibleMenuSettings}
                    >
                        <Button className='flex_directon_col_center'> <SettingOutlined /></Button>
                    </Dropdown>

                </div>
                {
                    this.props.state.datas.loading ? <TableLoader className='custom_table_loader show' /> : <TableLoader className='custom_table_loader hidden' />
                }
                <BootstrapTable
                    keyField='BarCode'
                    data={this.props.state.datas.fetching ? [] : this.props.state.datas.datas}
                    page={filterObject.pg + 1}
                    loading={this.props.state.datas.fetching}
                    columns={translatedColsWrapper}
                    selectRow={selectRow}
                    rowStyle={rowStyle2}
                    hover
                    condensed
                    rowEvents={tableRowEvents}
                    bordered={false}
                    defaultSorted={defaultSorted}
                    wrapperClasses={'table-responsive'}
                />

                {
                    this.props.from === 'settlements' ? <LinkedDocs cusname={this.state.cusname} amount={this.state.amount} filter={this.state.linkedDocs} visible={this.state.drawerVisible} datas={this.props.state.datas.documents} onClose={this.onClose} /> : ''
                }


                {
                    this.props.state.datas.loadingFinalData ? '' : <Pagination current={filterObject.pg + 1} onChange={this.onChangePage} showSizeChanger={false} defaultPageSize={this.props.state.datas.totalLimit} total={this.props.state.datas.totalDatas} />
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, updateSelectedRows, loadingData, getMarks, fetchDocuments, fetchDataFast, setRedirect, exitModal, changeForm, isCreated
}
export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveTable)
