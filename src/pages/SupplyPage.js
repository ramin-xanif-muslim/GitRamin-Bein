import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Supplies/colNames'
import { persistConfig } from '../reducers/rootReducer'
import filter from '../Filter/supplies'
import FilterPage from '../components/FilterPage';
import { Col, Row } from 'antd';
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
                    <FilterPage from='supplies' filter={filter} />
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)} redirectTo={'editSupply'} from={'supplies'} editPage={'editSupply'} foredit={'supplies'} />
                </Row>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
