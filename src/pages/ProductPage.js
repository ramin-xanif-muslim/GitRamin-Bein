import React, { Component, createRef } from 'react'
import ProductFolder from './ProductFolder'
import cols from '../ColNames/Products/colNames'
import { Col, Row } from 'antd';
import filter from '../Filter/products'
import FilterPage from '../components/FilterPage';
import './Page.css'
import { connect } from 'react-redux'
import ResponsiveTable from '../components/ResponsiveTable';
import LoaderHOC from '../components/LoaderHOC';

var attributesNamesArray = []
var attributesNameFilterArray = []

class GridExampleContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cols: cols,
            attributes: this.props.attributes
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.attributes != this.props.attributes) {
            attributesNamesArray = []
            attributesNameFilterArray = []


            if (Array.isArray(nextProps.attributes)) {


                Object.values(nextProps.attributes).map(c => {
                    attributesNamesArray.push({
                        dataField: 'col_' + c.Name,
                        text: c.Title,
                        sort: true,
                        hidden: true
                    })
                })
                Object.values(nextProps.attributes).map(c => {
                    attributesNameFilterArray.push({
                        key: c.ReferenceTypeId,
                        label: c.Title,
                        name: c.ValueType === 'string' ? 'colt--' + c.Name : '',
                        type: c.ReferenceTypeId ? 'selectMod' : 'text',
                        controller: c.ReferenceTypeId ? 'selectMod' : '',
                        hidden: true
                    })
                })

            }


            this.setState({
                attributes: attributesNamesArray
            })
        }
    }
    render() {
        return (
            <Row className={'table_holder_section'}>
                <ProductFolder from={'products'} groups={this.props.groups} />
                <Row className='filter_table_wrapper_row'>
                    <FilterPage from='products' filter={filter.concat(attributesNameFilterArray)} />
                    <ResponsiveTable cols={cols} attributes={attributesNamesArray} initialcols={cols.concat(attributesNamesArray)} columns={cols.concat(attributesNamesArray).filter(c => c.hidden == false)} redirectTo={'editProduct'} from={'products'} editPage={'editProduct'} foredit={'products'} />
                </Row>

            </Row>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
export default connect(mapStateToProps)(GridExampleContainer)
