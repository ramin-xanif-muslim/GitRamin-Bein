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
import { API_BASE } from '../config/env';
import BootstrapTable from 'react-bootstrap-table-next';
import './check.css'
import { getToken } from '../config/token';
var customPositions = []
var getfilter = {}

class bc extends Component {
    componentDidMount() {
        this.props.getCheckPage(true)
        // getfilter.id = 
        // this.props.fetchCheck(this.props.location.hash.slice(1), getfilter)
    }


    render() {
        return (
            <div>
                <img src={`${API_BASE}/products/print.php?bc=${this.props.location.search.substring(1)}`} />
                <div class="name">
                    <p>  {new URLSearchParams(this.props.location.search).get("nm")}</p>
                    <p className='pricep'> {new URLSearchParams(this.props.location.search).get("pr")}<sup class='manat'>₼</sup></p>
                </div>
              
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

export default connect(mapStateToProps, mapDispatchToProps)(bc)
