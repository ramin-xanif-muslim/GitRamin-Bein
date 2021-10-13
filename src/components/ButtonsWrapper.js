import React, { Component } from 'react'
import PageHeaderCustom from './PageHeaderCustom'
import { connect } from 'react-redux'
import Buttons from './Buttons'
import FilterDateComponent from './FilterDateComponent'
import ExportCSV from '../components/ExportCSV';

import { Col, Row } from 'antd';

import './ButtonsWrapper.css'
class ButtonsWrapper extends Component {


    render() {
        return (
            <Row className='buttons_wrapper_side' style={{ zIndex: !this.props.state.stateChanges.zindex ? 102 : 0 }} >

                <PageHeaderCustom activeItem={this.props.activeitem} activeSubItem={this.props.activesubitem} />
                <div className='buttons_center'>
                    <Buttons searching={this.props.searching} onOk={this.props.onOk} onGancel={this.props.onGancel} searchFrom={this.props.from} fetchFast={this.props.fetchFast} searchFast={this.props.fetchFast} from={this.props.from ? this.props.from : ''} items={this.props.buttonsName} activeSubItem={this.props.activesubitem} />
                </div>

                {
                    this.props.fetchFast === 'products' ||
                        this.props.fetchFast === 'customers' ||
                        this.props.fetchFast === 'stockbalance' ||
                        this.props.fetchFast === 'settlements' ||
                        this.props.fetchFast === 'download' ||
                        this.props.fetchFast === 'cashes' ||
                        this.props.from === 'dashboard' ||
                        this.props.fetchFast === 'salepoints' ? '' :
                        <FilterDateComponent from={this.props.fetchFast} />


                }
            </Row>

        )
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(ButtonsWrapper)
