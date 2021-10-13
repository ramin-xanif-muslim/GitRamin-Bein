import React, { Component } from 'react';
import LoaderHOC from '../components/LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import getCard from '../actions/getCard-action';
import putData from '../actions/putAactions/putData-action';
import { getCustomers } from '../actions/getCustomerGroups-action';
import { getCustomerGroupsFastModal } from '../actions/modalActions/getCustomerGroupsModal-action';
import { fetchData } from '../actions/getData-action';
import { putDataCustomer } from '../actions/modalActions/putModalInputs-action';
import { putLocalStates } from '../actions/modalActions/putModalInputs-action';
import updateChanged from '../actions/updateChanged-action';
import SuccessAlert from '../components/SuccessAlert';
import '../components/ButtonsWrapper.css'
import { Null_Content } from '../config/env';
import Trans from '../usetranslation/Trans';
import { Col, Row, Collapse, message } from 'antd';
import ModalHOC from './ModalrHOC';

import {
    PrinterOutlined,
    UserAddOutlined,
    HomeOutlined,
    PlusOutlined
} from '@ant-design/icons';
import './modal.css'
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
    Spin,
    Switch,
} from 'antd';
const { Option, OptGroup } = Select;
const { TextArea } = Input

var customCascader = [];
var newArr = []
var editProduct;
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




class CreateCustomerForm extends Component {
    formRef = React.createRef();




    constructor(props) {
        super(props)
        this.state = {
            customerGroups: this.props.state.docmodals.customerGroups,
            createdCustomer: [],
            onFinish: false
        }
    }




    componentWillReceiveProps(nextProps) {
        if (this.props.state.barcode.card !== nextProps.state.barcode.card) {
            var newCard = nextProps.state.barcode.card
            this.formRef.current.setFieldsValue({
                card: newCard
            })
        }

    }

    onFinish = (values) => {
        this.props.putDataCustomer(values);
        this.props.putLocalStates(values)
        this.props.updateChanged(false)
        this.setState({
            onFinish: true
        })
    };
    onGetCard = () => {
        this.props.getCard()
    }


    progress = (fetching) => {
        if (fetching) {
            message.loading('Yüklənir...')
        }
        else {
            message.destroy()
            message.success('Saxlanıldı')
            this.setState({
                onFinish: false
            })

        }
    };



    componentDidUpdate(prevProps, prevState) {
        if (this.state.onFinish == true) {
            this.progress(this.props.state.putdatas.fetching)
        }

    }
    render() {

        const customerOptions = Object.values(this.props.state.docmodals.customerGroups).map(customer =>
            <Option key={customer.Id} value={customer.Id}>{customer.Name}</Option>
        )


        return (


            <div className='table_holder'>

                <Row>
                    <Col xs={24} md={24} xl={24}>

                        <Form className='docModal' ref={this.formRef}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            initialValues={
                                {
                                    name: this.props.state.docmodals.localStates ? this.props.state.docmodals.localStates.name : '',
                                    groupid: this.props.state.putdatas.responseId ? this.props.state.putdatas.responseId.ResponseService : '',
                                    card: this.props.state.docmodals.localStates ? this.props.state.docmodals.localStates.card : '',
                                    phone: this.props.state.docmodals.localStates ? this.props.state.docmodals.localStates.phone : '',
                                    email: this.props.state.docmodals.localStates ? this.props.state.docmodals.localStates.email : '',
                                    bonus: this.props.state.docmodals.localStates ? this.props.state.docmodals.localStates.bonus : '',
                                    description: this.props.state.docmodals.localStates ? this.props.state.docmodals.localStates.description : '',
                                }
                            }
                            onValuesChange={this.onValuesChange}
                            name="basic"
                            layout="horizontal"
                            onFinish={this.onFinish}
                        >

                            <Row className='main_form_side'>
                                <Col xs={24} md={9} xl={24} className='left_form_wrapper' >



                                    <Form.Item
                                        label="Müştəri adı"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, müştəri adını qeyd edin..',
                                            },
                                        ]}
                                    >
                                        <Input allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label="Kart"
                                        name="card"
                                    >
                                        <Input suffix={<SyncOutlined className={'suffixed'} onClick={this.onGetCard} />} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Telefon"
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
                                    <div className='form_item_with_icon_modal'>
                                        <Form.Item
                                            label="Qrup"
                                            name='groupid'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Zəhmət olmasa, müştəri qrupunu qeyd edin..',
                                                },
                                            ]}
                                        >

                                            <Select
                                                showSearch
                                                placeholder=""
                                                notFoundContent={<span>{Null_Content}</span>}
                                                loading={this.props.state.groups.fetching ? <Spin size="small" /> : ''}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }

                                            >
                                                {customerOptions}
                                            </Select>

                                        </Form.Item>
                                        <PlusOutlined onClick={this.props.openSecondModal} className='add_elements_modal' />
                                    </div>
                                    <Form.Item label={<Trans word={'Description'} />} name='description'>
                                        <TextArea rows={3} />
                                    </Form.Item>
                                    <Form.Item label="Bonus" name='bonus'>
                                        <InputNumber />
                                    </Form.Item>
                                    <Form.Item label="">
                                        <Button className='customsavebtn' loading={this.state.onFinish} htmlType="submit">Yadda saxla</Button>

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
    state,
})
const mapDispatchToProps = {
    getCard, putData, fetchData, putDataCustomer, updateChanged, getCustomerGroupsFastModal, putLocalStates, getCustomers
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(CreateCustomerForm, 'fetching'))