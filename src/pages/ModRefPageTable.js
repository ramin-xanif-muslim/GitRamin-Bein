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
import { getRefLists, saveRefTypes, deleteRefTypes,updateTypeLoading} from '../actions/modifications/mod-actions';
import ModRefCreatePage from './ModRefCreatePage';

import cellEditFactory from 'react-bootstrap-table2-editor';

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


class ModRefPageTable extends Component {



    deleteRefType = (id, e) => {
        e.stopPropagation()
        this.props.updateTypeLoading()
        var delRefTypes = {}
        delRefTypes.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.deleteRefTypes(delRefTypes, id)
    }


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
                        this.props.openRefCreate(row.Id)
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
                    <Popconfirm onConfirm={(e) => this.deleteRefType(row.Id, e)} title="Əminsiniz？" okText="Bəli" cancelText="Xeyr">
                        <DeleteOutlined />
                    </Popconfirm>
                ),

            },
        ]



        this.props.refList.map(c => {
            c.ValueTypeTranslated = <Trans word={c.ValueType} />

        })

        return (
            <div>
                {
                    console.log(this.props.refList)
                }
                <BootstrapTable
                    classes='settingTable'
                    keyField="Id"
                    data={this.props.refList.filter(r=>r.Name == 'custom')}
                    columns={columns.filter(c => c.hidden == false)}
                    cellEdit={cellEditFactory(
                        {
                            mode: 'dbclick',
                            afterSaveCell: (oldValue, newValue, row, column) => {
                                var typefilter = {}
                                typefilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
                                typefilter.id = row.Id
                                typefilter.title = row.Title
                                typefilter.valuetype = row.ValueType

                                this.props.saveRefTypes(typefilter)

                            }
                        })}
                    striped
                    hover
                    condensed
                />

            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    getRefLists, saveRefTypes, deleteRefTypes,updateTypeLoading
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(ModRefPageTable, 'fetching'))
