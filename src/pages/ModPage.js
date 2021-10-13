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
import StockPageFormSetting from './StockPageFormSetting'
import FolderTree, { testData } from 'react-folder-tree';
import ModRefPage from './ModRefPage';
import { getRefLists, getRefTypes, saveAttributes, deleteAttributes } from '../actions/modifications/mod-actions';

import BootstrapTable from 'react-bootstrap-table-next';
import { useTranslation } from "react-i18next";
import { Modal } from 'antd';
import { Null_Content } from '../config/env';
import { Checkbox } from 'antd';
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

class ModPage extends Component {

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
    onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
        console.log(info.node)
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    openReference = () => {
        this.setState({
            visibleReference: true,
        });

        var filter = {}
        filter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.getRefTypes(filter)

    };
    handleOk = () => {
        // this.setState({ visible: false });

    };
    handleOkReference = () => {
        // this.setState({ visible: false });

    };
    onFinish = (values) => {
        console.log(values)
        var saveattrfilter = {}
        var pagefilter = {}
        pagefilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        saveattrfilter = values
        saveattrfilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        values.isrequired == false ? values.isrequired = '0' : values.isrequired = '1'
        values.isfilter == false ? values.isfilter = '0' : values.isfilter = '1'
        this.props.saveAttributes(saveattrfilter, pagefilter, 'attributes')
        this.setState({
            visible: false,
        });
    }


    delAttributes = (id, e) => {
        e.preventDefault()
        e.stopPropagation()
        var delAttr = {}
        delAttr.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.deleteAttributes(delAttr, id)
    }


    handleClearEdit = () => {
        this.setState({ editedAttributes: undefined })
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCancelReference = () => {
        this.setState({ visibleReference: false });
    };

    editGroup = (id, e) => {
        e.stopPropagation()
        this.setState({
            redirect: true,
            id: id
        })
    }
    deleteGroup = (id, e) => {
        e.stopPropagation()
        this.setState({
            loading: true
        })
        var grFilter = {}
        grFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.delGroup(id, grFilter).then(data => this.props.fetchData('attributes', grFilter), this.setState({ loading: false }))

    }


    onSelect = () => {
        this.setState({
            hideValueType: true
        })
    }
    

    onClear = () => {
        this.setState({
            hideValueType: false
        })
    }



    render() {
        const columns = [
            {
                dataField: 'Id',
                text: 'id',
                hidden: true
            },
            {
                dataField: 'Title',
                text: 'Adı',
                hidden: false

            },
            {
                dataField: 'Name',
                text: 'name',
                hidden: true

            },
            {
                dataField: 'ValueTypeTranslated',
                text: 'Tipi',
                hidden: false

            },
            {
                dataField: 'ReferenceType',
                text: 'Bağlılıq',
                hidden: false

            },

            {
                dataField: 'IsFilter',
                text: 'Filter',
                hidden: false,
            },

            {
                dataField: 'IsRequired',
                text: 'Vaciblik',
                hidden: false,
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
                    <Popconfirm onConfirm={(e) => this.delAttributes(row.Id, e)} title="Əminsiniz？" okText="Bəli" cancelText="Xeyr">
                        <DeleteOutlined />
                    </Popconfirm>
                ),
            },
        ]


        this.props.datas.map(c => {
            c.ValueTypeTranslated = <Trans word={c.ValueType} />

        })
        this.props.datas.map(c => {
            c.ReferenceType = this.state.refList.find(r => r.Id === c.ReferenceTypeId) ? this.props.refList.find(r => r.Id === c.ReferenceTypeId).Title : ''
        })

        this.props.datas.map(c => {
            c.IsFilter = c.IsFilter === 1 ? <Checkbox disabled={true} checked={true} /> : <Checkbox disabled={true} checked={false} />
        })

        this.props.datas.map(c => {
            c.IsRequired = c.IsRequired === 1 ? <Checkbox disabled={true} checked={true} /> : <Checkbox disabled={true} checked={false} />
        })

        const { visible, visibleReference } = this.state;



        const refOptions =
            this.props.state.mods.refTypes.map(item =>
                <Option key={item.Id} value={item.Id}>
                    {item.Title}
                </Option>
            )
        return (
            <Row>
                <Col xs={24} md={24} xl={12}>
                    <Button type="primary" onClick={this.showModal}>
                        Modifikasiya yarat
                    </Button>
                    <Button type="primary" onClick={this.openReference}>
                        Bagliliq
                    </Button>
                    <BootstrapTable
                        classes='settingTable'
                        keyField="Id"
                        data={this.props.datas}
                        columns={columns.filter(c => c.hidden == false)}
                        striped
                        hover
                        condensed
                    />
                </Col>

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
                        <Button key="submit" htmlType='submit' type="primary" form='modForm' onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >




                    <Form
                        id='modForm'
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        layout="horizontal"
                        initialValues={{
                            title: this.state.editedAttributes ? this.state.editedAttributes.Title : '',
                            name: this.state.editedAttributes ? this.state.editedAttributes.Name : '',
                            id: this.state.editedAttributes ? this.state.editedAttributes.Id : '',
                            entitytype: this.state.editedAttributes ? this.state.editedAttributes.EntityType : 'product',
                            referencetypeid: this.state.editedAttributes ? this.state.editedAttributes.ReferenceTypeId : '',
                            isrequired: this.state.editedAttributes ? this.state.editedAttributes.IsRequired : false,
                            isfilter: this.state.editedAttributes ? this.state.editedAttributes.IsFilter : false,

                        }}
                        onFinish={this.onFinish}

                    >
                        <Form.Item name='name' tooltip="Sistem üçün təyin olunan ad..." label="Texniki ad" rules={[
                            {
                                required: true,
                                message: 'Texniki adı doldurun',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || pat.test(value)) {
                                        if (value.length >= 5 && value.length <= 15) {
                                            return Promise.resolve();
                                        }
                                    }

                                    return Promise.reject(new Error('Ad yalnız kiçik ingilis hərflərindən ibarət olmalıdır və uzunluğu 5-15 arasında dəyişməlidir'));
                                },
                            }),
                        ]}>
                            <Input disabled={this.state.editedAttributes ? true : false} />
                        </Form.Item>
                        <Form.Item name='title' label="Adı">
                            <Input />
                        </Form.Item>
                        <Form.Item hidden={true} name='entitytype' label="Obyekt növü">
                            <Input />
                        </Form.Item>
                        <Form.Item name='valuetype' label="Tipi">
                            <Select
                                showSearch
                                disabled={this.state.editedAttributes ? true : this.state.hideValueType}
                                showArrow={false}
                                notFoundContent={<span>{Null_Content}</span>}
                                filterOption={(input, option) =>
                                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option key='string'>Mətn</Option>
                                <Option key='number'>Ədəd</Option>
                                <Option key='date'>Tarix</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item hidden={true} name='id' label="Obyekt növü">
                            <Input />
                        </Form.Item>
                        <Form.Item name='referencetypeid' className='modpage' label="Bağlılıq">
                            <Select
                                showSearch
                                allowClear
                                onSelect={this.onSelect}
                                onClear={this.onClear}
                                disabled={this.state.editedAttributes ? true : false}
                                showArrow={false}
                                notFoundContent={<span>{Null_Content}</span>}
                                filterOption={(input, option) =>
                                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {refOptions}
                            </Select>


                        </Form.Item>
                        <Form.Item name='isrequired' label="Vaciblik" valuePropName="checked">
                            <Switch />
                        </Form.Item>

                        <Form.Item name='isfilter' label="Filter" valuePropName="checked">
                            <Switch />
                        </Form.Item>

                    </Form>

                    <p style={{ display: this.state.editedAttributes ? 'block' : 'none' }}>Dəyər tipi :  {this.state.editedAttributes ? <Trans word={this.state.editedAttributes.ValueType} /> : ''}</p>
                </Modal>
                <ModRefPage refList={this.props.state.mods.refTypes} fetching={this.props.state.mods.loadingTypes} visibleReference={visibleReference} handleOkReference={this.handleOkReference} handleCancelReference={this.handleCancelReference} />
            </Row >

        )
    }
}

const mapStateToProps = (state) => ({

    state
})

const mapDispatchToProps = {
    fetchData, getRefTypes, saveAttributes, deleteAttributes
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(ModPage, 'fetching'))
