import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateEnterForm from '../components/CreateEnterForm'
import { getGroups, getOwners, getDepartments } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { fetchPage } from '../actions/getData-action'
import { deleteProduct } from '../actions/updateProduct'
import getMarks from '../actions/getMarks-action'
import { updateSelectProductMultiConfirm } from '../actions/updateStates-action'

import { fetchProfile } from '../actions/getProfile-action'

class CreateEnter extends Component {



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
            this.props.fetchPage('enters')
        }
    }


    render() {
        const { match } = this.props
        return (
            <div className='create_page'>
                <CreateEnterForm fromdoc={this.props.location.state ? this.props.location.state : ''} id={match.params.id ? match.params.id : ''} fetching={match.params.id ? this.props.state.datas.fetchingEdit : false} owners={this.props.state.owdep.owners} departments={this.props.state.owdep.departments} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, fetchPage,updateSelectProductMultiConfirm, deleteProduct, getOwners, getDepartments, getMarks, fetchProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnter)
