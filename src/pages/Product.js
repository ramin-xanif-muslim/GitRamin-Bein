import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import { getGroups } from '../actions/getGroups-action'
import GridExampleContainer from './ProductPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Products/buttonsNames'
import { fetchAttributes, fetchRefList } from '../actions/getAttributes-action'
import filterObject from '../config/filterObject'
import { getToken } from '../config/token'
import { getCheckPage } from '../actions/check/check-action'
import { getOwners,getDepartments } from '../actions/getGroups-action'

import '../components/ButtonsWrapper.css'


class Product extends Component {
    state = {
        attributes: []
    }
    componentDidMount() {
        filterObject.id = ''
        filterObject.gp = ''
    

        this.props.getCheckPage(false)

        if (JSON.parse(localStorage.getItem('user'))) {
            this.props.getOwners('owners')
            this.props.getDepartments('departments')
            this.props.getGroups('productfolders')
            this.props.fetchAttributes('attributes', 'product')
        }
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.state.attributes.attributes != this.props.state.attributes.attributes) {
            this.setState({
                attributes: nextProps.state.attributes.attributes
            })
        }
    }


    render() {
        return (
            <div className='table_holder'>
                <ButtonsWrapper searching = {this.props.state.datas.searching} from={'fast'} fetchFast={'products'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer attributes={this.state.attributes} groups={this.props.state.groups.groups} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getGroups, fetchRefList, fetchAttributes,getCheckPage,getOwners,getDepartments
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)
