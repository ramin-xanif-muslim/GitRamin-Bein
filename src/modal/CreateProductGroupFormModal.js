import React, { Component } from 'react';
import { connect } from 'react-redux'
import getCard from '../actions/getCard-action'
import putData from '../actions/putAactions/putData-action';
import { updateStatesCreate } from '../actions/updateStates-action';
import '../components/ButtonsWrapper.css'
import Trans from '../usetranslation/Trans';
import { getProductsGroupModal, productModalFilter } from '../actions/modalActions/getCustomerGroupsModal-action';
import { getToken } from '../config/token';
import { newProductGroup } from '../actions/modalActions/putModalInputs-action';
import ModalHOC from './ModalrHOC';
import { API_BASE } from '../config/env';
import axios from 'axios';
import { Col, Row, Collapse, message } from 'antd';
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
    Switch,
} from 'antd';

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


class CreateProductGroupForm extends Component {
    formRef = React.createRef();



    state = {
        newGroup: ''
    }

    onFinish = (values) => {
        if (values.parentid === 'Ana Qrup' || values.parentid === '' || values.parentid == undefined) {
            values.parentid = '00000000-0000-0000-0000-000000000000'
        }
        this.setState({
            newGroup: values.name
        })
        this.progress(true)
        var sendObject = {}
        sendObject = values
        sendObject.token = getToken()
        this.putGroup(sendObject).then(res => this.progress(false, res.data.Body.ResponseStatus, res.data.Body, 'save'))

    };

    async putGroup(object) {
        const res = await axios.post(`${API_BASE}/productfolders/put.php`, object);
        return await res;
    }


    progress = (fetching, status, mess, from) => {
        console.log(fetching)
        if (fetching) {
            message.loading('Yüklənir...')
        }
        else if (fetching === 'error') {
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

                this.props.newProductGroup(this.state.newGroup, mess.ResponseService)

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

    getProGroups = () => {
        newArr = []
        productModalFilter.id = ''
        productModalFilter.gp = ''
        productModalFilter.token = getToken()
        this.props.getProductsGroupModal(productModalFilter)
    }

    render() {
        customCascader = []
        newArr = []
        Object.values(this.props.state.docmodals.productGroups).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })
        newArr = convert(customCascader)

        return (
            <div className='table_holder'>

                <Row>
                    <Col xs={24} md={9} xl={24}>

                        <Form className='docModal' id='docModalGroup' ref={this.formRef}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            name="basic"
                            initialValues={{


                            }}
                            layout="horizontal"
                            onFinish={this.onFinish}

                        >



                            <Row className='main_form_side'>
                                <Col xs={24} md={9} xl={24} className='left_form_wrapper' >


                                    <Form.Item
                                        label={<Trans word={'Group Name'} />}
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
                                        label={<Trans word={'Product GroupName'} />}
                                        name='parentid'
                                    >
                                        <TreeSelect
                                            allowClear
                                            onFocus={this.getProGroups}
                                            treeData={newArr.children}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Trans word={'Description'} />}
                                        name="description"
                                    >
                                        <TextArea rows={3} />
                                    </Form.Item>


                                    {/* <Form.Item label="">
                                        <Button className='customsavebtn' htmlType="submit">Yadda saxla</Button>
                                    </Form.Item> */}

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
    getCard, putData, updateStatesCreate, getProductsGroupModal, newProductGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductGroupForm)