import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import getCard from '../actions/getCard-action'
import putData from '../actions/putAactions/putData-action';
import { updateStatesCreate } from '../actions/updateStates-action';
import axios from 'axios';
import DocButtons from '../components/DocButtons';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/buttonsNames'
import Trans from '../usetranslation/Trans';

import { Col, Row, Collapse } from 'antd';
import { getToken } from '../config/token';
import { API_BASE } from '../config/env';
import './ButtonsWrapper.css'
import './Colors.css'
import { Redirect } from 'react-router';


import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    message,
    Menu,
    Dropdown,
    Switch,
} from 'antd';

const { TextArea } = Input
var customCascader = [];
var newArr = []
var pid;
var suffixed
function convert(array) {
    var map = {}
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]
        if (!(obj.id in map)) {
            map[obj.id] = obj
            map[obj.id].children = []
        }

        if (typeof map[obj.id].name == 'undefined') {
            map[obj.id].id = obj.id
            map[obj.id].name = obj.name
            map[obj.id].parent = obj.parent
            map[obj.id].value = obj.value
            map[obj.id].label = obj.label
        }

        var parent = obj.parent || '-';
        if (!(parent in map)) {
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.id])
    }
    return map['-']
}




class CreateCustomerGroupForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            customergr: this.props.selectedCusr ? this.props.selectedCusr.Id : '',
            status: false,
            errorFields: [],
            childrenDrawer: false,
        }
    }

    state = {
        errorFields: [],
        loadingButton: false,
        redirect: false
    }

    componentDidMount() {
        customCascader = []
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedCusGr && nextProps.selectedCusGr.Id !== this.state.customergr) {
            this.setState({
                customergr: nextProps.selectedCusGr.Id,
            })


        }
    }


    progress = (fetching, status, mess, from) => {
        console.log(fetching)
        if (fetching) {
            message.loading('Yüklənir...')
        }
        else if (fetching === 'error') {
            console.log('errora girdi')
            message.destroy()
            if (from === 'save') {
                message.error(`Saxlanılmadı.. ${mess}`)
            }

            else if (from === 'del') {
                message.error(`Silinmədi.. ${mess}`)
            }

        }
        else {

            message.destroy()
            if (status === '0') {

                if (from === 'save') {
                    message.success('Saxlanıldı')
                }

                else if (from === 'del') {
                    message.success('Silindi')
                }



                this.setState({
                    editId: mess.responseService,
                    loadingButton: false
                })
            }
            else {
                if (from === 'save') {
                    message.error(`Saxlanılmadı.. ${mess}`)
                }

                else if (from === 'del') {
                    message.error(`Silinmədi.. ${mess}`)
                }



            }
        }
    };

    deleteGroup = (id, e) => {
        e.stopPropagation()
        this.progress(true)
        var grFilter = {}
        grFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.delGroup(id, grFilter).then(res => this.progress(false, res.data.Body.ResponseStatus, res.data.Body, 'del')).then(() => this.setState({ redirect: true }))

    }

    async delGroup(id, object) {

        const res = await axios.post(`${API_BASE}/customergroups/del.php?id=${id}`, object);
        return await res;
    }

    async putGroup(object) {
        const res = await axios.post(`${API_BASE}/customergroups/put.php`, object);
        return await res;
    }
    onFinish = (values) => {
        console.log('Success:', values);
        if (values.parentid === 'Ana Qrup' || values.parentid === '') {
            values.parentid = '00000000-0000-0000-0000-000000000000'
        }
        this.progress(true)
        this.setState({
            loadingButton: true
        })
        var sendObject = {}
        sendObject = values
        sendObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.putGroup(sendObject).then(res => this.progress(false, res.data.Body.ResponseStatus, res.data.Body, 'save'))
    };


    render() {

        if (this.state.redirect == true) {
            return <Redirect push to='/p=customer' />;
        }
        const menu = (
            <Menu>

                <Menu.Item key="0">
                    <Button onClick={(e) => this.deleteGroup(this.props.selectedCusGr ? this.props.selectedCusGr.Id : '', e)} className='flex_directon_col_center'>
                        Müştəri qrupunu sili
                    </Button>
                </Menu.Item>
                <Menu.Divider />

            </Menu>
        );

        const { errorFields } = this.state

        return (
            <div className='table_holder'>
                <Row>

                    <Col xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'><Trans word={'Groups'} /></h2>
                    </Col>
                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>

                        <DocButtons loading={this.state.loadingButton} errorFields={errorFields} from='p=customer' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                        <div className='form_header_right_buttons_wrapper'>
                            <Dropdown disabled={this.props.selectedCusGr ? false : true} overlay={menu} trigger={['click']}>
                                <Button className='form_setting_icon_wrapper flex_directon_col_center' onClick={e => e.preventDefault()}>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                </Button>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col xs={24} md={24} xl={24}>
                        <Form id='myForm' ref={this.formRef}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            name="basic"
                            initialValues={{


                                name: this.props.selectedCusGr ? this.props.selectedCusGr.Name : '',
                                id: this.props.selectedCusGr ? this.props.selectedCusGr.Id : '',
                                description: this.props.selectedCusGr ? this.props.selectedCusGr.Description : '',
                            }}
                            layout="horizontal"
                            onFinish={this.onFinish}

                        >


                            <Form.Item
                                label='id'
                                name='id'
                                hidden={true}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Müştəri qrupu'
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message:  'Zəhmət olmasa, müştərinin qrupunu qeyd edin..',
                                    },
                                ]}
                            >
                                <Input allowClear />
                            </Form.Item>


                            <Form.Item
                                label={<Trans word={'Description'} />}
                                name="description"
                            >
                                <TextArea allowClear />
                            </Form.Item>


                        </Form>
                    </Col>
                </Row>

            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    getCard, putData, updateStatesCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CreateCustomerGroupForm, 'datas'))