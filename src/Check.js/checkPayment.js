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
import { getToken } from '../config/token';
var customPositions = []
var getfilter = {}

class checkPayment extends Component {
    componentDidMount() {
        this.props.getCheckPage(true)
        getfilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        getfilter.id = this.props.location.search.substring(1)
        this.props.fetchCheck(this.props.location.hash.slice(1), getfilter)
    }


    render() {
        const check_name = this.props.location.hash.slice(1)
        return (
            this.props.state.groups.checkLoading ? <Spin className='fetchSpinner' tip="Yüklənir...">
                <Alert />
            </Spin> :
                 <div className='check' style={{width:'max-content'}}>
                 <div className='check_header'>
                     <div className='check_header_top checkPayment'>
                         <p className='check_header_info'>Mədaxil nömrəsi №   {this.props.state.datas.checkDatas[0].Name}</p>
                         <p>Tarix: {moment().format('YYYY-MM-DD')}</p>
                         <p>Saat: {moment().format('HH:mm:ss')}</p>

                     </div>
                   
                 </div>
                 <div className='check_main_info_section'>
                     <div className='check_main_info left checkpayment'>
                         <span>Ödəyici: {this.props.state.datas.checkDatas[0].CustomerName}</span>
                         <span>Ödəniş maddəsi: { Object.values(this.props.state.spenditems.spendItems).find(item => item.Id === this.props.state.datas.checkDatas[0].SpendItem).Name}</span>
                         <span>Ödəniş növü: Nəğd</span>
                         <span>Məbləğ:  {this.props.state.datas.checkDatas[0].Amount}</span>
                         <Divider dashed={true} />
                         <span>İcraçı: {Object.values(this.props.state.owdep.owners).find(o => o.Id === this.props.state.datas.checkDatas[0].OwnerId).Name} __________</span>

                     </div>
     
                 </div>
                 <Divider dashed={true} />
             </div>

        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    getCheckPage, fetchCheck, getCustomersData, fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(checkPayment)
