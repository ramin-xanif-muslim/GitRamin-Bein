


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Select } from 'antd';
import jsonp from 'fetch-jsonp';
import querystring from 'querystring';
import { getToken } from '../config/token';
import { updateProduct, updatePositions } from '../actions/updateProduct';
import axios from 'axios';
import { updateSelectedRows } from '../actions/updateStates-action';
import { updateSelectProductMultiConfirm } from '../actions/updateStates-action';
import './AddProInput.css'
import {
    PlusOutlined,
    CaretDownOutlined,
    SettingOutlined,
    DeleteOutlined
} from '@ant-design/icons';
const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback, props) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {

        const str = querystring.encode({
            token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '',
            fast: value,
        });

        axios.post('https://beta.bein.az/controllers/products/getfast.php', str)
            .then(response => response.data.Body.List)
            .then(d => {
                if (currentValue === value) {
                    const data = [];

                    d.forEach(r => {
                        data.push({
                            value: r.Id,
                            id: r.Id,
                            text: r.Name,
                            barcode: r.BarCode,
                            artcode: r.ArtCode,
                            quantity: r.Quantity,
                            amount: 1,
                            price: r.Price,
                            packprice: r.PackPrice,
                            packquantity: r.PackQuantity,
                            ispack: r.IsPack,
                            totalprice: `${parseFloat(r.Price) * parseFloat(1)}`,
                            name: r.Name,
                            costprice: r.CostPrice,
                            costpricetotal: `${parseFloat(r.CostPrice) * parseFloat(1)}`
                        });
                    });
                    callback(data);
                }
            });
    }

    timeout = setTimeout(fake, 300);
}




class AddProInput extends React.Component {

    constructor(props) {
        super(props)
        this.selectRef = React.createRef();


    }
    state = {
        data: [],
        value: undefined,
        selectedrow: this.props.selectedrows ? this.props.selectedrows : [],
        selectedid: this.props.selectedrowsid ? this.props.selectedrowsid : [],
    };

    selBlur = () => {
        this.selectRef.current.blur()
    }

    selFocus = () => {
        this.selectRef.current.focus()
    }

    handleSearch = value => {

        if (!isNaN(value) && value.length === 13) {
            var repeatedProduct = this.props.positions.find(p => p.BarCode === value)
            if (repeatedProduct) {
                let result = Object.keys(repeatedProduct).reduce((prev, current) =>
                    ({ ...prev, [current.toLowerCase()]: repeatedProduct[current] }), {})
                delete result['key'];
                result = { ...result, value: result.productid, text: result.name };
                delete result['productid'];

                this.props.updatePositions(true, result)

                this.selBlur()
                this.setState({
                    data: [],
                    value: undefined,

                })
            }
            else {
                fetch(value, data => this.props.updatePositions(true, data[0]),this.props.updateSelectProductMultiConfirm(false, false, true));
                this.selBlur()
                this.setState({
                    data: [],
                    value: undefined,

                })
            }


        }
        else if (value) {

            console.log(value)

            fetch(value, data => this.setState({ data }));
            this.setState({
                data: [],
                value: undefined,

            })
        }
        else {
            this.setState({ data: [] });
            this.selFocus()

        }



    };


    handleKeyPress = (key) => {
        if (key.keyCode === 13) {
            this.setState({
                data: [],
                value: undefined,
            })
        }
    }



    handleSelect = (LabeledValue, option) => {
        this.props.updatePositions(true, option.optionParams)
        this.props.updateSelectedRows()
        this.props.updateSelectProductMultiConfirm(false, false, true)
        this.setState({
            data: [],
            value: undefined
        })
    }


    render() {
        const options = this.state.data.map(d =>
            <Option className='optionsWrapper' optionParams={d} key={d.value}>
                <p className='optionCustom'>
                    <span className=''>{d.text}</span>
                    <span> {d.artcode ? d.artcode + '-' : ''} </span>
                </p>
                <p className='optionCustom'>
                    <span className='fadeOption'>{d.barcode}</span>
                    <span className='fadeOption' style={{ color: d.quantity >= 0 ? "" : 'red' }}>{d.quantity ? d.quantity + ' əd' : '0.00 əd'}</span>
                </p>
                <p>
                    <span>{d.price}   ₼</span>
                </p>
            </Option>
        );
        return (
            <Select
                ref={this.selectRef}
                showSearch
                placeholder='Məhsul əlavə et - Ad, Barkod və ya Artkod ilə'
                value={null}
                style={this.props.style}
                dropdownClassName={'get_product_dropdown'}
                defaultActiveFirstOption={true}
                showArrow={false}
                className='add_pro_input_select'
                onInputKeyDown={this.handleKeyPress}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                notFoundContent={null}
            >
                {options}
            </Select>
        );
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    updatePositions, updateSelectProductMultiConfirm, updateSelectedRows
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProInput)
