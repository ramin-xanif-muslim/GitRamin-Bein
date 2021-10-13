


import React, { Component } from 'react';
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
} from 'antd';
class PricesForm extends Component {
  
    render() {
        return (
            <Form id=''
                layout="horizontal"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                initialValues={

                    {
                        minprice: this.props.prices.minprice ? this.props.prices.minprice : 0,
                        buyprice: this.props.prices.buyprice ? this.props.prices.buyprice : 0,
                        price: this.props.prices.price ? this.props.prices.price : 0,
                    }
                }
                name="basic"
                onFinish={this.onFinish}
            >

                <Form.Item label="Buy Price" name='buyprice'>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Sale Price" name='price'>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Minimum Price" name='minprice'>
                    <InputNumber />
                </Form.Item>
            </Form>
        );
    }
}


export default PricesForm