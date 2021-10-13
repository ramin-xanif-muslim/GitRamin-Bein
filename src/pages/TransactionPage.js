import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Transactions/colNames'
import { Col, Row } from 'antd';
import FilterPage from '../components/FilterPage';
import Filter from '../Filter/transactions'
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
                    <FilterPage  from='transactions' filter={Filter} />
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)} redirectTo={'editTransaction'} from={'transactions'} editPage={'editTransaction'} foredit={'transactions'} />
                </Row>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
