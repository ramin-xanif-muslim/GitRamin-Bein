import React, { Component } from 'react'
import { getCheckPage } from '../actions/check/check-action'
import { connect } from 'react-redux'
import { Divider } from 'antd';
import { fetchCheck } from '../actions/getData-action';
import BootstrapTable from 'react-bootstrap-table-next';
import moment from 'moment';
import { getToken } from '../config/token';
import './invoice.css'
import { Spin, Alert } from 'antd';
class invoice extends Component {
    componentDidMount() {
        this.props.getCheckPage(true)
        var getfilter = {}
        getfilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        getfilter.id = this.props.location.search.substring(1)
        this.props.fetchCheck(this.props.location.hash.slice(1), getfilter)
    }

    render() {
        const cols = [
            {
                dataField: 'Order',
                text: '№',
            },
            {
                dataField: 'Name',
                text: 'Malın adı',

            },
            {
                dataField: 'Unique',
                text: 'Ölçü vahidi',

            },
            {
                dataField: 'Quantity',
                text: 'Miqdar',

            },
            {
                dataField: 'Price',
                text: 'Qiymət',

            },
            {
                dataField: 'TotalPrice',
                text: 'Məbləğ',
            },
        ]
        const check_name = this.props.location.hash.slice(1)
        var i = 1
        var customPositions = []
        {
            if (!this.props.state.groups.invoiceLoading) {
                Object.values(this.props.state.datas.checkDatas[0].Positions).map(d => customPositions.push(d))

            }
            customPositions.map(c => {
                c.TotalPrice = c.Price * c.Quantity

            })
            customPositions.map(c => {
                c.Unique = c.IsPack === 1 ? 'paket' : 'əd'

            })
            customPositions.map(c => {
                c.Order = i++
            })

            customPositions.length > 0 ? customPositions.push({
                Order: '',
                Name: '',
                Quantity: '',
                Price: 'Yekun',
                TotalPrice: this.props.state.datas.checkDatas[0].Amount + ' ₼',
            })
                : customPositions.push({})
        }

        const totalPrice = this.props.state.datas.checkDatas[0] ? this.props.state.datas.checkDatas[0].Amount : ''
        return (

            this.props.state.groups.invoiceLoading ? <Spin className='fetchSpinner' tip="Yüklənir...">
                <Alert />
            </Spin> :
                <div className='invoice'>
                    <div className='invoice_header'>
                        <h1 className='header_name'>HESAB-FAKTURA</h1>
                    </div>
                    <div className='invoice_main_info'>
                        <div className='invoice_main_info_wrapper'>
                            <div className='invoice_main_info_part number_wrapper'>
                                <p>Hesab-faktura №:</p>
                                <p>{this.props.state.datas.checkDatas[0].Name}</p>
                            </div>
                            <div className='invoice_main_info_part date_wrapper'>
                                <p>Tarix:</p>
                                <p>{moment().format('YYYY-MM-DD HH:mm')}</p>
                            </div>
                        </div>
                    </div>
                    <Divider style={{ backgroundColor: 'black' }} dashed={false} />
                    <div className='invoice_supplier_part'>
                        <div className='invoice_main_info_part market cusnames'>
                            <p>Mal göndərən :</p>
                            <p>{this.props.state.profile.profile.CompanyName}</p>
                        </div>
                        <div className='invoice_main_info_part market'>
                            <p>Ünvan :</p>
                            <p>...</p>
                        </div>
                        <div className='invoice_main_info_part market'>
                            <p>Telefon :</p>
                            <p>{this.props.state.profile.profile.Mobile}</p>
                        </div>
                        <div className='invoice_main_info_part market'>
                            <p>Bank rekvizitləri :</p>
                            <p>{this.props.state.profile.profile.AccountNumber}</p>
                        </div>
                    </div>
                    <Divider style={{ backgroundColor: 'black' }} dashed={false} />
                    <div className='invoice_buyer_part'>
                        <div className='invoice_main_info_part market cusnames'>
                            <p>Mal alan :</p>
                            <p>{this.props.state.datas.checkDatas[0].CustomerName}</p>
                        </div>
                        <div className='invoice_main_info_part market'>
                            <p>VÖEN :</p>
                            <p></p>
                        </div>
                        <div className='invoice_main_info_part market'>
                            <p>Ünvan :</p>
                            <p></p>
                        </div>
                        <div className='invoice_main_info_part market'>
                            <p>Telefon :</p>
                            <p>{this.props.state.groups.customers[0].Phone}</p>
                        </div>

                    </div>

                    <BootstrapTable
                        keyField="id"
                        data={customPositions}
                        columns={cols}
                        striped
                        hover
                        condensed
                    />
                    <Divider className='total_price_divider'>{String(totalPrice).split(".")[0]} manat {String(totalPrice).split(".")[1]} qəp.</Divider>
                    <div className='invoice_buyer_part'>

                        <div className='invoice_main_info_part market customerinfo'>
                            <p>Qalıq borc :</p>
                            <p>{this.props.state.groups.customerLastTransaction}  {' ₼'}</p>
                        </div>
                        <div className='invoice_main_info_part market customerinfo'>
                            <p>Son ödəmə :</p>
                            <p>{this.props.state.groups.customerDebt}  {' ₼'}</p>
                        </div>

                        <div className='invoice_main_info_part market customerinfo companyname'>
                            <div className='firstCol cols'>
                                <p>{this.props.state.profile.profile.CompanyName} :</p>
                                <p>_____</p>

                            </div>
                            <div className='secondCol cols'>
                                <p>Təhvil verdi :</p>
                                <p> _____</p>

                            </div>
                            <div className='thirdCol cols'>
                                <p>Təhvil aldı :</p>
                                <p> _____</p>
                            </div>


                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    getCheckPage, fetchCheck
}

export default connect(mapStateToProps, mapDispatchToProps)(invoice)
