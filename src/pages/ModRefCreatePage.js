import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getToken } from '../config/token';
import axios from 'axios';
import { API_BASE } from '../config/env';
import { Modal } from 'antd';
import { Null_Content } from '../config/env';
import BootstrapTable from 'react-bootstrap-table-next';
import { getRefLists, saveRefLists, updateLoading } from '../actions/modifications/mod-actions';
import RefListWrapper from '../components/RefListWrapper';
import Trans from '../usetranslation/Trans';
import {
    Form,
    Input,
    Button,
    Popconfirm,
    TreeSelect,
    Select,
    Switch,
    Col,
    Row
} from 'antd';
import {
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import './ModRefPage.css'
const { Option, OptGroup } = Select;


class ModRefCreatePage extends Component {
    formRef = React.createRef();
    state = {
        linkedRefList: [],
        loading: true,
        visible: false,
    }

    onFinish = (values) => {
        this.props.updateLoading()
        var refFilter = {}
        refFilter = values
        refFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        refFilter.refid = this.props.refId
        var getRefLFilter = {}
        getRefLFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        getRefLFilter.refid = this.props.refId
        this.props.saveRefLists(refFilter, this.props.refId)
        this.formRef.current.setFieldsValue({
            name: ''
        })
    }
    async saveNewRef(object) {
        console.log(object)
        const res = await axios.post(`${API_BASE}/attributes/putrefitem.php`, object);
        return await res;
    }



    render() {

        return (
            <Modal
                visible={this.props.visibleReference}
                title="Title"
                onOk={this.props.handleOkReference}
                afterClose={this.props.afterClose}
                destroyOnClose={true}
                onCancel={this.props.handleCancelReference}
                footer={[
                    <Button key="back" onClick={this.props.handleCancelReference}>
                        Return
                    </Button>,
                    <Button key="submit" htmlType='submit' type="primary" form='refForm' onClick={this.props.handleOkReference}>
                        Submit
                    </Button>,
                ]}

            >




                <Row className='site-drawer-render-in-current-wrapper'>
                    <Col xs={24} md={18} xl={12}>

                        <RefListWrapper refid={this.props.refId} linkedRefList={this.props.linkedRefList} fetching={this.props.fetching} />
                    </Col>
                    <Col xs={24} md={18} xl={12}>

                        <Form
                            ref={this.formRef}
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            onFinish={this.onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Element adı"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Zəhmət olmasa xananı doldurun!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    getRefLists, saveRefLists, updateLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(ModRefCreatePage)
