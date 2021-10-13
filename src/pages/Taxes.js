import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import GridExampleContainer from './DemandPage'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Demands/buttonsNames'
import filterObject from '../config/filterObject'
import { setRedirect, isDeleted } from '../actions/delActions/delData-action'
import ok from '../audio/ok.mp3'
import { Col, Row } from 'antd';
import Sound from 'react-sound';
import { getTaxes } from '../actions/getData-action'
import TaxesPage from './TaxesPage'
import { getOwners, getDepartments } from '../actions/getGroups-action'

class Taxes extends Component {


    componentDidMount() {
        filterObject.pg = 0
        filterObject.id = ''
        filterObject.gp = ''
        this.props.getDepartments('departments')
        this.props.getOwners('owners')
        this.props.setRedirect(false)
        this.props.getTaxes()
    }

    handleDeleteDoc = () => {
        this.props.isDeleted(false)
    }
    render() {
        return (

            <div className='table_holder'>
                <Row className={'table_holder_section'}>
                        <TaxesPage fetching={this.props.state.datas.loading} datas={this.props.state.datas.taxes} />
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getOwners, getDepartments, setRedirect, isDeleted, getTaxes
}
export default connect(mapStateToProps, mapDispatchToProps)(Taxes)
