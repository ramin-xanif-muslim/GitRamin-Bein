import React, { Component } from 'react'
import { connect } from 'react-redux'
import Trans from '../usetranslation/Trans';
import { deleteResponseService } from '../actions/putAactions/deleteResponseService';
import { putLocalStates } from '../actions/modalActions/putModalInputs-action';
import { getCustomers, getCustomersFast } from '../actions/getCustomerGroups-action';
import getMarks from '../actions/getMarks-action'
import { getGroups } from '../actions/getGroups-action';
import LoaderHOC from './LoaderHOC';
import { getCustomerGroupsModal, getStocksGroupsModal, productModalFilter, getProductsModal, getProductsGroupModal } from '../actions/modalActions/getCustomerGroupsModal-action';
import CreateCustomerModal from '../modal/CreateCustomerModal';
import { getCustomersData, updateCustomerSelect } from '../actions/getCustomerGroups-action';
import CreateStockModal from '../modal/CreateStockModal';
import { poistionArray, description } from './DocTable';
import putData from '../actions/putAactions/putData-action';
import { changeForm } from '../actions/updateStates-action';
import { saveDocument, progress, isCreated } from '../actions/putAactions/saveDocument';
import Sound from 'react-sound';
import ok from '../audio/ok.mp3'
import { createNewDocId } from '../actions/putAactions/saveDocument';
import { API_BASE } from '../config/env';
import axios from 'axios';
import { getToken } from '../config/token';
import moment from 'moment';
import {
    Form, Input, Drawer, Button, Popconfirm, InputNumber, message, TreeSelect, Checkbox, Dropdown, DatePicker, Switch, Select, Spin, Tag, Divider, Menu, Col, Row, Collapse
} from 'antd';
import {
    PrinterOutlined,
    UserAddOutlined,
    PlusOutlined,
    LoadingOutlined,
    DeleteOutlined,
    EditOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { Null_Content } from '../config/env';
import AddStockModal from '../modal/AddStockModal';
import './ButtonsWrapper.css'
import './DocForm.css'
const { Option, OptGroup } = Select;
const { Panel } = Collapse;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
var newArrStocks = []
var customCascaderStock = [];
var customCascaderCustomer = [];
var newArrStocks = []
var newArrCustomers = []
var lowerCaseMarks = []
var lowerCaseCustomers = []
var ownersOptions = []
var depOptions = []
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
var sendObject = {}

class MoveFormComponent extends Component {

    formRef = React.createRef();

    state = {
        visibleCustomer: false,
        visibleStock: false,
        visibleCatalog: false,
        customerEdit: false,
        stockEdit: false,
        customerCreate: false,
        stockCreate: false,
        stockFromCreate: false,
        moveFrom: false,
        createdCustomerId: '',
        createdStockId: '',
        createdFromStockId: '',
        newDocId: '',
        createdCustomerName: '',
        editMarkColor: '',
        selectedMarkId: '',
        editMarkName: '',
        editMarkId: '',
        createdMarkId: '',
        createdMarkName: '',
        createdMarkColor: '',
        markEdit: false,
        markCreate: false,
        markLoading: false,
        markEditVisible: false,

    }
    componentDidMount = () => {
        this.props.createNewDocId('')
        var id = this.props.saledoc ? this.props.saledoc.doc.CustomerId : this.props.doc ? this.props.doc.CustomerId : ''
        this.props.getCustomersData(id)
        if (!this.props.doc) {
            this.formRef.current.setFieldsValue({
                moment: moment()

            })
        }
    };
    componentWillReceiveProps(nextProps) {

        if (nextProps.state.putdatas.responseStockId.ResponseService) {
            if (nextProps.state.putdatas.responseStockId.ResponseService != this.props.state.putdatas.responseStockId.ResponseService) {
                this.setState({
                    stockCreate: true,
                    createdStockId: nextProps.state.putdatas.responseStockId.ResponseService
                }, () => {
                    this.formRef.current.setFieldsValue({
                        stocktoid: nextProps.state.docmodals.localStates.name,
                    })
                })

            }
            else {
                this.setState({
                    stockCreate: false
                })
            }
        }

        if (nextProps.state.putdatas.responseFromStockId.ResponseService) {
            if (nextProps.state.putdatas.responseFromStockId.ResponseService != this.props.state.putdatas.responseFromStockId.ResponseService) {
                this.setState({
                    stockFromCreate: true,
                    createdFromStockId: nextProps.state.putdatas.responseFromStockId.ResponseService
                }, () => {
                    this.formRef.current.setFieldsValue({
                        stockfromid: nextProps.state.docmodals.localStates.name,
                    })
                })

            }
            else {
                this.setState({
                    stockFromCreate: false
                })
            }
        }
        if (nextProps.state.marks.newMarkId != '') {
            if (nextProps.state.marks.newMarkId != this.props.state.marks.newMarkId) {
                this.setState({
                    markCreate: true,
                    createdMarkId: nextProps.state.marks.newMarkId,
                }, () => {
                    this.formRef.current.setFieldsValue({
                        mark: this.state.createdMarkName
                    })
                })
            }
            else {
                this.setState({
                    markCreate: false
                })
            }
        }


        if (nextProps.state.savedoc.docName) {
            if (nextProps.state.savedoc.docName != this.props.state.savedoc.docName) {
                this.formRef.current.setFieldsValue({
                    name: nextProps.state.savedoc.docName
                })
            }
        }


        if (nextProps.state.savedoc.newDocId != '') {
            if (nextProps.state.savedoc.newDocId != this.props.state.savedoc.newDocId) {
                this.formRef.current.setFieldsValue({
                    id: nextProps.state.savedoc.newDocId
                })
            }
        }
    }
    showDrawer = () => {
        this.setState({
            visibleCustomer: true,
        });
        this.props.deleteResponseService()
        this.props.getCustomerGroupsModal()
        this.props.putLocalStates('')
    };

    showStockDrawer = (bool) => {
        console.log(bool)
        this.setState({
            visibleStock: true,
            moveFrom: bool
        });
        this.props.deleteResponseService()
        this.props.getStocksGroupsModal()
        this.props.putLocalStates('')
    };

    onClose = () => {
        this.setState({
            visibleCustomer: false,
            moveFrom: false
        });
    };


    onCloseStock = () => {
        this.setState({
            visibleStock: false,
        });
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
        this.props.getCustomerGroupsModal()
    };



    doSearch = (value) => {
        this.props.getCustomersFast(value)
    }
    getCustomers = () => {
        this.setState({
            customerEdit: true
        })
        newArrCustomers = []
        this.props.getCustomers()
    }
    getStocks = () => {
        this.setState({
            stockEdit: true
        })
        newArrStocks = []
        customCascaderStock = [];
        this.props.getGroups('stocks')
    }


    onChangeField = () => {
        this.props.changeForm(true)
    }

    onChange = (value, option) => {
        this.props.getCustomersData(value)
    }

    handleCreatedDoc = () => {
        this.props.isCreated(false)
    }

    onChangeField = () => {
        this.props.changeForm(true)
    }
    onNameChange = (e) => {
        this.setState({
            createdMarkName: e.target.value,
        });
    }
    handleMarkId = (value, option) => {
        delete sendObject['mark'];
        sendObject.mark = option ? option.key : null
        this.setState({
            selectedMarkId: option ? option.key : null
        })
    }

    handleColorChange = (e) => {
        this.setState({
            createdMarkColor: e.target.value,
        });
    }

    handleEditColorChange = (e) => {
        this.setState({
            editMarkColor: e.target.value,
        });
    }

    onChangeEditMark = (e) => {
        this.setState({
            editMarkName: e.target.value,
        });
    }
    handleDeleteMark = (e, id) => {
        e.preventDefault()
        e.stopPropagation()
        this.props.delMark(id)
    }
    handleEditMark = (e, id, name, color) => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({
            editMarkId: id,
            editMarkName: name,
            editMarkColor: color,
            markEditVisible: true,
        })
    }
    handleCloseEditMark = (e, id, name) => {
        this.props.getMarks()
        this.setState({
            editMarkId: '',
            editMarkName: '',
            editMarkColor: '',
            markEditVisible: false
        })
    }

    editMark = () => {
        this.setState({
            markLoading: true
        })
        var markFilter = {}
        markFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        markFilter.id = this.state.editMarkId
        markFilter.name = this.state.editMarkName
        markFilter.color = this.state.editMarkColor
        this.editMarks(markFilter).then(d => this.setState({
            markLoading: false

        }))
    }

    async editMarks(object) {
        const res = await axios.post(`${API_BASE}/marks/edit.php`, object);
        return await res;
    }
    addItem = () => {

        var markFilter = {}
        markFilter.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        markFilter.name = this.state.createdMarkName
        markFilter.color = this.state.createdMarkColor
        this.props.putMark(markFilter)

    }
    onFinish = (values) => {
        sendObject = values;
        sendObject.positions = poistionArray
        if (!values.moment) {
            this.formRef.current.setFieldsValue({
                moment: moment(),
            }, () => {
                sendObject.moment = values.moment._d
                sendObject.modify = values.moment._d
            })
        }
        else {
            sendObject.moment = values.moment._d
            sendObject.modify = values.modify._i
        }
        sendObject.description = description
        sendObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        if (this.state.createdFromStockId != '') {
            delete sendObject['stockfromid'];
            sendObject.stockfromid = this.state.createdFromStockId
        }
        if (this.state.createdStockId != '') {
            delete sendObject['stocktoid'];
            sendObject.stocktoid = this.state.createdStockId
        }
        if (this.state.selectedMarkId === '') {
            delete sendObject['mark'];
            sendObject.mark = this.props.doc.Mark
        }
        else if (this.state.selectedMarkId === null) {
            delete sendObject['mark'];
        }
        else {
            delete sendObject['mark'];
            sendObject.mark = this.state.selectedMarkId
        }
        if (this.state.createdMarkId != '') {
            delete sendObject['mark'];
            sendObject.mark = this.state.createdMarkId
        }
        this.props.state.savedoc.newDocId != '' ? sendObject.id = this.props.state.savedoc.newDocId : sendObject.id = values.id
        sendObject.positions.forEach(p => {
            if (p.IsPack === 1) {
                p.Quantity = p.ChangePackQuantity
            }
        })
        progress(true)
        this.props.saveDocument('moves', sendObject)
    };

    timePickerBlur = (time) => {
        //Ofc you can use state or whatever here :)
        this.formRef.current.setFieldsValue({
            moment: moment(time),
        });
    }
    render() {

        //#region important arrays start
        lowerCaseMarks = []
        newArrStocks = []
        customCascaderStock = []
        depOptions = []
        ownersOptions = []
        //#endregion

        //#region marks loading start here
        const markOptions = (
            Object.values(this.props.state.marks.marks).map(mark =>
                <Option className='mark_option_wrapper' value={mark.Name} key={mark.Id}><span>{mark.Name}</span><span className='mark_option_icons_wrapper'>
                    <EditOutlined style={{ marginRight: '8px', color: '#0288d1' }} id={mark.Id} onClick={(e) => this.handleEditMark(e, mark.Id, mark.Name, mark.Color)} />
                    <DeleteOutlined style={{ color: 'red' }} onClick={(e) => this.handleDeleteMark(e, mark.Id)} />
                </span></Option>
            )
        )
        //#endregion marks loading ends here


        Object.values(this.props.state.groups.groups).map(d => {
            d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
            customCascaderStock.push({
                "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
            })
        })
        newArrStocks = convert(customCascaderStock)


        Object.values(this.props.state.owdep.owners).map(r => {
            ownersOptions.push({
                label: r.Name,
                value: r.Id,
            })
        })
        Object.values(this.props.state.owdep.departments).map(r => {
            depOptions.push({
                label: r.Name,
                value: r.Id,
            })
        })
        
        return (

            <>
                < Sound
                    url={ok}
                    playStatus={this.props.state.savedoc.iscreated ? Sound.status.PLAYING : Sound.status.Stopped}
                    onFinishedPlaying={this.handleCreatedDoc}
                />
                <Form id='myForm' className='doc_forms' ref={this.formRef}
                    name="basic"
                    initialValues={
                        {
                            name: this.props.doc ? this.props.doc.Name : '',
                            stockfromid: this.props.doc ? this.props.doc.StockFromId : '',
                            stocktoid: this.props.doc ? this.props.doc.StockToId : '',
                            status: this.props.doc ? this.props.doc.Status === 1 ? true : false : true,

                            modify: this.props.doc ? moment(this.props.doc.Modify) : '',
                            moment: this.props.doc ? moment(this.props.doc.Moment) : '',
                            id: this.props.doc ? this.props.doc.Id : this.state.editid ? this.state.editid : '',
                            mark: this.props.doc ? this.props.state.marks.marks.find(m => m.Id === this.props.doc.Mark) ? this.props.state.marks.marks.find(m => m.Id === this.props.doc.Mark).Name : '' : '',
                            ownerid: this.props.doc ? this.props.doc.OwnerId : '',
                            departmentid: this.props.doc ? this.props.doc.DepartmentId : '',
                        }
                    }
                    layout="horizontal"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    onFieldsChange={this.onChangeField}

                >

                    <div className='form_total_top_wrapper'>

                        <Row className='top_wrapper_holder'>
                            <Col xs={24} md={24} xl={6}>
                                <div className='first_form_wrapper'>
                                    <Form.Item
                                        label={<Trans word={'Enter Number'} />}
                                        name="name"
                                        className='doc_number_form_item'
                                    >
                                        <Input allowClear />
                                    </Form.Item>

                                    <Form.Item
                                        label="Dəyişmə tarixi"
                                        name="modify"
                                        className='modified_date_input'
                                        style={{ display: this.props.docid != '' ? 'flex' : 'none' }}

                                    >
                                        <DatePicker disabled={true} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Trans word={'Created Moment'} />}
                                        name="moment"
                                    >
                                        <DatePicker onSelect={this.timePickerBlur} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                                    </Form.Item>


                                </div>
                            </Col>
                            <Col xs={24} md={24} xl={6}>
                                <div className='second_form_wrapper'>
                                    <Form.Item
                                        label='Status'
                                        name='mark'

                                    >
                                        <Select
                                            showSearch
                                            showArrow={false}
                                            filterOption={false}
                                            allowClear={true}
                                            className='customSelect'
                                            onChange={this.handleMarkId}
                                            onFocus={this.getMarks}
                                            placeholder="Status"
                                            notFoundContent={<Spin size="small" />}
                                            loading={this.props.state.marks.markLoading ? <Spin size="small" /> : ''}
                                            dropdownRender={menu => (
                                                <div className='site-drawer-render-in-current-wrapper customDrawer'>
                                                    {menu}
                                                    <Divider style={{ margin: '4px 0' }} />
                                                    <Drawer
                                                        title="Status adı"
                                                        placement="right"
                                                        closable={false}
                                                        onClose={this.handleCloseEditMark}
                                                        visible={this.state.markEditVisible}
                                                        getContainer={false}
                                                        style={{ position: 'absolute' }}
                                                    >
                                                        <Input style={{ width: '115px' }} onChange={this.onChangeEditMark} value={this.state.editMarkName} />
                                                        <Input type='color' value={this.state.editMarkColor} onChange={this.handleEditColorChange} />
                                                        <Button loading={this.state.markLoading} onClick={this.editMark}>Yadda saxla</Button>
                                                    </Drawer>
                                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8, flexDirection: 'column' }}>
                                                        <Input style={{ flex: 'auto' }} placeholder='Status adı' onChange={this.onNameChange} />
                                                        <Input type='color' defaultValue='#0288d1' onChange={this.handleColorChange} />
                                                        <a
                                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                            onClick={this.addItem}
                                                        >
                                                            <PlusOutlined /> Əlavə et
                                                        </a>
                                                    </div>
                                                </div>
                                            )}

                                        >
                                            {this.props.state.marks.markLoading ? [] : markOptions}
                                        </Select>



                                    </Form.Item>


                                    <div className='plus_wrapper'>
                                        <Form.Item

                                            label={<Trans word={'StockTo Groups'} />}
                                            name='stocktoid'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Zəhmət olmasa, anbar qrupunu seçin',
                                                },
                                            ]}
                                        >
                                            <TreeSelect
                                                className='doc_status_formitem_wrapper_col customSelect'
                                                allowClear
                                                onFocus={this.getStocks}
                                                notFoundContent={<Spin size="small" />}
                                                treeData={newArrStocks.children}
                                            />

                                        </Form.Item>
                                        <PlusOutlined onClick={() => this.showStockDrawer(false)} className='add_elements' />


                                    </div>


                                </div>

                            </Col>
                            <Col xs={24} md={24} xl={6}>
                                <div className='second_form_wrapper'>
                                    <Form.Item label="Keçirilib" className='docComponentStatus' name='status' valuePropName="checked">
                                        <Checkbox name='status' onChange={this.handleBarcodeSelect}  ></Checkbox>
                                    </Form.Item>
                                    <div className='plus_wrapper'>
                                        <Form.Item

                                            label={<Trans word={'StockFrom Groups'} />}
                                            name='stockfromid'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Zəhmət olmasa, anbar qrupunu seçin',
                                                },
                                            ]}
                                        >
                                            <TreeSelect
                                                className='doc_status_formitem_wrapper_col customSelect'
                                                allowClear
                                                onFocus={this.getStocks}
                                                notFoundContent={<Spin size="small" />}
                                                treeData={newArrStocks ? newArrStocks.children : []}
                                            />

                                        </Form.Item>
                                        <PlusOutlined onClick={() => this.showStockDrawer(true)} className='add_elements' />

                                    </div>
                                </div>

                            </Col>
                            <Col xs={24} md={24} xl={6}>
                                <div className='second_form_wrapper'>
                                    <div className='form_top_side doc_permission'>
                                        <Collapse ghost>
                                            <Panel className='custom_panel_header' header="Təyinat" key="1">
                                                <Form.Item
                                                    label={'Cavabdeh'}
                                                    name="ownerid"
                                                    style={{ margin: '0' }}
                                                >

                                                    <Select
                                                        showSearch
                                                        placeholder=""
                                                        filterOption={false}
                                                        notFoundContent={<Spin size="small" />}
                                                        filterOption={(input, option) =>
                                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        options={ownersOptions}
                                                    />

                                                </Form.Item>
                                                <Form.Item
                                                    label={'Şöbə'}
                                                    name="departmentid"
                                                    style={{ margin: '0' }}
                                                >

                                                    <Select
                                                        showSearch
                                                        placeholder=""
                                                        notFoundContent={<Spin size="small" />}
                                                        filterOption={(input, option) =>
                                                            option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                        options={depOptions}
                                                    />
                                                </Form.Item>
                                            </Panel>
                                        </Collapse>
                                    </div>


                                    <div className='form_top_side doc_permission'>
                                        <Form.Item
                                            label="Dəyişmə tarixi"
                                            name="modify"
                                            className='modified_date_input'
                                            style={{ display: this.props.docid != '' ? 'flex' : 'none' }}

                                        >
                                            <DatePicker disabled={true} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Form.Item hidden={true}
                        label="id"
                        name="id"
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <CreateStockModal moveFrom={this.state.moveFrom} visible={this.state.visibleStock} onClose={this.onCloseStock} />

            </>



        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    putData, getMarks, saveDocument, isCreated, createNewDocId, getCustomersData, updateCustomerSelect, deleteResponseService, getProductsModal, getProductsGroupModal, getGroups, getStocksGroupsModal, getCustomers, getCustomersFast, putLocalStates, getCustomerGroupsModal, changeForm
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderHOC(MoveFormComponent, 'datas'))
