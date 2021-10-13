import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import LoaderDocHOC from './LoaderDocHOC';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import DocTable from './DocTable';
import { Link, Redirect } from 'react-router-dom';
import Trans from '../usetranslation/Trans';
import { Col, Row, Collapse } from 'antd';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/buttonsNames'
import DocButtons from '../components/DocButtons';
import { updateCustomerSelect } from '../actions/getCustomerGroups-action';
import { getGroups } from '../actions/getGroups-action';
import { delData, progressDelete } from '../actions/delActions/delData-action';
import { openModal } from '../actions/updateStates-action';
import moment from 'moment';
import { updateUpperheader } from '../actions/getNavbar-action'

import Sound from 'react-sound';
import ok from '../audio/ok.mp3'
import './ButtonsWrapper.css'
import './DocForm.css'

import { Icon } from 'semantic-ui-react'
import {
    PrinterOutlined,
    UserAddOutlined,
    DeleteOutlined,
    DownSquareOutlined,
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
import EnterFormComponent from './EnterFormComponent';
const { Option } = Select;





class CreateEnterForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
    }

    state = {
        doc: '',
        status: false,
        errorFields: [],
        childrenDrawer: false,
        archieve: this.props.id ? this.props.state.datas.doc[0].IsArch === 1 ? true : false : false,
        archForm: false,
        isArchFunc: false,
    }
    componentDidMount() {
        this.props.updateCustomerSelect('')
    }


    deleteDoc = (id, e) => {
        e.stopPropagation()
        var grFilter = {}
        progressDelete(true)
        this.props.delData('enters', grFilter, id)

    }


    handleChange = (value) => {
        console.log(value)
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

    handlePageCheck = () => {
        this.props.updateUpperheader(this.props.state.navbar.activeSubItem, '')

    }

    render() {
        if (this.props.state.putdatas.redirectDelete === true) {
            return <Redirect push to='/p=enter' />;
        }
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Button icon={<DeleteOutlined />} onClick={(e) => this.deleteDoc(this.props.id != '' ? this.props.id : this.props.state.savedoc.newDocId === '' ? '' : this.props.state.savedoc.newDocId, e)} className='align_center del' disabled={this.props.id === '' ? this.props.state.savedoc.newDocId === '' ? true : false : false}>
                        Sənədi sili
                    </Button>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );

        const check = (
            <Menu>
                <Menu.Item key="0">
                    <Link to={{ pathname: '/invoice', search: `${this.props.id}`, hash: "enters" }} onClick={this.handlePageCheck} target={'_blank'} >A4</Link>
                </Menu.Item>
            </Menu >
        );
        const { errorFields } = this.state
        return (
            <div className='table_holder'>


                <Row className='filter_table_wrapper_row doc'>
                    <Col className='page_name_wrapper' xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'><Trans word={'Enters'} /></h2>
                    </Col>

                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>
                        <DocButtons errorFields={errorFields} from={this.props.fromdoc ? this.props.fromdoc : 'p=enter'} linkedDocs={this.props.state.datas.doc ? true : false} doc={this.props.state.datas.doc} toDoc='createPaymentIn' fromDoc='createEnter' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                        <div className='form_header_right_buttons_wrapper'>
                            <Dropdown disabled={this.props.id === '' ? this.props.state.savedoc.newDocId === '' ? true : false : false} overlay={check} trigger={['click']}>
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


                    <EnterFormComponent docid={this.props.id ? this.props.state.datas.doc[0].Id : ''} datas={this.props.state.groups.groups} doc={this.props.id ? this.props.state.datas.doc[0] : ''} />
                    <Col xs={24} md={24} xl={24} style={{ marginTop: '20px' }}>
                        <DocTable visible={this.state.visible} linkedid={this.props.id ? this.props.state.datas.doc[0].Id : ''} from='enters' doc={this.props.id ? this.props.state.datas.doc[0] : ''} handleProduct={this.props.state.handleProduct.selectedProduct} datasource={this.props.id ? this.props.state.datas.doc[0].Positions : []} />
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
    putData, fetchData, updateUpperheader, updateCustomerSelect, openModal, getGroups, delData,
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderDocHOC(CreateEnterForm, 'fetching'))