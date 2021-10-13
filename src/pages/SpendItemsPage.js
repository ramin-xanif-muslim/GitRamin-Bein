import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalHOC from '../modal/ModalrHOC';
import LoaderHOC from '../components/LoaderHOC';
import { Tree } from 'antd';
import { getToken } from '../config/token';
import axios from 'axios';
import { API_BASE } from '../config/env';
import { Redirect, Link } from 'react-router-dom';
import Trans from '../usetranslation/Trans';
import Translate from '../usetranslation/Translate'
import { fetchData } from '../actions/getData-action';
import BootstrapTable from 'react-bootstrap-table-next';
import { Modal } from 'antd';
import { saveSpendItems, deleteSpendItems } from '../actions/spenditemsactions/spendItem-actions';
import 'react-folder-tree/dist/style.css';
import {
    DeleteOutlined,
    EyeOutlined,
    PlusOutlined
} from '@ant-design/icons';

import {
    Col,
    Row,
    Form,
    Input,
    Button,
    Popconfirm,
    TreeSelect,
    Select,
    Switch
} from 'antd';

const { Option, OptGroup } = Select;

const { DirectoryTree } = Tree;
var translatedArray = []
var pat = /^[a-z]+$/;

class SpendItemsPage extends Component {


    state = {
        selectedDoc: {},
        loading: false,
        redirect: false,
        visible: false,
        visibleReference: false,
        editedAttributes: undefined,
        refList: this.props.refList,
        hideValueType: false,
        id: ''
    }
    handleClearEdit = () => {
        this.setState({ editedAttributes: undefined })
    }
    handleOk = () => {
        // this.setState({ visible: false });

    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    delSpendItem = (id, e) => {
        e.preventDefault()
        e.stopPropagation()
        var delAttr = {}
        delAttr.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.deleteSpendItems(delAttr, id)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    onFinish = (values) => {
        var savespendfilter = {}
        var pagefilter = {}
        pagefilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        savespendfilter = values
        savespendfilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.saveSpendItems(savespendfilter, pagefilter, 'spenditems')
        this.setState({
            visible: false,
        });
    }



    render() {
        const columns = [
            {
                dataField: 'Id',
                text: 'id',
                hidden: true
            },
            {
                dataField: 'Name',
                text: 'Xərc maddəsi',
                hidden: false

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
                        this.showModal()
                        this.setState({
                            editedAttributes: row
                        })
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
                    <Popconfirm onConfirm={(e) => this.delSpendItem(row.Id, e)} title="Əminsiniz？" okText="Bəli" cancelText="Xeyr">
                        <DeleteOutlined />
                    </Popconfirm>
                ),
            },
        ]

        const { visible } = this.state

        return (
            <Row>
                <Col xs={24} md={24} xl={12}>

                    <BootstrapTable
                        classes='settingTable'
                        keyField="Id"
                        data={this.props.datas}
                        columns={columns.filter(c => c.hidden == false)}
                        striped
                        hover
                        condensed
                    />
                    <Modal
                        visible={visible}
                        title="Title"
                        afterClose={this.handleClearEdit}
                        onOk={this.handleOk}
                        destroyOnClose={true}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>
                                Return
                            </Button>,
                            <Button key="submit" htmlType='submit' type="primary" form='spendItemForm' onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >




                        <Form
                            id='spendItemForm'
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                            initialValues={{
                                name: this.state.editedAttributes ? this.state.editedAttributes.Name : '',
                                id: this.state.editedAttributes ? this.state.editedAttributes.Id : '',
                            }}
                            onFinish={this.onFinish}

                        >

                            <Form.Item name='name' label="Xərc maddəsi">
                                <Input />
                            </Form.Item>
                            <Form.Item hidden={true} name='id' label="id">
                                <Input />
                            </Form.Item>


                        </Form>
                    </Modal>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => ({

    state
})

const mapDispatchToProps = {
    fetchData, saveSpendItems, deleteSpendItems
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(SpendItemsPage, 'fetching'))
