import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalHOC from '../modal/ModalrHOC';
import LoaderHOC from '../components/LoaderHOC';
import { Tree } from 'antd';
import { getToken } from '../config/token';
import axios from 'axios';
import { API_BASE } from '../config/env';
import { Redirect, Link } from 'react-router-dom';
import { fetchData } from '../actions/getData-action';
import StockPageFormSetting from './StockPageFormSetting'
import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';
import {
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';

import {
    Col,
    Row,
    Form,
    Input,
    Button,
    Popconfirm,
    TreeSelect
} from 'antd';

const { DirectoryTree } = Tree;



var datas = []
var convertedData = []
function convert(array) {
    var map = [{}]
    for (var i = 0; i < array.length; i++) {
        var obj = array[i]
        if (!(obj.id in map)) {
            map[obj.id] = obj
            map[obj.id].children = []
        }

        if (typeof map[obj.id].name == 'undefined') {
            map[obj.id].title = obj.title
            map[obj.id].key = obj.key
            map[obj.id].description = obj.description
            map[obj.id].icon = obj.icon
        }

        var parent = obj.parent || '-';
        if (!(parent in map)) {
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.id])
    }
    console.log(map['-'].children)
    return map['-'].children
}
var pid;

const form = () => {

}

class StocksPage extends Component {

    state = {
        selectedDoc: {},
        loading: false,
        redirect: false,
        id: ''
    }
    onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
        console.log(info.node)
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
        this.delGroup(id, grFilter).then(data => this.props.fetchData('stocks', grFilter), this.setState({ loading: false }))

    }


    async putGroup(object) {
        const res = await axios.post(`${API_BASE}/stocks/put.php`, object);
        return await res;
    }

    async delGroup(id, object) {

        const res = await axios.post(`${API_BASE}/stocks/del.php?id=${id}`, object);
        return await res;
    }


    onDrop = (info) => {
        console.log(info)
        var grFilter = {}
        grFilter.name = info.dragNode.name
        grFilter.id = info.dragNode.id
        grFilter.parentid = info.node.key
        grFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.putGroup(grFilter).then(data => this.props.getGroups('stocks'))
    }
    onExpand = () => {
        console.log('Trigger Expand');
    };
    render() {
        datas = []
        convertedData = []
        if (this.props.datas.length > 0) {
            Object.values(this.props.datas).map(d => {
                d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
                datas.push({
                    "id": d.Id, "name": d.Name, "parent": pid, "title": d.Name, "key": d.Id, "description": d.Description, "icon": <span><EditOutlined onClick={(e) => this.editGroup(d.Id, e)} className='editGr' /> <Popconfirm className='editGr deleteGr' onConfirm={(e) => this.deleteGroup(d.Id, e)} okButtonProps={{ loading: this.state.loading }} title="Əminsiniz？" okText="Bəli" cancelText="Xeyr">
                        <DeleteOutlined />
                    </Popconfirm></span>

                })
            })
            convertedData = convert(datas)
        }


        if (this.state.redirect) {
            return <Redirect push to={`/editStock/${this.state.id}`} />;
        }
        return (

            <Row>
                <Col xs={24} md={24} xl={12}>
                    <DirectoryTree
                        multiple
                        draggable
                        icon
                        onDrop={this.onDrop}
                        defaultSelectedKeys={['']}
                        onSelect={this.onSelect}
                        onExpand={this.onExpand}
                        onRightClick={this.onRightClick}
                        treeData={convertedData}
                    />
                </Col>


            </Row>

        )
    }
}

const mapStateToProps = (state) => ({

    state
})

const mapDispatchToProps = {
    fetchData
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(StocksPage, 'fetching'))
