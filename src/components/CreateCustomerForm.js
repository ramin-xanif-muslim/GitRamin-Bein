import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import getCard from '../actions/getCard-action'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import { Tab } from 'semantic-ui-react'
import { Col, Row, Collapse } from 'antd';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { API_BASE } from '../config/env';
import DocButtons from '../components/DocButtons';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/buttonsNames'
import Sound from 'react-sound';
import ok from '../audio/ok.mp3'
import Trans from '../usetranslation/Trans';
import BootstrapTable from 'react-bootstrap-table-next';
import './Form.css'
import './Colors.css'
import './ButtonsWrapper.css'

import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    Dropdown,
    message,
    Menu,
    InputNumber,
    TreeSelect,
    Spin,
    Switch,
} from 'antd';
import {
    PrinterOutlined,
    PlusOutlined,
    DeleteOutlined,
    StopOutlined,
    DownSquareOutlined
} from '@ant-design/icons';
import { getToken } from '../config/token';

const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
var customCascader = [];
var newArr = []
var depOptions = []
var ownersOptions = []
var editProduct;
var pid;
var suffixed
var panes;

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




class CreateCustomerForm extends Component {
    formRef = React.createRef();




    constructor(props) {
        super(props)
        this.state = {
            customerid: this.props.selectedCustomer ? this.props.selectedCustomer.Id : '',
            errorFields: [],
            redirect: false,
            status: false,
            loadingButton: false,
            newCustomerId: '',
            card: '',
            loadingTab: true,



        }
    }


    componentDidMount() {
        if (!this.props.selectedCustomer) {
            this.onGetCard()
        }

    }
    deleteCustomer = (id, e) => {
        e.stopPropagation()
        this.progress(true)
        var grFilter = {}
        grFilter.token =JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.delCustomer(id, grFilter).then(res => this.progress(false, res.data.Body.ResponseStatus, res.data.Body, 'del')).then(() => this.setState({ redirect: true }))

    }



    progress = (fetching, status, mess, from) => {
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

                this.setState({
                    newCustomerId: mess.ResponseService
                })



                if (from === 'save') {
                    message.success('Saxlanıldı')
                    this.setState({
                        status: true
                    })
                }

                else if (from === 'del') {
                    message.success('Silindi')
                    this.setState({
                        status: true
                    })
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
    async putCustomer(object) {
        const res = await axios.post(`${API_BASE}/customers/put.php`, object);
        return await res;
    }

    async delCustomer(id, object) {

        const res = await axios.post(`${API_BASE}/customers/del.php?id=${id}`, object);
        return await res;
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedCustomer && nextProps.selectedCustomer.Id !== this.state.customerid) {
            this.setState({
                customerid: nextProps.selectedCustomer.Id
            })
        }


        if (nextProps.state.barcode.card) {
            if (this.state.card !== nextProps.state.barcode.card) {
                var newCard = nextProps.state.barcode.card
                this.setState({
                    card: newCard
                })
                this.formRef.current.setFieldsValue({
                    card: newCard
                })
            }
        }

    }
    handleTabChange = (event, data) => {
        if (data.activeIndex === 1) {
            setTimeout(() => {
                this.setState({
                    loadingTab: false
                })
            }, 1000);
        }
        else {
            this.setState({
                loadingTab: true
            })
        }
    }
    onFinish = (values) => {
        var sendCustomer = {}
        sendCustomer = values
        sendCustomer.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.progress(true)
        this.setState({
            loadingButton: true
        })
        this.state.newCustomerId != '' ? sendCustomer.id = this.state.newCustomerId : sendCustomer.id = values.id
        this.putCustomer(sendCustomer).then(res => this.progress(false, res.data.Body.ResponseStatus, res.data.Body, 'save'))
    };
    onGetCard = () => {
        this.props.getCard()
    }

    handleFocus = (event) => event.target.select();

    render() {

        if (this.state.redirect == true) {
            return <Redirect push to='/p=customer' />;
        }
        depOptions = []
        ownersOptions = []
        newArr = []
        customCascader = []

        Object.values(this.props.datas).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })
        newArr = convert(customCascader)

        Object.values(this.props.owners).map(r => {
            ownersOptions.push({
                label: r.Name,
                value: r.Id,
            })
        })
        Object.values(this.props.departments).map(r => {
            depOptions.push({
                label: r.Name,
                value: r.Id,
            })
        })

        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Button icon={<DeleteOutlined />} onClick={(e) => this.deleteCustomer(this.state.customerid != '' ? this.state.customerid : this.state.newCustomerId === '' ? '' : this.state.newCustomerId, e)} className='align_center del' disabled={this.state.customerid === '' ? this.state.newCustomerId === '' ? true : false : false}>
                        Müştərini sili
                    </Button>
                </Menu.Item>
                <Menu.Divider />
            </Menu>
        );

        panes = [
            {
                menuItem: 'Endirim',
                render: () => <Tab.Pane attached={false}>

                    <Form.Item label={<Trans word={'Discount'} />} name='discount'>
                        <InputNumber  onFocus={this.handleFocus} />
                    </Form.Item>
                    <Form.Item label={<Trans word={'Bonus'} />} name='bonus'>
                        <InputNumber  onFocus={this.handleFocus} />
                    </Form.Item>

                </Tab.Pane>,
            },
            {
                menuItem: 'Parametrlər',
                render: () =>
                    <Tab.Pane loading={this.state.loadingTab} attached={false}>


                    </Tab.Pane>,
            },
            {
                menuItem: 'Bağlı sənədlər',
                render: () => <Tab.Pane attached={false}>

                </Tab.Pane>,
            },
            {
                menuItem: 'Göstəricilər',
                render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>,
            },

        ]
        const { errorFields } = this.state

        return (
            <div className='table_holder'>
                < Sound
                    url={ok}
                    playStatus={this.state.status ? Sound.status.PLAYING : Sound.status.Stopped}
                />
                <Row>
                    <Col xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'><Trans word={'New Customer'} /></h2>
                    </Col>
                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>
                        <DocButtons loading={this.state.loading} errorFields={errorFields} from='p=customer' fromDoc='createCustomer' toDoc='createPaymentOut' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />

                        <div className='form_header_right_buttons_wrapper'>


                            <Dropdown overlay={menu} trigger={['click']}>

                                <Button className={this.props.state.stateChanges.openCreateModal ? 'd-none' : 'form_setting_icon_wrapper flex_directon_col_center'} onClick={e => e.preventDefault()}>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                    <span className='dots'></span>
                                </Button>
                            </Dropdown>
                        </div>
                    </Col>
                    <Col xs={24} md={24} xl={24}>
                        <Form ref={this.formRef}
                            id='myForm'
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 15,
                            }}
                            name="basic"
                            initialValues={

                                {
                                    name: this.props.selectedCustomer ? this.props.selectedCustomer.Name : '',
                                    card: this.props.selectedCustomer ? this.props.selectedCustomer.Card : '',
                                    id: this.props.selectedCustomer ? this.props.selectedCustomer.Id : '',
                                    bonus: this.props.selectedCustomer ? this.props.selectedCustomer.Bonus : '',
                                    discount: this.props.selectedCustomer ? this.props.selectedCustomer.Discount : '',
                                    phone: this.props.selectedCustomer ? this.props.selectedCustomer.Phone : '',
                                    email: this.props.selectedCustomer ? this.props.selectedCustomer.Email : '',
                                    description: this.props.selectedCustomer ? this.props.selectedCustomer.Description : '',
                                    groupid: this.props.selectedCustomer ? this.props.selectedCustomer.GroupId : '',
                                    ownerid: this.props.selectedCustomer ? this.props.selectedCustomer.OwnerId : '',
                                    departmentid: this.props.selectedCustomer ? this.props.selectedCustomer.DepartmentId : '',
                                }
                            }
                            layout="horizontal"
                            onFinish={this.onFinish}
                            onValuesChange={this.onValuesChange}
                            onFinishFailed={this.onFinishFailed}
                        >

                            <Row className='main_form_side'>
                                <Col xs={24} md={9} xl={8} className='left_form_wrapper'>
                                    <div className='ant-row ant-form-item' style={{ marginBottom: '2.5rem' }}>
                                        <div class="ant-col ant-col-7 ant-form-item-label"><h2>Ümumi məlumatlar</h2></div>
                                        <div class="ant-col ant-col-12 ant-form-item-label"><h2></h2></div>
                                    </div>
                                    <Form.Item
                                        label={<Trans word={'Customer Name'} />}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, müştərinin adını qeyd edin..',
                                            },
                                        ]}
                                    >
                                        <Input allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label={<Trans word={'Card'} />}
                                        name="card"
                                    >
                                        <Input suffix={<SyncOutlined className={'suffixed'} onClick={this.onGetCard} />} />
                                    </Form.Item>

                                    <Form.Item
                                        label={<Trans word={'Phone'} />}
                                        name="phone"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Email"
                                        name="email"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item hidden={true}
                                        label="id"
                                        name="id"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label={<Trans word={'Customer Groups'} />}
                                        name='groupid'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, müştərinin qrupunu qeyd edin..',
                                            },
                                        ]}
                                    >
                                        <TreeSelect
                                            allowClear
                                            treeData={newArr.children}
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        hidden={true}
                                        label="id"
                                        name="id"
                                    >
                                        <Input />
                                    </Form.Item>

                                </Col>
                                <Col xs={24} md={12} xl={8}>
                                    <div className="tab_wrapper">
                                        <Tab menu={{ attached: false }} onTabChange={this.handleTabChange} panes={panes} />
                                    </div>

                                </Col>
                                <Col xs={24} md={24} xl={8}>
                                    <Collapse ghost>
                                        <Panel header="Təyinat" key="1">
                                            <Form.Item
                                                label={'Cavabdeh'}
                                                name="ownerid"
                                                style={{ margin: '0' }}
                                            >

                                                <Select
                                                    showSearch
                                                    placeholder=""
                                                    filterOption={false}
                                                    notFoundContent={<Spin size="small" />}
                                                    filterOption={(input, option) =>
                                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    loading={this.props.state.groups.loading ? <Spin size="small" /> : ''}
                                                    options={ownersOptions}
                                                />

                                            </Form.Item>
                                            <Form.Item
                                                label={'Şöbə'}
                                                name="departmentid"
                                                style={{ margin: '0' }}
                                            >

                                                <Select
                                                    showSearch
                                                    placeholder=""
                                                    notFoundContent={<Spin size="small" />}
                                                    filterOption={(input, option) =>
                                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                    loading={this.props.state.groups.loading ? <Spin size="small" /> : ''}
                                                    options={depOptions}
                                                />
                                            </Form.Item>
                                        </Panel>
                                    </Collapse>
                                </Col>
                            </Row>
                        </Form>

                    </Col>

                </Row>

            </div>
        );
    }
}



const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    getCard, putData, fetchData
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CreateCustomerForm, 'datas'))