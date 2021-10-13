import React, { Component } from 'react'
import { getCheckPage } from '../actions/check/check-action'
import { connect } from 'react-redux'
import { Divider } from 'antd';
import { fetchCheck } from '../actions/getData-action';
import { Spin, Alert } from 'antd';
import filterObject from '../config/filterObject';
import moment from 'moment';
import { getCustomersData } from '../actions/getCustomerGroups-action';
import { fetchProfile } from '../actions/getProfile-action';
import BootstrapTable from 'react-bootstrap-table-next';
import './check.css'
import updateUpperheader from '../actions/getNavbar-action'
import { getToken } from '../config/token';
import { ConvertDecimal, ConvertFixedTable } from '../Function/convertNumberDecimal';
var customPositions = []
var getfilter = {}

class check80 extends Component {

    componentDidMount() {
        this.props.getCheckPage(true)
        getfilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        getfilter.id = this.props.location.search.substring(1)
        this.props.fetchCheck(this.props.location.hash.slice(1), getfilter)
    }




    render() {
        const handlePriceFormatter = (cell, row) => {
            return ConvertFixedTable(`${cell}`)
        }
        const cols = [

            {

                dataField: 'Name',
                text: 'Adı',
            },
            {
                dataField: 'Quantity',
                text: 'Miqdar',
                formatter: handlePriceFormatter

            },
            {
                dataField: 'Price',
                text: 'Qiyməti',
                formatter: handlePriceFormatter

            },
            {
                dataField: 'TotalPrice',
                text: 'Məbləğ',
                formatter: handlePriceFormatter


            },
        ]
        customPositions = []
        {
            if (!this.props.state.groups.checkLoading) {
                Object.values(this.props.state.datas.checkDatas[0].Positions).map(d => customPositions.push(d))

            }
            customPositions.map(c => {
                c.TotalPrice = ConvertDecimal(c.Price * c.Quantity)
            })
         
        }

        console.log(this.props)
        const check_name = this.props.location.hash.slice(1)
        return (
            this.props.state.groups.checkLoading ? <Spin className='fetchSpinner' tip="Yüklənir...">
                <Alert />
            </Spin> :
                <div className='check' style={{ width: 'max-content' }}>
                    <div className='check_header'>
                        <div className='check_header_top'>
                            <p className='check_header_info'>Telefon nömrəsi</p>
                            <span className='check_header_info'>{this.props.state.profile.profile.Mobile}</span>
                        </div>
                        <div className='check_header_bottom'>
                            <h5 className='check_header_info'>VÖ ADI: {this.props.state.profile.profile.CompanyName}</h5>
                            <h5 className='check_header_info'>VÖEN: {this.props.state.profile.profile.Voin}</h5>
                        </div>

                        <div className='check_header_bottom'>
                            <h3 className='check_header_info'>{check_name === 'demands' ? 'SATIŞ' : check_name === 'demandreturns' ? 'Qaytarma' : ''} ÇEKİ</h3>
                            <h4 className='check_header_info'>Çek nömrəsi № {this.props.state.datas.checkDatas[0].Name}</h4>
                        </div>
                    </div>
                    <div className='check_main_info_section'>
                        <div className='check_main_info left'>
                            <span>Cavabdeh: {Object.values(this.props.state.owdep.owners).find(o => o.Id === this.props.state.datas.checkDatas[0].OwnerId).Name}</span>
                            <span>Qarşı-tərəf: {this.props.state.datas.checkDatas[0].CustomerName}</span>

                        </div>
                        <div className='check_main_info right'>
                            <span></span>
                            <span>Tarix: {moment().format('YYYY-MM-DD')}</span>
                            <span>Saat: {moment().format('HH:mm:ss')}</span>


                        </div>
                    </div>
                    <Divider dashed={true} />


                    <BootstrapTable
                        keyField="id"
                        data={customPositions}
                        columns={cols}
                        striped
                        hover
                        condensed
                    />

                    <Divider dashed={true} />

                    <div className='check_main_info_section check_header_bottom'>
                        <div className='check_main_info left'>
                            <h2 className='check_header_info totalPrice'>Məbləğ </h2>
                            <h3 className='info_h4' style={{ marginTop: '8px', marginBottom: '8px' }}>Son ödəmə:</h3>
                            <h3 className='info_h4'>Qalıq borc:</h3>



                        </div>

                        <div className='check_main_info right'>
                            <h1 className='check_header_info totalPrice'>{this.props.state.datas.checkDatas[0].Amount} {'₼'} </h1>
                            <h3 className='info_h4' style={{ marginTop: '8px', marginBottom: '8px' }}>{this.props.state.groups.customerLastTransaction}  {' ₼'}</h3>
                            <h3 className='info_h4'>{this.props.state.groups.customerDebt}  {' ₼'}</h3>
                        </div>
                    </div>

                    <Divider dashed={true} />
                    <div className='check_main_info_section check_header_bottom'>
                        <div className='check_main_info left'>
                            <h3 className='info_h4' style={{ marginTop: '8px', marginBottom: '8px' }}>Təhvil verdi:  _____________</h3>
                            <h3 className='info_h4' style={{ marginTop: '20px', marginBottom: '8px' }}>Təhvil aldı:  _____________</h3>
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
    getCheckPage, fetchCheck, getCustomersData, fetchProfile, updateUpperheader
}

export default connect(mapStateToProps, mapDispatchToProps)(check80)
