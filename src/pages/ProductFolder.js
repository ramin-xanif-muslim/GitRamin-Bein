import React, { Component } from 'react'
import Demo from './Demo'
import { connect } from 'react-redux'
import { fetchData, updateSearchInput } from '../actions/getData-action'
import { getGroups } from '../actions/getGroups-action'
import filterObject from '../config/filterObject'
import { Tree } from 'antd';
import { Redirect, Link } from 'react-router-dom';
import TableLoader from '../components/TableLoader'
import LoaderHOC from '../components/LoaderHOC'

import { Skeleton } from 'antd';
import { Button, Tooltip } from 'antd';
import Trans from '../usetranslation/Trans'
import { API_BASE } from '../config/env'
import { getToken } from '../config/token'
import putData from '../actions/putAactions/putData-action'
import axios from 'axios';
import {
    PrinterOutlined,
    EditOutlined,
    PlusOutlined,
    LoadingOutlined,
    HomeOutlined
} from '@ant-design/icons';



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




class ProductFolder extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        redirect: false,
        id: ''
    }
    onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
        filterObject.gp = keys[0]
        filterObject.pg = 0
        filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.props.updateSearchInput('')
        this.props.fetchData(this.props.from, filterObject)
    };



    async putGroup(object) {
        const res = await axios.post(`${API_BASE}/productfolders/put.php`, object);
        return await res;
    }

    onRightClick = (e, n) => {
        console.log(e, n)

    }

    editGroup = (id, e) => {
        e.stopPropagation()
        this.setState({
            redirect: true,
            id: id
        })
    }


    onDrop = (info) => {
        console.log(info)
        var grFilter = {}
        grFilter.name = info.dragNode.name
        grFilter.id = info.dragNode.id
        grFilter.parentid = info.node.key
        grFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.putGroup(grFilter).then(data => this.props.getGroups('productfolders'))
    }
    onExpand = () => {
        console.log('Trigger Expand');
    };


    render() {
        datas = []
        convertedData = []
        Object.values(this.props.groups).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            datas.push({
                "id": d.Id, "name": d.Name, "parent": pid, "title": d.Name, "key": d.Id, "icon": <EditOutlined onClick={(e) => this.editGroup(d.Id, e)} className='editGr' />

            })
        })



        if (datas.length > 0) {
            convertedData = convert(datas)
        }

        this.props.from === 'products' ? convertedData.unshift({ "id": '', "name": <Trans word={'all_products'} />, "parent": '', "title": <Trans word={'all_products'} />, "key": '' }) :
            convertedData.unshift({ "id": '', "name": <Trans word={'all_customers'} />, "parent": '', "title": <Trans word={'all_customers'} />, "key": '' })
        if (this.state.redirect && this.props.from === 'products') {
            return <Redirect push to={`/editGroup/${this.state.id}`} />;
        }
        else if (this.state.redirect && this.props.from === 'customers') {
            return <Redirect push to={`/editCustomerGroup/${this.state.id}`} />;
        }

        return (

            <div className='table_wrapper group_col_wrapper_side'>

                {
                    this.props.state.groups.fetching ? <TableLoader className='custom_table_loader show' /> : <TableLoader className='custom_table_loader hidden' />
                }
                <DirectoryTree
                    multiple
                    draggable
                    showIcon={true}
                    icon
                    onDrop={this.onDrop}
                    defaultSelectedKeys={['']}
                    onSelect={this.onSelect}
                    onExpand={this.onExpand}
                    onRightClick={this.onRightClick}
                    treeData={convertedData}
                />

            </div>

        )
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData, getGroups, putData, updateSearchInput
}
export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(ProductFolder, 'groups'))




