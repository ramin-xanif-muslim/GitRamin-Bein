import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Profit/colNames'
import { Col, Row } from 'antd';
import './Page.css'
import TableProfit from '../components/TableProfit';
import filter from '../Filter/profits'
import FilterPage from '../components/FilterPage';
import LoaderHOC from '../components/LoaderHOC';

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
                <Col xs={24} md={24} xs={24}>
                    <FilterPage filter={filter} />
                </Col>
                <Col xs={24} md={24} xl={8}>
                    <TableProfit datas={this.props.state.datas.fetching ? [] : this.props.datas} cols={cols} />
                </Col>


            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(LoaderHOC(GridExampleContainer,'datas'))
