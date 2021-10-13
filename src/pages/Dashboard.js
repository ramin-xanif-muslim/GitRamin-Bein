import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import GridExampleContainer from './DashboardPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Dashboard/buttonsNames'
import { updateColName } from '../actions/updateColName'
import { fetchDashboard } from '../actions/getDashboard'
import { getToken } from '../config/token'

class Dashboard extends Component {

    constructor(props) {
        super(props)


    }
    componentDidMount() {
        if (JSON.parse(localStorage.getItem('user'))) {
            this.props.fetchDashboard()
        }
    }


    render() {

        return (
            <div className='pageWrapper'>
                <ButtonsWrapper from='dashboard' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                <GridExampleContainer cardIndicators={this.props.state.dashboard.dashboardMenu} chartIndicators={this.props.state.dashboard.dashboardChart} />

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateColName, fetchDashboard
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
