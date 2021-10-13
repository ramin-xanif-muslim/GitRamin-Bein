import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocButtons from '../components/DocButtons'
import buttonsNames from '../ButtonsNames/NotDocs/buttonsNames'
import CreateCustomerGroupForm from '../components/CreateCustomerGroupForm'
import { getGroups } from '../actions/getGroups-action'
import { getToken } from '../config/token'
import filterObject from '../config/filterObject'
import { fetchData } from '../actions/getData-action'



class CreateCustomerGroup extends Component {

    componentWillMount() {
        const { match } = this.props
        if (!this.props.customergr && match.params.id) {
            filterObject.id = match.params.id
            filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
            this.props.fetchData('customergroups', filterObject)
        }
        if (JSON.parse(localStorage.getItem('user'))) {
            this.props.getGroups('customergroups')
        }
    }


    render() {
        const { match } = this.props

        const returnElementId = (
            this.props.customergr ?
                <div>
                    <CreateCustomerGroupForm datas={this.props.state.groups.groups} selectedCusGr={this.props.customergr} />

                </div>
                : <div>Loading..</div>
        )
        const returnElement = (
            <div>
                <CreateCustomerGroupForm datas={this.props.state.groups.groups} selectedCusGr={this.props.customergr} />

            </div>

        )
        return (
            <div>
            {
                match.params.id ? returnElementId : returnElement
            }
        </div>
        )
    }
}

const mapStateToProps = (state,props) => ({
    state,
    customergr:Object.values(state.groups.groups).find(p => p.Id == props.match.params.id)

})
const mapDispatchToProps = {
    getGroups,fetchData
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerGroup)
