import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import { getGroups } from '../actions/getGroups-action'
import GridExampleContainer from '../modal/ModalContainer'
import ButtonsWrapper from '../components/ButtonsWrapper'
import buttonsNames from '../ButtonsNames/Products/buttonsNames'
import { fetchAttributes, fetchRefList } from '../actions/getAttributes-action'
import filterObject from '../config/filterObject'
import ModalHOC from './ModalrHOC'


import '../components/ButtonsWrapper.css'


class ProductForDoc extends Component {
    state={
        attributes : []
    }
    



    componentWillReceiveProps(nextProps){

        if(nextProps.state.attributes.attributes !=this.props.state.attributes.attributes){
                this.setState({
                    attributes:nextProps.state.attributes.attributes
                })
        }       
    }


    render() {
        return (
            <div className='table_holder'>
                <ButtonsWrapper from={'modal'} onOk = {this.props.onOk}  onGancel = {this.props.onGancel}  fetchFast={'products'} buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={'Məhsullar'} />
                <GridExampleContainer attributes={this.state.attributes} groups={this.props.state.docmodals.productGroups} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getGroups, fetchRefList, fetchAttributes
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(ProductForDoc,'fetching'))
