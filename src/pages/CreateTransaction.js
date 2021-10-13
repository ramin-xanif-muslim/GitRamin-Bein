import React, { Component } from 'react'
import { connect } from 'react-redux'
import DocButtons from '../components/DocButtons'
import buttonsNames from '../ButtonsNames/NotDocs/buttonsNames'
import CreateTransactionForm from '../components/CreateTransactionForm'
import { getGroups } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { fetchPage } from '../actions/getData-action'
import { getCustomers } from '../actions/getCustomerGroups-action'
import { getSpendItems } from '../actions/getSpendItems-action'
class CreateTransaction extends Component {
    state = {
        doc: ''
    }
    componentWillMount() {
        this.props.getSpendItems()
        this.props.getCustomers()
    }
    componentDidMount() {
        const { match } = this.props
        if (match.params.id) {
            filterObject.id = match.params.id
            this.props.fetchPage('transactions')
        }
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.state.datas.pagePositions && nextProps.state.datas.pagePositions != this.props.state.datas.pagePositions
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.state.datas.pagePositions) {
            this.setState({
                doc: nextProps.state.datas.pagePositions[0]
            })
        }
    }
    render() {
        const { match } = this.props
        const returnElementId = (
            this.state.doc != '' ?
                <div>
                    <DocButtons buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                    <CreateTransactionForm datas={this.props.state.datas.spenditems} customergroups={this.props.state.groups.customerGroups} selectedDoc={this.state.doc} />
                </div>
                : <div>Loading..</div>
        )
        const returnElement = (
            <div>
                <DocButtons buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <CreateTransactionForm datas={this.props.state.datas.spenditems} customergroups={this.props.state.groups.customerGroups} selectedDoc={this.state.doc} />
            </div>
        )
        return (
            match.params.id ? returnElementId : returnElement
        )
    }
}
const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, fetchPage, getCustomers, getSpendItems
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransaction)
