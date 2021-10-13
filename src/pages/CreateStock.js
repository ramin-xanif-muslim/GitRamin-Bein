import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateProductForm from '../components/CreateProductForm'
import { deleteBarcode } from '../actions/getBarcode-action'
import { getGroups, getOwners, getDepartments } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { fetchData } from '../actions/getData-action'
import { fetchAttributes, fetchRefList } from '../actions/getAttributes-action'
import StockPageFormSetting from './StockPageFormSetting'

var inputsNameArray = []

class CreateProduct extends Component {

    componentDidMount() {
        const { match } = this.props
        if (!this.props.stock && match.params.id) {
            filterObject.id = match.params.id
            filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
            this.props.fetchData('stocks', filterObject)
        }
        if (JSON.parse(localStorage.getItem('user'))) {
            this.props.getGroups('stocks')

        }
    }



render() {
    const { match } = this.props
    const returnElementId = (
        this.props.stock ?
            <div>
                <StockPageFormSetting datas={this.props.state.groups.groups} selectedStock={this.props.stock} />
            </div>
            : <div>Loading..</div>
    )
    const returnElement = (
        <div>
            <StockPageFormSetting datas={this.props.state.groups.groups} selectedStock={this.props.stock} />
        </div>

    )

    return (
        match.params.id ? returnElementId : returnElement

    )
}
}

const mapStateToProps = (state, props) => ({
    state,
    stock: state.datas.datas.find(p => p.Id == props.match.params.id)
})
const mapDispatchToProps = {
    getGroups, fetchData, getOwners, getDepartments, fetchRefList, fetchAttributes, deleteBarcode
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
