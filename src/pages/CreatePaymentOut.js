import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePaymentOutForm from '../components/CreatePaymentOutForm'
import { getGroups, getOwners, getDepartments } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { fetchPage, fetchData } from '../actions/getData-action'
import { getSpendItems } from '../actions/getSpendItems-action'
import { getCustomers } from '../actions/getCustomerGroups-action'
import { deleteProduct } from '../actions/updateProduct'

import { getToken } from '../config/token'
import { fetchProfile } from '../actions/getProfile-action'

class CreatePaymentOut extends Component {


    componentDidMount() {
        this.props.fetchProfile('company', { token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' })
        filterObject.id = ''
        this.props.deleteProduct('')
        this.props.getSpendItems()
        const { match } = this.props
        if (match.params.id) {
            filterObject.id = match.params.id
            this.props.fetchPage('paymentouts')
        }
    }




    render() {
        const { match } = this.props
        return (
            <div className='create_page'>

                <CreatePaymentOutForm fromdoc={this.props.location.state ? this.props.location.state.fromdoc.substring(1) : undefined} saledoc={this.props.location.state ? this.props.location.state : undefined} id={match.params.id ? match.params.id : ''} fetching={match.params.id ? this.props.state.datas.fetchingEdit : false} owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments} />
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, fetchPage, deleteProduct, fetchProfile, getCustomers, getOwners, getDepartments, fetchData, getSpendItems
}
export default connect(mapStateToProps, mapDispatchToProps)(CreatePaymentOut)
