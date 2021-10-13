import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import cols from '../ColNames/Enters/colNames'
import { persistConfig } from '../reducers/rootReducer'
import filter from '../Filter/enters'
import { Col, Row } from 'antd';
import FilterPage from '../components/FilterPage';
import './Page.css'
import ResponsiveTable from '../components/ResponsiveTable';
import { setRedirect } from '../actions/delActions/delData-action'


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
                    <FilterPage from='enters' filter={filter} />
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)} redirectTo={'editEnter'} from={'enters'} editPage={'editEnter'} foredit={'enters'} />
                </Row>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state,setRedirect   
})
export default connect(mapStateToProps)(GridExampleContainer)
