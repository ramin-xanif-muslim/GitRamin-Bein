import React, { Component } from 'react';
import LoaderHOC from '../components/LoaderHOC';
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import getCard from '../actions/getCard-action';
import putData from '../actions/putAactions/putData-action';
import { getCustomers } from '../actions/getCustomerGroups-action';
import { getCustomerGroupsFastModal } from '../actions/modalActions/getCustomerGroupsModal-action';
import { fetchData } from '../actions/getData-action';
import { putDataStock, putDataFromStock } from '../actions/modalActions/putModalInputs-action';
import { putLocalStates } from '../actions/modalActions/putModalInputs-action';
import '../components/ButtonsWrapper.css'
import { Null_Content } from '../config/env';
import Trans from '../usetranslation/Trans';
import { Col, Row, Collapse, message } from 'antd';
import ModalHOC from './ModalrHOC';

import {
    PrinterOutlined,
    UserAddOutlined,
    HomeOutlined
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
var pid;
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

class CreateStockForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            stockGroups: this.props.state.docmodals.stockGroups,
            createdStock: [],
            stockList: []

        }
    }


    state = {
        onFinish: false,
    }

    onFinish = (values) => {
        console.log(values)
        if (!values.parentid) {
            values.parentid = '00000000-0000-0000-0000-000000000000'
        }
        if (this.props.moveFrom) {
            this.props.putDataFromStock(values);

        }
        else {
            this.props.putDataStock(values);

        }
        this.props.putLocalStates(values)
        this.setState({
            onFinish: true
        })
    };


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
            this.props.onClose()

        }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.onFinish == true) {
            this.progress(this.props.state.putdatas.fetching)
        }

    }



    render() {

        newArr = []
        customCascader = []

        Object.values(this.props.state.docmodals.stockGroups).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })
        newArr = convert(customCascader)

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

                            onValuesChange={this.onValuesChange}
                            name="basic"
                            layout="horizontal"
                            onFinish={this.onFinish}
                        >

                            <Row className='main_form_side'>
                                <Col xs={24} md={9} xl={24} className='left_form_wrapper' >



                                    <Form.Item
                                        label={'Anbar qrupu'}
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Zəhmət olmasa, anbar adını qeyd edin..',
                                            },
                                        ]}
                                    >
                                        <Input allowClear />
                                    </Form.Item>

                                    <Form.Item hidden={true}
                                        label="id"
                                        name="id"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Yerləşdiyi anbar"
                                        name='parentid'

                                    >

                                        <TreeSelect
                                            allowClear
                                            treeData={newArr.children}
                                        />

                                    </Form.Item>
                                    <Form.Item label={<Trans word={'Description'} />} name='description'>
                                        <TextArea rows={3} />
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
    getCard, putData, fetchData, putDataStock, getCustomerGroupsFastModal, putLocalStates, getCustomers, putDataFromStock
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(CreateStockForm, 'fetching'))