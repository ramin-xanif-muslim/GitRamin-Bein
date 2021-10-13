import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateReturnForm from '../components/CreateReturnForm'
import filterObject from '../config/filterObject'
import { getCustomersData, updateCustomerSelect } from '../actions/getCustomerGroups-action'
import { fetchPage, fetchData } from '../actions/getData-action'
import { deleteProduct } from '../actions/updateProduct'
import getMarks from '../actions/getMarks-action'
import { getCustomers } from '../actions/getCustomerGroups-action'
import { Spin, Alert } from 'antd';

class EditReturn extends Component {

    componentDidMount() {
        filterObject.id = ''
        this.props.deleteProduct('')
        this.props.getMarks()
        const { match } = this.props
        if (match.params.id != '') {
            filterObject.id = match.params.id
            this.props.fetchPage('returns')
        }
    }




    render() {
        return (
            <div className='create_page'>

                <CreateReturnForm doctype={'Return Number'} fetching={this.props.state.datas.fetchingEdit} fromdoc={this.props.location.state ? this.props.location.state : ''} owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments} />
            </div>
        )
    }
}
const mapStateToProps = (state, props) => ({
    state
})
const mapDispatchToProps = {
    fetchPage, getCustomersData, updateCustomerSelect, deleteProduct, getCustomers, fetchData, getMarks
}
export default connect(mapStateToProps, mapDispatchToProps)(EditReturn)
