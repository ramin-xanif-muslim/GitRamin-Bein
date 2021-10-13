import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalHOC from '../modal/ModalrHOC';
import LoaderHOC from '../components/LoaderHOC';
import { Tree, } from 'antd';
import { getToken } from '../config/token';
import axios from 'axios';
import { API_BASE } from '../config/env';
import { Redirect, Link } from 'react-router-dom';
import Trans from '../usetranslation/Trans';
import Translate from '../usetranslation/Translate'
import { fetchData } from '../actions/getData-action';
import BootstrapTable from 'react-bootstrap-table-next';
import { saveDepartment, deleteDepartment } from '../actions/departmentsactions/department-actions';
import { Modal } from 'antd';
import 'react-folder-tree/dist/style.css';
import {
    MinusOutlined,
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
    Switch,
    InputNumber,
    Checkbox
} from 'antd';
import { ConvertDecimal } from '../Function/convertNumberDecimal';

const { Option, OptGroup } = Select;
const { TextArea } = Input;
const { DirectoryTree } = Tree;
var translatedArray = []
var pat = /^[a-z]+$/;
var services = []
var accountservices = []

class TaxesPage extends Component {

    state = {
        sendObject: {}
    }

    onChangeFilter = (e,name) => {
        var n = 's' + name
        var v = e
        console.log(n,v)
        this.setState({
            sendObject: { ...this.state.sendObject, [n]: v }
        })
    }
    onChange = (e) => {
        var n = 's' + e.target.id
        var v = e.target.checked
        this.setState({
            sendObject: { ...this.state.sendObject, [n]: v }
        })
    }

    handleSaveTaxes = () => {
        console.log(this.state.sendObject)
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
                text: 'Servis',
                hidden: false,
                footer: 'Yekun'

            },
            {
                dataField: 'Price',
                text: 'Gündəlik',
                hidden: false,
                footer: ''

            },
            {
                dataField: 'PriceMonthly',
                text: 'Aylıq',
                hidden: false,
                footer: columnData => columnData.reduce((acc, item) => acc + item, 0) + ' ₼'

            },
            {
                dataField: 'Configuration',
                text: 'Seçim',
                hidden: false,
            }

        ]


        services = []
        accountservices = []
        if (this.props.datas.Services) {
            services = this.props.datas.Services
            accountservices = this.props.datas.AccountServices


            services.map(s => {
                s.PriceMonthly = ConvertDecimal(s.Price * 30)
            })
            services.map(s => {
                if (s.ServiceType === 'num') {
                    s.Configuration =
                        <InputNumber min={s.Minimal} name={s.Id} onChange={(e)=>this.onChangeFilter(e,s.Id)}
                            defaultValue={Object.entries(accountservices).find(ac => ac[0] === s.Id) ? Object.entries(accountservices).find(ac => ac[0] === s.Id)[1] : 0}
                        />
                }
                else if (s.ServiceType === 'check') {
                    s.Configuration =
                        <Checkbox id={s.Id} onChange={this.onChange} defaultChecked={Object.entries(accountservices).find(ac => ac[0] === s.Id) ? true : false} />
                }
            })

        }


        return (
            <Row>
                <Col xs={24} md={24} xl={24}>
                    <BootstrapTable
                        classes='settingTable'
                        keyField="Id"
                        data={services}
                        columns={columns.filter(c => c.hidden == false)}
                        striped
                        hover
                        condensed
                    />
                </Col>
                <Col xs={24} md={24} xl={24}>
                    <Button onClick={this.handleSaveTaxes} form='taxesForm' type="primary">
                        Yadda saxla
                    </Button>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => ({

    state
})

const mapDispatchToProps = {
    fetchData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(TaxesPage, 'fetching'))
