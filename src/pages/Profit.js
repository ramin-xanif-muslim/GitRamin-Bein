import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProfit,removeProfit } from '../actions/getData-action'
import GridExampleContainer from './ProfitPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Profit/buttonsNames'
import filterObject from '../config/filterObject'
import { getToken } from '../config/token'
import moment from 'moment';
import { getSpendItems } from '../actions/getSpendItems-action'
class Profit extends Component {
    componentDidMount() {
        filterObject.pg = 0
        filterObject.id = ''
        filterObject.gp = ''
        filterObject.momb = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
        filterObject.mome = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss')
        if (JSON.parse(localStorage.getItem('user'))) {
            this.props.removeProfit()
            this.props.fetchProfit('profit',filterObject)
        }
    }
    render() {
        return (
            <div className='table_holder'>
                <ButtonsWrapper from={'normal'} fetchFast={'profit'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer datas={this.props.state.datas.profit} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchProfit,getSpendItems,removeProfit
}
export default connect(mapStateToProps, mapDispatchToProps)(Profit)
