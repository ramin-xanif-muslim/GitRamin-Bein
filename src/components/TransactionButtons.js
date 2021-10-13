import React, { Component } from 'react'
import { Menu, Dropdown } from 'antd';
import { Button, Icon } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import Trans from '../usetranslation/Trans';
import { connect } from 'react-redux'
import updateChanged from '../actions/updateChanged-action'
import { openFilter } from '../actions/modalActions/getCustomerGroupsModal-action';


import './TransactionButtons.css'

import {
    PlusCircleOutlined,
    SearchOutlined,
    FilterOutlined
} from '@ant-design/icons';

const menuPaymentIn = (
    <Menu className='transaction_buttons_menu'>
        <Menu.Item key="0">
            <Button as={Link} to="/createPaymentIn">< Trans word={'cash'} /></Button>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <Button as={Link} to="/createInvoiceIn">< Trans word={'invoice'} /></Button>
        </Menu.Item>
    </Menu>
);


const menuPaymentOut = (
    <Menu className='transaction_buttons_menu'>
        <Menu.Item key="0">
            <Button as={Link} to="/createPaymentOut">< Trans word={'cash'} /></Button>

        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
            <Button as={Link} to="/createInvoiceOut">< Trans word={'invoice'} /></Button>
        </Menu.Item>
    </Menu>
);

class TransactionButtons extends Component {

    onClick = () => {
        this.props.openFilter(!this.props.state.filters.isOpen)
    }
    render() {
        return (
            <>
                <Dropdown overlay={menuPaymentIn} trigger={['click']}>
                    <Button icon labelPosition='left' animated='vertical' className='project_buttons'>
                        <Icon name='add circle' />
                        <Button.Content visible><Trans word={'NewPaymentIn'} /> </Button.Content>
                        <Button.Content hidden><DownOutlined /></Button.Content>
                    </Button>
                </Dropdown>
                <Dropdown overlay={menuPaymentOut} trigger={['click']}>
                    <Button style={{ marginLeft: '15px' }} icon labelPosition='left' animated='vertical' className='project_buttons'>
                        <Icon name='minus circle' />
                        <Button.Content visible><Trans word={'NewPaymentOut'} /> </Button.Content>
                        <Button.Content hidden><DownOutlined /></Button.Content>
                    </Button>
                </Dropdown>

                <Button animated='vertical' style={{ marginLeft: '15px' }} onClick={this.onClick} className={'project_buttons'}>
                    <Button.Content visible>{<FilterOutlined />} Filter</Button.Content>
                    <Button.Content hidden>{this.props.state.filters.isOpen == false ? 'Filter aç' : this.props.state.filters.isOpen == true ? 'Bağla' : 'Filter aç'}</Button.Content>
                </Button>
            </>
        )
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateChanged, openFilter
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TransactionButtons))