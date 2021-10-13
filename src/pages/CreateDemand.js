import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateDemandForm from '../components/CreateDemandForm'
import { getGroups, getOwners, getDepartments } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { getCustomersData, updateCustomerSelect } from '../actions/getCustomerGroups-action'
import { fetchPage, fetchData } from '../actions/getData-action'
import { deleteProduct } from '../actions/updateProduct'
import { fetchProfile } from '../actions/getProfile-action'
import getMarks from '../actions/getMarks-action'
import { updateSelectProductMultiConfirm } from '../actions/updateStates-action'
import { getCustomers } from '../actions/getCustomerGroups-action'
import { Spin, Alert } from 'antd';
import { getToken } from '../config/token'


class CreateDemand extends Component {
    componentDidMount() {
        this.props.fetchProfile('company', { token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' })
        filterObject.id = ''
        this.props.deleteProduct('')
        this.props.getMarks()
        this.props.getGroups('stocks')
        this.props.updateSelectProductMultiConfirm(false, false, false, [])
        const { match } = this.props
        if (match.params.id) {
            filterObject.id = match.params.id
            this.props.fetchPage('demands')
        }
    }




    render() {
        const { match } = this.props
        return (
            <div className='create_page'>
                <CreateDemandForm url={match.url}  fromdoc={this.props.location.state ? this.props.location.state.fromdoc.substring(1) : undefined}  id={match.params.id ? match.params.id : ''} fetching={match.params.id ? this.props.state.datas.fetchingEdit : false} owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments} />
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, fetchPage, fetchProfile, getCustomersData, updateCustomerSelect, deleteProduct, getCustomers, getOwners, getDepartments, fetchData, getMarks, updateSelectProductMultiConfirm
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDemand)
