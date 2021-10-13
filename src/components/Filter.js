import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Select, DatePicker, TreeSelect } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Null_Content } from '../config/env';
import { connect } from 'react-redux'
import Filter from '../Filter/demands';
import filterObject from '../config/filterObject';
import { fetchData } from '../actions/getData-action';
import { getFilterDatas } from '../actions/filterActions/getFilter-actions';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './Filter.css'
import moment from 'moment';
const { Option, OptGroup } = Select;
const { RangePicker } = DatePicker;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
var pid;
var options;
var customCascaderStock = [];
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

const Filter = (props) => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();




    const onFocus = (controller) => {
        options = ''
        props.getFilterDatas(controller)
    }
    console.log(options)
    options = (
        props.state.filters.fetching == false ?
            Object.values(props.state.filters.filterDatas).map(filter =>
                <Option key={filter.Id} value={filter.Id}>
                    {filter.Name}
                </Option>
            )
            : ''
    )



    console.log(options)



    const getFields = () => {
        const count = expand ? Filter.length : 6;
        const children = [];



        for (let i = 0; i < count; i++) {
            children.push(
                <Col span={8} key={i}>
                    <Form.Item
                        name={`${Filter[i].name}`}
                        label={`${Filter[i].label}`}
                    >
                        {
                            Filter[i].type === 'text' ? <Input placeholder={Filter[i].label} /> :
                                filter[i].type === 'select' ?
                                    <Select
                                        showSearch
                                        placeholder={Filter[i].label}
                                        showAction={['click']}
                                        onClick={() => onFocus(Filter[i].controller)}
                                        loading={props.state.filters.fetching}
                                        mode="multiple"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        notFoundContent={<Spin size="small" />}
                                    >
                                            {options}


                                    </Select> :
                                    Filter[i].type === 'date' ?
                                        <RangePicker showTime={{ format: 'HH:mm:ss' }} format="YYYY-MM-DD HH:mm:ss" /> :
                                        Filter[i].type === 'number' ?
                                            <Input type='number' placeholder={Filter[i].label} /> :

                                            ''

                        }
                    </Form.Item>
                </Col>,
            );
        }

        return children;
    };
    const onFinish = (values) => {
        console.log(values)
        filterObject.id = ''
        filterObject.pg = 0
        var sendObject = []
        sendObject = { ...filterObject, ...values };
        props.fetchData('demands', sendObject)
    };


    return (

        <div className={props.state.filters.isOpen ? 'filter_wrapper' : 'filter_wrapper hide'}>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
            >
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                    <Col
                        span={24}
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button
                            style={{
                                margin: '0 8px',
                            }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                        <a
                            style={{
                                fontSize: 12,
                            }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                        </a>
                    </Col>
                </Row>
            </Form>
        </div>

    );
};



const mapStateToProps = (state) => ({
    state

})

const mapDispatchToProps = {
    fetchData, getFilterDatas
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
