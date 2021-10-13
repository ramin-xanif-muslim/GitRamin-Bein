import React, { Component } from 'react'
import { connect } from 'react-redux'
import Trans from '../usetranslation/Trans';
import { getCustomers, getCustomersFast, getCustomersData } from '../actions/getCustomerGroups-action';
import getMarks from '../actions/getMarks-action'
import { getGroups } from '../actions/getGroups-action';
import LoaderDocHOC from './LoaderDocHOC';
import { ConvertFixedTable } from '../Function/convertNumberDecimal';
import moment from 'moment';
import {
    Form, Input, TreeSelect, Checkbox, DatePicker, Select, Spin, Collapse, Row, Col
} from 'antd';

import {
    LoadingOutlined,
} from '@ant-design/icons';
import './ButtonsWrapper.css'
import './DocForm.css'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Panel } = Collapse;
var newArrStocks = []
var customCascaderStock = [];
var newArrCustomers = []
var lowerCaseMarks = []
var pid;
var treedata = []
var ownersOptions = []
var depOptions = []
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

class SaleFormComponent extends Component {

    state = {
        visibleCustomer: false,
        visibleStock: false,
        visibleCatalog: false,
        markEdit: false,
        customerEdit: false,
        stockEdit: false

    }
    doSearch = (value) => {
        this.props.getCustomersFast(value)
    }
    getMarks = () => {
        this.setState({
            markEdit: true
        })
        lowerCaseMarks = []
        this.props.getMarks()
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
    onChange = (value, option) => {
        this.props.getCustomersData(value)
    }
    timePickerBlur = (time) => {
        //Ofc you can use state or whatever here :)
        this.formRef.current.setFieldsValue({
            moment: moment(time),
        });
    }
    render() {

        //#region important arrays start
        newArrCustomers = []
        lowerCaseMarks = []
        newArrStocks = []
        customCascaderStock = []
        treedata = []

        depOptions = []
        ownersOptions = []

        //#endregion
        //#region marks loading start here
        if (this.state.markEdit) {
            Object.values(this.props.state.marks.marks).forEach(mark => {
                lowerCaseMarks.push({
                    label: mark.Name,
                    value: mark.Name
                })
            })
        }
        else {

            lowerCaseMarks.push({
                label: this.props.doc.Mark,
                value: this.props.doc.Mark
            })
        }
        //#endregion marks loading ends here
        //#region customers loading starts here

        if (this.state.customerEdit) {
            Object.values(this.props.state.groups.customers).forEach(customer => {
                newArrCustomers.push({
                    label: customer.Name,
                    value: customer.Id,
                })
            })
        }
        else {

            newArrCustomers.push({
                label: this.props.doc.CustomerName,
                value: this.props.doc.CustomerId
            })
        }


        //#endregion customers loading ends here
        //#region stocks loading starts here
        if (this.state.stockEdit) {
            Object.values(this.props.state.groups.groups).forEach(d => {
                d.ParentId === '00000000-0000-0000-0000-000000000000' ? pid = '' : pid = d.ParentId
                customCascaderStock.push({
                    "id": d.Id, "name": d.Name, "parent": pid, "value": d.Id, "label": d.Name,
                })
            })
            newArrStocks = convert(customCascaderStock)
            treedata = newArrStocks.children
        }
        else {
            customCascaderStock.push({
                children: [
                    {
                        title: this.props.doc.StockName,
                        value: this.props.doc.StockId,
                    },
                ],
            })
            newArrStocks = customCascaderStock
            treedata = newArrStocks[0].children
            console.log(treedata)


        }

        //#endregion stocks loading ends here


        Object.values(this.props.state.owdep.owners).forEach(r => {
            ownersOptions.push({
                label: r.Name,
                value: r.Id,
            })
        })
        Object.values(this.props.state.owdep.departments).forEach(r => {
            depOptions.push({
                label: r.Name,
                value: r.Id,
            })
        })
        return (

            <>
                <Form id='myForm' className='doc_forms' ref={this.formRef}
                    name="basic"
                    initialValues={
                        {
                            name: this.props.doc ? this.props.doc.Name : '',
                            stockid: Object.keys(this.props.doc).length > 0 ? this.props.doc.StockId : '',
                            customerid: Object.keys(this.props.doc).length > 0 ? this.props.doc.CustomerId : '',
                            status: this.props.doc ? this.props.doc.Status === 1 ? true : false : true,
                            modify: this.props.doc ? moment(this.props.doc.Modify) : '',
                            moment: this.props.doc ? moment(this.props.doc.Moment) : '',
                            id: this.props.doc ? this.props.doc.Id : '',
                            mark: this.props.doc ? this.props.doc.Mark : '',
                            ownerid: this.props.doc ? this.props.doc.OwnerId : '',
                            departmentid: this.props.doc ? this.props.doc.DepartmentId : '',
                        }
                    }
                    layout="horizontal"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >






                    <div className='form_total_top_wrapper'>
                        <Row className='top_wrapper_holder'>
                            <Col xs={24} md={24} xl={6}>
                                <div className='first_form_wrapper'>
                                    <Form.Item
                                        label={<Trans word={this.props.doctype} />}
                                        name="name"
                                    >
                                        <Input allowClear />
                                    </Form.Item>


                                    <Form.Item
                                        label={<Trans word={'Created Moment'} />}
                                        name="moment"
                                    >
                                        <DatePicker onSelect={this.timePickerBlur} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Dəyişmə tarixi"
                                        name="modify"
                                        className='modified_date_input'
                                        style={{ display: this.props.docid !== '' ? 'flex' : 'none' }}

                                    >
                                        <DatePicker disabled={true} showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
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
                                            className='customSelectStatus'
                                            filterOption={false}
                                            onFocus={this.getMarks}
                                            placeholder="Status"
                                            notFoundContent={<Spin size="small" />}
                                            loading={this.props.state.marks.markLoading ? <Spin size="small" /> : ''}
                                            options={this.props.state.marks.markLoading ? [] : lowerCaseMarks}

                                        />
                                    </Form.Item>


                                    <div className='plus_wrapper'>
                                        <Form.Item

                                            label={<Trans word={'Stock Groups'} />}
                                            name='stockid'
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
                                                treeData={this.props.state.groups.loading ? [] : treedata}
                                            />

                                        </Form.Item>


                                    </div>
                                    <div className='plus_wrapper'>
                                        <Form.Item
                                            label={'Müştəri'}
                                            name="customerid"
                                            style={{ margin: '0' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Zəhmət olmasa, müştəri seçin',
                                                },
                                            ]}
                                        >

                                            <Select
                                                showSearch
                                                placeholder=""
                                                className='doc_status_formitem_wrapper_col customSelect'
                                                onSearch={this.doSearch}
                                                onChange={this.onChange}
                                                onFocus={this.getCustomers}
                                                filterOption={false}
                                                notFoundContent={<Spin size="small" />}
                                                loading={this.props.state.groups.loading ? <Spin size="small" /> : ''}
                                                options={this.props.state.groups.loading ? [] : newArrCustomers}
                                            />

                                        </Form.Item>
                                    </div>
                                    <Spin className='get_data_indicator' indicator={antIcon} spinning={this.props.state.groups.fetchData}>
                                        <p style={{ marginTop: '4px' }} className='customer_data_wrapper' >Verəcək (borc) : {this.props.state.groups.customerDebt !== '' ? ConvertFixedTable(this.props.state.groups.customerDebt) : '0.00'}</p>

                                    </Spin>
                                </div>
                            </Col>
                            <Col xs={24} md={24} xl={6}>
                                <div className='second_form_wrapper'>
                                    <Form.Item label="Keçirilib" className='docComponentStatus' name='status' valuePropName="checked">
                                        <Checkbox name='status' onChange={this.handleBarcodeSelect}  ></Checkbox>
                                    </Form.Item>
                                </div>
                            </Col>
                            <Col xs={24} md={24} xl={6}>
                                <div className='second_form_wrapper'>
                                    <div className='form_top_side doc_permission'>
                                        <Collapse ghost>
                                            <Panel header="Təyinat" key="1">
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
            </>



        )
    }
}

const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    getMarks, getCustomersData, getGroups, getCustomers, getCustomersFast
}

export default connect(mapStateToProps, mapDispatchToProps)(LoaderDocHOC(SaleFormComponent, 'fetching'))
