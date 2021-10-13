import React, { Component } from 'react'
import { DownloadOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import updateChanged from '../actions/updateChanged-action'
import TransactionButtons from './TransactionButtons';
import { Button, Icon } from 'semantic-ui-react'
import { openFilter } from '../actions/modalActions/getCustomerGroupsModal-action';
import SearchInput from './SearchInput';

import {
    PlusCircleOutlined,
    SearchOutlined,
    FilterOutlined
} from '@ant-design/icons';
class ButtonSize extends React.Component {



    handleClearChnaged = (e) => {
        if (e.target.parentElement.id === 'openFilter' || e.target.id === 'openFilter') {
            e.preventDefault()
            this.props.openFilter(!this.props.state.filters.isOpen)
            return false
        }
        this.props.updateChanged(false, '')
    }
    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    };


    render() {

        const buttons = (
            Object.values(this.props.items).map(p =>
                <Button animated='vertical' onClick={this.handleClearChnaged} as={Link} key={p.id} to={p.url ? p.url : ''} className={p.className} id={p.id}>
                    <Button.Content visible>{p.url ? <PlusCircleOutlined /> : p.isfilter ? <FilterOutlined /> : ''} {p.title}</Button.Content>
                    <Button.Content hidden>{p.id === 'openFilter' && this.props.state.filters.isOpen == false ? p.animated : p.id === 'openFilter' && this.props.state.filters.isOpen == true ? 'Bağla' : p.animated}</Button.Content>
                </Button>
            )
        )
        const transactionbuttons = (
            <TransactionButtons handleClearChnaged={this.handleClearChnaged} />
        )

        const buttonsWrapper = (
            <>
                {
                    this.props.fetchFast === 'transactions' ? transactionbuttons : this.props.from === 'dashboard' ? '' : buttons

                }
                {
                    this.props.from === 'dashboard' ? '' : < SearchInput from={this.props.searchFrom} fetchFast={this.props.searchFast} />

                }

            </>

        )

        const modalButtonsWrapper = (
            <div style={{ flexGrow: '1', display: 'flex', justifyContent: 'space-between' }}>
                < SearchInput from={this.props.searchFrom} fetchFast={this.props.searchFast} />
                <div>
                    <Button style={{ marginLeft: '10px' }} className='customsavebtn' type="primary" onClick={this.props.onOk}>Yadda saxla</Button>
                    <Button style={{ marginLeft: '10px' }} className='customclosebtn' onClick={this.props.onGancel}>Bağla</Button>
                </div>

            </div>
        )
        return (
            <>
                {
                    this.props.searchFrom === 'modal' ? modalButtonsWrapper : buttonsWrapper
                }
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateChanged, openFilter
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ButtonSize))
