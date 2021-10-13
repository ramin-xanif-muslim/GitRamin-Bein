import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateCustomerForm from '../components/CreateCustomerForm'
import { getGroups } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import {fetchData} from '../actions/getData-action'
import { getCheckPage } from '../actions/check/check-action'
import { deleteBarcode } from '../actions/getBarcode-action'



class CreateCustomer extends Component {

    componentWillMount() {
        this.props.getGroups('customergroups')
    }


    componentDidMount() {
        const { match } = this.props
        this.props.deleteBarcode()
        this.props.getCheckPage(false)
        if (!this.props.customer && match.params.id) {
            filterObject.id = match.params.id
            filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
            this.props.fetchData('customers',filterObject)
        }
    }


    render() {
        const { match } = this.props

        const returnElementId = (
            this.props.customer ?
                <div>
                    <CreateCustomerForm datas={this.props.state.groups.groups} owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments}  selectedCustomer={this.props.customer} />
                </div>
                : <div>Loading..</div>
        )
        const returnElement = (
            <div>
                <CreateCustomerForm datas={this.props.state.groups.groups}  owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments}  selectedCustomer={this.props.customer} />
            </div>

        )

        return (
            match.params.id ? returnElementId : returnElement

        )
    }
}

const mapStateToProps = (state, props) => ({
    state,
    customer: state.datas.datas.find(p => p.Id == props.match.params.id)
})
const mapDispatchToProps = {
    getGroups, fetchData,getCheckPage,deleteBarcode
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomer)
