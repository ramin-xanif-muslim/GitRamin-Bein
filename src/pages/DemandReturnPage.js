import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Demands/colNames'

import {  Row } from 'antd';
import Filter from '../Filter/demands'
import FilterPage from '../components/FilterPage';
import './Page.css'
import ResponsiveTable from '../components/ResponsiveTable';


class GridExampleContainer extends Component {
    contextRef = createRef()

    constructor(props) {
        super(props)
        this.state = {
            cols: cols
        }
    }



    render() {
        return (
            <Row className={'table_holder_section'}>
                <Row className='filter_table_wrapper_row doc'>
                    <FilterPage from='demandreturns' filter={Filter} />
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)} redirectTo={'editDemandReturn'} from={'demandreturns'} editPage={'editDemandReturn'} foredit={'demandreturns'} />
                </Row>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
