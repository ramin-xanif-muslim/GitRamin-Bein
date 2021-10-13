import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoaderHOC from '../components/LoaderHOC';
import axios from 'axios';
import { API_BASE } from '../config/env';
import '../components/Form.css'
import Trans from '../usetranslation/Trans';
import '../components/Colors.css'
import DocButtons from '../components/DocButtons';
import { Redirect } from 'react-router';
import buttonsNames from '../ButtonsNames/NotDocs/NotDocsDifferent/buttonsNames'
import {
    Col,
    Row,
    Form,
    Input,
    Button,
    TreeSelect,
    Menu,
    Dropdown,
    message


} from 'antd';


var customCascader = [];
var newArr = []
var pid;
var suffixed
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



class StockPageFormSetting extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            stock: this.props.selectedStock ? this.props.selectedStock.Id : '',
            status: false,
            childrenDrawer: false,
        }
    }

    state = {
        loadingButton: false,
        redirect: false
    }
    componentDidMount() {
        customCascader = []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedStock && nextProps.selectedStock.Id !== this.state.stock) {
            this.setState({
                stock: nextProps.selectedStock.Id,
            })


        }
    }

    progress = (fetching, status, mess, from) => {
        console.log(fetching)
        if (fetching) {
            message.loading('Yüklənir...')
        }
        else if (fetching === 'error') {
            console.log('errora girdi')
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



                this.setState({
                    editId: mess.responseService,
                    loadingButton: false
                })
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

    async putStock(object) {
        const res = await axios.post(`${API_BASE}/stocks/put.php`, object);
        return await res;
    }

    onFinish = (values) => {
        if (values.parentid === '') {
            values.parentid = '00000000-0000-0000-0000-000000000000'
        }
        this.progress(true)
        this.setState({
            loadingButton: true
        })
        var sendObject = {}
        sendObject = values
        sendObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        this.putStock(sendObject).then(res => this.progress(false, res.data.Body.ResponseStatus, res.data.Body, 'save'))
    };
    render() {

        newArr = []
        Object.values(this.props.datas).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascader.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })

        newArr = convert(customCascader)

        const menu = (
            <Menu>

                <Menu.Item key="0">
                    <Button onClick={(e) => this.deleteGroup(this.props.selectedProGr ? this.props.selectedProGr.Id : '', e)} className='flex_directon_col_center'>
                        Anbarı sil
                    </Button>
                </Menu.Item>
                <Menu.Divider />

            </Menu>
        );
        return (
            <div className='table_holder'>
                <Row>
                    <Col xs={24} md={24} xl={24}>
                        <h2 className='custom_top_margin'>Anbar qrupu</h2>
                    </Col>
                    <Col xs={24} md={24} xl={24} className='form_header_wrapper'>
                        <DocButtons loading={this.state.loadingButton} from='settings' buttonsName={buttonsNames} activeitem={this.props.state.navbar.activeItem} activesubitem={this.props.state.navbar.activeSubItem} />
                    </Col>
                    <Col xs={24} md={24} xl={24}>

                        <Form id='myForm' ref={this.formRef}
                            labelCol={{
                                span: 4,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            name='basic'
                            layout="horizontal"
                            initialValues={
                                {
                                    name: this.props.selectedStock ? this.props.selectedStock.Name : '',
                                    id: this.props.selectedStock ? this.props.selectedStock.Id : '',
                                    description: this.props.selectedStock ? this.props.selectedStock.Description : '',
                                    parentid: this.props.selectedStock ? this.props.selectedStock.ParentId === '00000000-0000-0000-0000-000000000000' ? '' : this.props.selectedStock.ParentId : '',

                                }
                            }
                            onFinish={this.onFinish}
                        >

                            <Form.Item label="Anbar adı" name="name">
                                <Input />
                            </Form.Item>
                            <Form.Item hidden={true} label="id" name='id'>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Təsvir" name='description'>
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item label='Yerləşdiyi anbar' name='parentid'>
                                <TreeSelect
                                    className='doc_status_formitem_wrapper_col'
                                    allowClear
                                    treeData={newArr.children}
                                />
                            </Form.Item>


                        </Form>

                    </Col>

                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(StockPageFormSetting, 'datas'))





