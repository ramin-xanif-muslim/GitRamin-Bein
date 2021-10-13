import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'semantic-ui-react'
import { updateProduct, updatePositions } from '../actions/updateProduct';
import axios from 'axios';
import { updateSelectedRows } from '../actions/updateStates-action';
import { updateSelectProductMultiConfirm } from '../actions/updateStates-action';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { getToken } from '../config/token'

import './AddProInput.css'
import { Null_Content } from '../config/env'
var datas = []


class AddProInputNew extends Component {

    constructor(props) {
        super(props)
        this.timeout = 0;
    }
    state = {
        options: [],
        loading: true,
        openDropDown: false,
        value: '',
        selectedrow: this.props.selectedrows ? this.props.selectedrows : [],
        selectedid: this.props.selectedrowsid ? this.props.selectedrowsid : [],
    }
    async getFastProducts(object) {
        const res = await axios.post('https://dev.bein.az/controllers/products/getfast.php', object)
        return await res;
    }

    onClose = () => {
        this.setState({
            options: [],
            loading: true,
            barcodeScan: false,
            openDropDown: false


        })
    }
    handleSearch = (e, object) => {
        this.setState({
            loading: true,
            value: object.searchQuery
        })

        const getFastProObject = {
            token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '',
            fast: object.searchQuery
        }
        if (this.timeout) clearTimeout(this.timeout);
        if (object.searchQuery) {

            if (!isNaN(object.searchQuery) && object.searchQuery.length === 13) {
                this.setState({
                    barcodeScan: true
                })
                var repeatedProduct = this.props.positions.find(p => p.BarCode === object.searchQuery)
                if (repeatedProduct) {
                    let result = Object.keys(repeatedProduct).reduce((prev, current) =>
                        ({ ...prev, [current.toLowerCase()]: repeatedProduct[current] }), {})
                    delete result['key'];
                    result = { ...result, value: result.productid, text: result.name };
                    delete result['productid'];
                    console.log('res', result)

                    this.props.updatePositions(true, result)
                    this.props.updateSelectProductMultiConfirm(false, false, true)
                    this.setState({
                        options: [],
                        loading: false,
                        openDropDown: false,
                        value: '',
                    })
                }
                else {

                    this.timeout = setTimeout(() => {
                        this.getFastProducts(getFastProObject).then(res => {
                            let result = []
                            if (res.data.Body.List.length > 0) {
                                result.push({
                                    key: res.data.Body.List[0].Id,
                                    value: res.data.Body.List[0].Id,
                                    id: res.data.Body.List[0].Id,
                                    text: res.data.Body.List[0].Name,
                                    barcode: res.data.Body.List[0].BarCode,
                                    artcode: res.data.Body.List[0].ArtCode,
                                    stockquantity: res.data.Body.List[0].Quantity,
                                    amount: 1,
                                    buyprice: res.data.Body.List[0].BuyPrice,
                                    price: res.data.Body.List[0].Price,
                                    packprice: res.data.Body.List[0].PackPrice,
                                    packquantity: res.data.Body.List[0].PackQuantity,
                                    ispack: res.data.Body.List[0].IsPack,
                                    totalprice: `${parseFloat(res.data.Body.List[0].Price) * parseFloat(1)}`,
                                    name: res.data.Body.List[0].Name,
                                    costprice: res.data.Body.List[0].CostPrice,
                                    costpricetotal: `${parseFloat(res.data.Body.List[0].CostPrice) * parseFloat(1)}`
                                })
                                console.log(result)
                                this.props.updatePositions(true, result[0])
                                this.props.updateSelectProductMultiConfirm(false, false, true)

                            }

                            if (result.length > 0) {
                                this.setState({
                                    options: [],
                                    loading: false,
                                    openDropDown: false,
                                    value: '',
                                })
                            }
                            else {
                                this.setState({
                                    options: [],
                                    loading: false,
                                    barcodeScan: false,
                                    openDropDown: true,
                                    value: '',

                                })
                            }


                        })
                    }, 300);
                }
            }
            else {
                this.timeout = setTimeout(() => {
                    this.getFastProducts(getFastProObject).then(res => {
                        this.setState({
                            options: res.data.Body.List,
                            loading: false,
                            barcodeScan: false,
                            openDropDown: true
                        })
                    })
                }, 300);
            }
        }

        else {
            this.setState({
                openDropDown: false
            })
        }



    }




    onChange = (e, ob) => {
        this.setState({
            options: [],
            loading: false,
            value: '',
            openDropDown: false,
        })
        this.props.updatePositions(true, ob)
        this.props.updateSelectedRows()
        this.props.updateSelectProductMultiConfirm(false, false, true)


    }



    render() {
        datas = []
        if (this.state.options.length > 0) {
            this.state.options.forEach(r => {
                datas.push({
                    key: r.Id,
                    value: r.Id,
                    id: r.Id,
                    text: r.Name,
                    barcode: r.BarCode,
                    artcode: r.ArtCode,
                    stockquantity: r.Quantity,
                    amount: 1,
                    price: r.Price,
                    buyprice: r.BuyPrice,
                    packprice: r.PackPrice,
                    packquantity: r.PackQuantity,
                    ispack: r.IsPack,
                    totalprice: `${parseFloat(r.Price) * parseFloat(1)}`,
                    name: r.Name,
                    costprice: r.CostPrice,
                    costpricetotal: `${parseFloat(r.CostPrice) * parseFloat(1)}`
                })
            })
        }
        else {
            datas.push({
                key: '0',
                value: '0',
                id: '0',
                text: Null_Content,
                barcode: '',
                quantity: '',

            })
        }



        const { loading } = this.state

        return (
            <div className='add_pro_input_wrapper'>

                <Dropdown
                    button
                    className='icon'
                    disabled={this.props.from === 'supplyreturns' || this.props.from === 'demandreturns' ? this.props.saledoc ? true : false : false}
                    style={{ width: '100%' }}
                    floating
                    onChange={this.handlePress}
                    searchQuery={this.state.value}
                    onSearchChange={this.handleSearch}
                    onClose={this.onClose}
                    labeled
                    open={this.state.openDropDown ? true : false}
                    lazyLoad
                    icon='shop'
                    search
                    text='Məhsul əlavə et - Ad, Barkod və ya Artkod ilə'
                >
                    <Dropdown.Menu>
                        {datas.map((option) => (
                            option.id != '0' ? <Dropdown.Item onClick={this.onChange} key={option.value} {...option}>

                                <p className='optionCustom'>
                                    <span className=''>{option.text}</span>
                                    <span> {option.artcode ? option.artcode + '-' : ''} </span>
                                </p>
                                <p className='optionCustom'>
                                    <span className='fadeOption'>{option.barcode}</span>
                                    <span className='fadeOption' style={{ color: option.stockquantity >= 0 ? "" : 'red' }}>{option.stockquantity ? option.stockquantity + ' əd' : '0.00 əd'}</span>
                                </p>
                                <p>
                                    <span>{option.price}   ₼</span>
                                </p>

                            </Dropdown.Item> :
                                !this.state.barcodeScan ?
                                    <Dropdown.Item key={option.value} {...option}>
                                        <p className='optionCustom'>
                                            <span className=''>{option.text}</span>
                                        </p>
                                    </Dropdown.Item>
                                    : ""

                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    updatePositions, updateSelectProductMultiConfirm, updateSelectedRows
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProInputNew)
