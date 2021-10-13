import React, { Component, createRef } from 'react'
import ProductFolder from './ProductFolder'
import cols from '../ColNames/Customers/colNames'
import { Col, Row } from 'antd';
import './Page.css'
import { connect } from 'react-redux'
import ResponsiveTable from '../components/ResponsiveTable';
import Filter from '../Filter/customers'
import FilterPage from '../components/FilterPage';
import {
    Rail,
    Ref,
    Segment,
    Sticky,
} from 'semantic-ui-react'
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

                <ProductFolder from={'customers'} groups={this.props.groups} />

                <Row className='filter_table_wrapper_row'>

                    <FilterPage  from='customers' filter={Filter} />
                    <ResponsiveTable cols={cols} columns={cols.filter(c => c.hidden == false)} redirectTo={'editCustomer'} from={'customers'} editPage={'editCustomer'} foredit={'customers'} />
                </Row>



            </Row>


        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
