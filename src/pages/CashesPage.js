import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Col, Row } from 'antd';
import './Page.css'
import TableCashes from '../components/TableCashes';
import Filter from '../Filter/demands'
import FilterPage from '../components/FilterPage';
import LoaderHOC from '../components/LoaderHOC';

class GridExampleContainer extends Component {
    contextRef = createRef()

    constructor(props) {
        super(props)
        this.state = {
            cols: []
        }
    }





    render() {

        const cols = [
            {
                text: 'Ad',
                dataField: 'Name',
                footer: 'Cəm :'
            },
            {
                dataField: 'Balance',
                text: 'Məbləğ',
                footer: `${this.props.state.datas.additionalInfo.AllSum}`


            },
        ]

        return (
            <Row className={'table_holder_section'}>
                <Col xs={24} md={24} xs={24}>
                    <FilterPage filter={Filter} />
                </Col>
                <Col xs={24} md={24} xl={8}>
                    <TableCashes datas={this.props.datas} cols={cols} />
                </Col>


            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(LoaderHOC(GridExampleContainer, 'datas'))
