import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfit } from '../actions/getData-action'
import GridExampleContainer from './CashesPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Cashes/buttonsNames'
import { fetchData } from '../actions/getData-action'
import { getSpendItems } from '../actions/getSpendItems-action'
class Cashes extends Component {
    componentDidMount() {
        var cashesFilter = {}
        cashesFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        if (JSON.parse(localStorage.getItem('user'))) {
            this.props.fetchData('cashes',cashesFilter)
        }
    }
    render() {
        return (
            <div className='table_holder'>
                <ButtonsWrapper from={'normal'} fetchFast={'cashes'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer datas={this.props.state.datas.datas} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchProfit, getSpendItems, fetchData
}
export default connect(mapStateToProps, mapDispatchToProps)(Cashes)
