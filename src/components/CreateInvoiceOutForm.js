import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import DocTable from './DocTable';
import { Link, Redirect } from 'react-router-dom';
import Trans from '../usetranslation/Trans';
import { Col, Row, Collapse } from 'antd';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/buttonsNames'
import DocButtons from './DocButtons';
import { getGroups } from '../actions/getGroups-action';
import LoaderDocHOC from './LoaderDocHOC';
import { openModal } from '../actions/updateStates-action';
import { updateCustomerSelect } from '../actions/getCustomerGroups-action';
import { delData } from '../actions/delActions/delData-action';
import moment from 'moment';
import InvoiceOutFormComponent from './InvoiceOutFormComponent';
import { updateUpperheader } from '../actions/getNavbar-action'


import './ButtonsWrapper.css'
import './DocForm.css'

import { Icon } from 'semantic-ui-react'
import {
    PrinterOutlined,
    UserAddOutlined,
    DeleteOutlined,
    HomeOutlined
} from '@ant-design/icons';
import {
    Form,
    Input,
    Button,
    InputNumber,
    TreeSelect,
    Checkbox,
    Dropdown,
    DatePicker,
    Switch,
    Select,
    Spin,
    Tag,
    Divider,
    Menu
} from 'antd';
const { Option } = Select;





class CreateInvoiceOutForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            doc: '',
            status: false,
            errorFields: [],
            childrenDrawer: false,
        }
    }
    componentDidMount() {
        this.props.updateCustomerSelect('')
    }
    deleteDoc = (id, e) => {
        e.stopPropagation()
        var grFilter = {}
        this.props.delData('invoiceouts', grFilter, id)

    }

    handleChange = (value) => {
        console.log(value)
    }



    handlePageCheck = () =>{
        this.props.updateUpperheader(this.props.state.navbar.activeSubItem, '')

    }


    onFinishFailed = (values) => {
        this.setState({
            errorFields: values.errorFields
        })
    }
    handleStatusSelect = (checked, event) => {
        this.setState({
            status: checked
        })
    }

    render() {
        if (this.props.state.putdatas.redirectDelete === true) {
            return <Redirect push to='/p=transactions' />;
        }

        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Button icon={<DeleteOutlined />} onClick={(e) => this.deleteDoc(this.props.id != '' ? this.props.id : this.props.state.savedoc.newDocId === '' ? '' : this.props.state.savedoc.newDocId, e)} className='align_center del' disabled={this.state.docid === '' ? this.state.newDocId === '' ? true : false : false}>
                        Sənədi sili
                    </Button>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );


        const check = (
            <Menu>
                <Menu.Item key="0">
                    <Link to={{ pathname: '/checkPayment', search: `${this.props.id}`, hash: "invoiceouts" }} onClick={this.handlePageCheck} target={'_blank'} >A4</Link>

                </Menu.Item>
                <Menu.Item key="1">
                    <Button className='flex_directon_col_center' >
                        50 mm
                    </Button>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={{ pathname: '/checkPayment', search: `${this.props.id}`, hash: "invoiceouts" }} onClick={this.handlePageCheck} target={'_blank'} >80mm </Link>

                </Menu.Item>
            </Menu >
        );



        const { errorFields } = this.state
        return (
            <div className='table_holder'>
                <Row className='filter_table_wrapper_row doc'>
                    <Col className='page_name_wrapper' xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'><Trans word={'InvoiceOut'} /></h2>
                    </Col>

                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>

                        <DocButtons errorFields={errorFields} from={this.props.fromdoc ? this.props.fromdoc : 'p=transactions'} linkedDocs={this.props.state.datas.doc ? true : false} doc={this.props.state.datas.doc} toDoc='' fromDoc='createInvoiceOut' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />

                        <div className='form_header_right_buttons_wrapper'>
                            <Dropdown overlay={check} trigger={['click']}>
                                <Button className='flex_directon_col_center d-flex-row'>
                                    Qaimə
                                    <PrinterOutlined />
                                </Button>
                            </Dropdown>

                            <Dropdown overlay={menu} trigger={['click']}>

                                <Button className='form_setting_icon_wrapper flex_directon_col_center' onClick={e => e.preventDefault()}>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                </Button>
                            </Dropdown>



                        </div>

                    </Col>
                    <InvoiceOutFormComponent docid={this.props.id ? this.props.state.datas.doc[0].Id : ''} saledoc={this.props.saledoc} datas={this.props.state.spenditems.spendItems} doc={this.props.id ? this.props.state.datas.doc[0] : ''} />
                </Row >


            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    putData, fetchData, openModal, getGroups,updateCustomerSelect,delData,updateUpperheader
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderDocHOC(CreateInvoiceOutForm, 'fetching'))