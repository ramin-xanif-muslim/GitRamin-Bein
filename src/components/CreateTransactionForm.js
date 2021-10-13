import React, { Component } from 'react';
import LoaderHOC from './LoaderHOC';
import SelectCustomer from './SelectCustomer'
import { SyncOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import putData from '../actions/putAactions/putData-action';
import { fetchData } from '../actions/getData-action';
import DocTable from './DocTable';
import filterObject from '../config/filterObject';
import Trans from '../usetranslation/Trans';
import WithPromises from './SelectDefaultCustomer';
import moment from 'moment';
import './ButtonsWrapper.css'
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    List,
    Typography,
    Divider

} from 'antd';
const { Option } = Select;
class CreateTransactionForm extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            docid: this.props.selectedDoc ? this.props.selectedDoc.Id : '',
            spenditems: this.props.datas ? this.props.datas : '',
            status: false,
            dataList: [''],
            customerLoading: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedDoc && nextProps.selectedDoc.Id !== this.state.docid) {
            this.setState({
                docid: nextProps.selectedDoc.Id,
                spenditems: nextProps.spenditems
            })
        }
    }

    onFinish = (values) => {
        var sendObject = {}
        sendObject = values;
        sendObject.moment = values.moment._i
        sendObject.modify = values.modify._i
        console.log(sendObject)
        // this.props.putData('enters', values)
    };

    handleStatusSelect = (checked, event) => {
        this.setState({
            status: checked
        })
    }
    render() {
        return (
            <div>
                <Form ref={this.formRef}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    name="basic"
                    initialValues={
                        {
                            name: this.props.selectedDoc ? this.props.selectedDoc.Name : '',
                            customerid: this.props.selectedDoc ? this.props.selectedDoc.CustomerId : '',
                            spenditem: this.props.selectedDoc ? this.props.selectedDoc.SpendItem : '',
                            amount: this.props.selectedDoc ? this.props.selectedDoc.Amount : '',
                            status: this.props.selectedDoc ? this.props.selectedDoc.Status : '',
                            modify: this.props.selectedDoc ? moment(this.props.selectedDoc.Modify) : '',
                            moment: this.props.selectedDoc ? moment(this.props.selectedDoc.Moment) : '',
                            id: this.props.selectedDoc ? this.props.selectedDoc.Id : '',
                        }
                    }
                    layout="horizontal"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label={<Trans word={'editdocname'} />}
                        name="name"
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item
                        label={<Trans word={'amount'} />}
                        name="amount"
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item
                        label="Modify Moment"
                        name="modify"
                    >
                        <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>

                    <Form.Item
                        label="Created Moment"
                        name="moment"
                    >
                        <DatePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item hidden={true}
                        label="id"
                        name="id"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Customers"
                        name='customerid'
                    >
                        <WithPromises selectedCustomerName={this.props.selectedDoc.CustomerName} selectedCustomerId={this.props.selectedDoc.CustomerId} />
                    </Form.Item>

                    <Form.Item
                        label="SpendItems"
                        name='spenditem'
                    >
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="Search to Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                            {
                                Object.values(this.state.spenditems).map(s =>
                                    <Option value={s.Id} staticname={s.StaticName} target={s.Target}>{s.Name}</Option>
                                )
                            }

                        </Select>
                    </Form.Item>


                    <Form.Item label="status" name='status' valuePropName="checked">
                        <Switch name='status' onChange={this.handleBarcodeSelect} />
                    </Form.Item>
                    <Form.Item label="Button">
                        <Button htmlType="submit">Button</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state,
})

export default connect(mapStateToProps)(LoaderHOC(CreateTransactionForm, 'datas'))