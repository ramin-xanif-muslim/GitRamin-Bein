import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import DocTable from './DocTable';
import Trans from '../usetranslation/Trans';
import { Col, Row, Collapse } from 'antd';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/salesButtons'
import DocButtons from './DocButtons';
import { updateCustomerSelect } from '../actions/getCustomerGroups-action';
import { getGroups } from '../actions/getGroups-action';
import { openModal } from '../actions/updateStates-action';
import moment from 'moment';
import { delData } from '../actions/delActions/delData-action';
import SaleFormComponent from './SaleFormComponent';
import LoaderDocHOC from './LoaderDocHOC';
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





class CreateReturnForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)

    }

    state = {
        docid: '',
        status: false,
        errorFields: [],
        visible: false,
        childrenDrawer: false,
    }
    componentDidMount() {
        this.props.updateCustomerSelect('')
    }




    handleChange = (value) => {
        console.log(value)
    }


    deleteDoc = (id, e) => {
        e.stopPropagation()
        var grFilter = {}
        this.props.delData('returns', grFilter, id)

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


        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Button icon={<DeleteOutlined />} onClick={(e) => this.deleteDoc(this.props.id != '' ? this.props.id : this.props.state.putdatas.newDocId === '' ? '' : this.props.state.putdatas.newDocId, e)} className='align_center del' disabled={this.state.docid === '' ? this.state.newDocId === '' ? true : false : false}>
                        Sənədi sili
                    </Button>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );


        const { errorFields } = this.state
        return (
            <div className='table_holder'>
                <Row className='filter_table_wrapper_row doc'>
                    <Col className='page_name_wrapper' xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'><Trans word={'Return'} /></h2>
                    </Col>

                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>

                        <DocButtons errorFields={errorFields} from={this.props.fromdoc ? this.props.fromdoc : 'p=returns'} linkedDocs={this.props.state.datas.doc ? true : false} doc={this.props.state.datas.doc} toDoc='createPaymentIn' fromDoc='createDemand' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />

                        <div className='form_header_right_buttons_wrapper'>
                            <Button className='flex_directon_col_center d-flex-row'>
                                Qaimə
                                <PrinterOutlined />
                            </Button>
                            <Dropdown overlay={menu} trigger={['click']}>

                                <Button className='form_setting_icon_wrapper flex_directon_col_center' onClick={e => e.preventDefault()}>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                </Button>
                            </Dropdown>



                        </div>

                    </Col>

                    <SaleFormComponent docid={this.props.state.datas.doc[0].Id} doc={this.props.state.datas.doc[0]} />
                    <Col xs={24} md={24} xl={24}>
                        <DocTable visible={this.state.visible} linkedid={this.props.state.datas.doc[0].Id} from='sales' doc={this.props.state.datas.doc[0]} handleProduct={this.props.state.handleProduct.selectedProduct} datasource={this.props.state.datas.doc[0].Positions} />
                    </Col>
                </Row >


            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    putData, fetchData, updateCustomerSelect, openModal, getGroups, delData
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderDocHOC(CreateReturnForm, 'fetching'))