import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { getBarcode } from '../actions/getBarcode-action'
import putData from '../actions/putAactions/putData-action';
import { Col, Row, Collapse } from 'antd';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/buttonsNames'
import Trans from '../usetranslation/Trans';
import DocButtons from '../components/DocButtons';
import { Redirect } from 'react-router';
import './Form.css'
import axios from 'axios';
import { API_BASE } from '../config/env';
import './Colors.css'
import { getToken } from '../config/token';
import './ButtonsWrapper.css'
import {
    Form,
    Input,
    Button,
    TreeSelect,
    Menu,
    message,
    Dropdown
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




class CreateSalePointForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            progr: this.props.selectedProGr ? this.props.selectedProGr.Id : '',
            status: false,
            errorFields: [],
            childrenDrawer: false,
        }
    }

    componentDidMount() {
        customCascader = []
    }

    state = {
        weight: false,
        archieve: false,
        barcodeClicked: false,
        errorFields: [],
        loadingButton: false,
        redirect: false
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.state.barcode !== nextProps.state.barcode.barcode) {
            if (!this.props.selectedProduct) {
                var newBarcode = nextProps.state.barcode.barcode
                this.formRef.current.setFieldsValue({
                    barcode: newBarcode
                })
            }
        }
        if (nextProps.selectedProGr && nextProps.selectedProGr.Id !== this.state.progr) {
            this.setState({
                progr: nextProps.selectedProGr.Id,
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

        const res = await axios.post(`${API_BASE}/productfolders/del.php?id=${id}`, object);
        return await res;
    }

    async putGroup(object) {
        const res = await axios.post(`${API_BASE}/productfolders/put.php`, object);
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


    onFinishFailed = (values) => {
        this.setState({
            errorFields: values.errorFields
        })


    }

    render() {

        if (this.state.redirect == true) {
            return <Redirect push to='/p=product' />;
        }

        newArr = []
        Object.values(this.props.datas).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })

        newArr = convert(customCascader)

        const menu = (
            <Menu>

                <Menu.Item key="0">
                    <Button onClick={(e) => this.deleteGroup(this.props.selectedProGr ? this.props.selectedProGr.Id : '', e)} className='flex_directon_col_center'>
                        Məhsul qrupunu sil
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

                        <DocButtons loading={this.state.loadingButton} errorFields={errorFields} from='p=product' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                        <div className='form_header_right_buttons_wrapper'>
                            <Dropdown disabled={this.props.selectedProGr ? false : true} overlay={menu} trigger={['click']}>
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

                                name: this.props.selectedProGr ? this.props.selectedProGr.Name : '',
                                id: this.props.selectedProGr ? this.props.selectedProGr.Id : '',
                                description: this.props.selectedProGr ? this.props.selectedProGr.Description : '',
                                parentid: this.props.selectedProGr ? this.props.selectedProGr.ParentId === '00000000-0000-0000-0000-000000000000' ? 'Ana Qrup' : this.props.selectedProGr.ParentId : '',
                            }}
                            layout="horizontal"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}

                        >

                            <Row className='main_form_side'>
                                <Col xs={24} md={20} xl={8} className='left_form_wrapper'>
                                    <Form.Item
                                        label={<Trans word={'Name'} />}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, məhsulun qrupunu qeyd edin..',
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


                                    <Form.Item
                                        label={<Trans word={'Warehouses'} />}
                                        name='parentid'
                                    >
                                        <TreeSelect
                                            allowClear
                                            treeData={newArr.children}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='id'
                                        name='id'
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>
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
    state
})
const mapDispatchToProps = {
    getBarcode, putData
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(CreateSalePointForm, 'datas'))