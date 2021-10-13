import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalHOC from '../modal/ModalrHOC';
import { getToken } from '../config/token';
import axios from 'axios';
import { API_BASE } from '../config/env';
import { Modal } from 'antd';
import { Null_Content } from '../config/env';
import BootstrapTable from 'react-bootstrap-table-next';
import Trans from '../usetranslation/Trans';
import { getRefLists, saveRefTypes } from '../actions/modifications/mod-actions';
import ModRefCreatePage from './ModRefCreatePage';
import cellEditFactory from 'react-bootstrap-table2-editor';
import ModRefPageTable from './ModRefPageTable';

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


class ModRefPage extends Component {
    formRef = React.createRef();

    state = {
        visibleRefCreate: false,
        loading: true,
        refId: ''
    }
    handleLoadingFalse = () => {
        this.setState({ loading: true })
    }

    onReset = () => {
        this.formRef.current.resetFields();
    };

    onFinish = (values) => {
        var typefilter = {}
        typefilter = values
        typefilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.saveRefTypes(typefilter)
        this.onReset()
    }
    openRefCreate = (id) => {
        this.setState({
            visibleRefCreate: true,
            refId: id,
        });
        var getRefLFilter = {}
        getRefLFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        getRefLFilter.refid = id
        this.props.getRefLists(getRefLFilter)

    };

    handleOkRefCreate = () => {
        // this.setState({ visible: false });

    };


    handleCancelRefCreate = () => {
        this.setState({ visibleRefCreate: false });
    };
    render() {

        const columns = [
            {
                dataField: 'Id',
                text: 'id',
                hidden: true,
                editable: false
            },
            {
                dataField: 'Title',
                text: 'Adı',
                hidden: false,
                editable: true

            },
            {
                dataField: 'ValueTypeTranslated',
                text: 'Tipi',
                hidden: false,
                editable: false

            },
            {
                dataField: 'Edit',
                text: 'Bax',
                isDummyField: true,
                editable: false,
                hidden: false,
                classes: (cell, row, rowIndex, colIndex) => {
                    return 'edit_col';
                },
                events: {
                    onClick: (e, column, columnIndex, row, rowIndex) => {
                        this.openRefCreate(row.Id)
                    }
                },
                formatter: (cell, row, rowIndex, extraData) => (
                    <EyeOutlined />
                ),


            },
            {
                dataField: 'Delete',
                text: 'Sil',
                isDummyField: true,
                editable: false,
                hidden: false,
                classes: (cell, row, rowIndex, colIndex) => {
                    return 'del_col';
                },
                formatter: (cell, row, rowIndex, extraData) => (
                    <DeleteOutlined />
                ),

            },
        ]



        this.props.refList.map(c => {
            c.ValueTypeTranslated = <Trans word={c.ValueType} />

        })

        const { visibleRefCreate, loading } = this.state
        return (
            <div>
                <Modal
                    visible={this.props.visibleReference}
                    title="Title"
                    onOk={this.props.handleOkReference}
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
                    <Row>
                        <Col xs={24} md={18} xl={12}>
                            <ModRefPageTable fetching={this.props.fetching} openRefCreate={this.openRefCreate} refList={this.props.refList} />


                        </Col>
                        <Col xs={24} md={18} xl={12}>
                            <Form
                                ref={this.formRef}
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
                                    name="title"
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
                                    label="Tipi"
                                    name="valuetype"

                                >
                                    <Select>
                                        <Option value="string">Mətn</Option>
                                        <Option value="number">Ədəd</Option>
                                    </Select>
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
                    <ModRefCreatePage refId={this.state.refId} linkedRefList={this.props.state.mods.linkedRefList} afterClose={this.handleLoadingFalse} fetching={this.props.state.mods.loading} refList={this.props.refList} visibleReference={visibleRefCreate} handleOkReference={this.handleOkRefCreate} handleCancelReference={this.handleCancelRefCreate} />

                </Modal>

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    getRefLists, saveRefTypes
}

export default connect(mapStateToProps, mapDispatchToProps)(ModRefPage)
