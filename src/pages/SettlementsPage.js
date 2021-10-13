import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Settlements/colNames'
import { Col, Row } from 'antd';
import './Page.css'
import ResponsiveTable from '../components/ResponsiveTable';
import Filter from '../Filter/settlements'
import FilterPage from '../components/FilterPage';


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
                    <FilterPage from={'settlements'} filter={Filter} />
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)} redirectTo={''} linkedDocs={true} from={'settlements'} editPage={''} foredit={'settlements'} />
                </Row>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
