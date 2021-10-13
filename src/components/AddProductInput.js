import React, { Component } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { getToken } from '../config/token'
import axios from 'axios';
import { filter } from 'dom-helpers';
import { connect } from 'react-redux'
import { updateProduct, updateBarcode, updatePositions } from '../actions/updateProduct';
import { store } from '../index'
import { parse } from 'query-string';


var changedPositions = []
var from;




function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);
    const selectRef = React.useRef(null);




    const enterHandler = (event) => {
        if (event.keyCode === 13) {
           
            if (event.target.value.length === 13 && !isNaN(event.target.value)) {
                fetchRef.current += 1;
                const fetchId = fetchRef.current;
                var repeatedproduct = [changedPositions.find(p => p.BarCode === event.target.value)]
                if (repeatedproduct[0]) {
                    setFetching(false)
                    var newData;
                    switch (from) {
                        case 'enters':
                            newData = [{
                                value: repeatedproduct[0].Name,
                                barcode: repeatedproduct[0].BarCode,
                                quantity: repeatedproduct[0].StockQuantity,
                                amount: repeatedproduct[0].Quantity,
                                artcode: repeatedproduct[0].ArtCode,
                                price: repeatedproduct[0].Price,
                                totalprice: `${parseFloat(repeatedproduct[0].Price) * parseFloat(repeatedproduct[0].Quantity)}`,
                                key: repeatedproduct[0].key,
                                name: repeatedproduct[0].Name,
                            }]
                            break;

                        case 'losses':
                            newData = [{
                                value: repeatedproduct[0].Name,
                                barcode: repeatedproduct[0].BarCode,
                                quantity: repeatedproduct[0].StockQuantity,
                                amount: repeatedproduct[0].Quantity,
                                artcode: repeatedproduct[0].ArtCode,
                                price: repeatedproduct[0].Price,
                                totalprice: `${parseFloat(repeatedproduct[0].Price) * parseFloat(repeatedproduct[0].Quantity)}`,
                                key: repeatedproduct[0].key,
                                name: repeatedproduct[0].Name,
                                costprice: repeatedproduct[0].CostPrice,
                                costpricetotal: `${parseFloat(repeatedproduct[0].CostPrice) * parseFloat(repeatedproduct[0].Quantity)}`,
                            }]
                            break;

                        case 'moves':
                            newData = [{
                                value: repeatedproduct[0].Name,
                                barcode: repeatedproduct[0].BarCode,
                                quantity: repeatedproduct[0].StockQuantity,
                                amount: repeatedproduct[0].Quantity,
                                artcode: repeatedproduct[0].ArtCode,
                                price: repeatedproduct[0].Price,
                                totalprice: `${parseFloat(repeatedproduct[0].Price) * parseFloat(repeatedproduct[0].Quantity)}`,
                                key: repeatedproduct[0].key,
                                name: repeatedproduct[0].Name,
                                costprice: repeatedproduct[0].CostPrice,
                                costpricetotal: `${parseFloat(repeatedproduct[0].CostPrice) * parseFloat(repeatedproduct[0].Quantity)}`,
                            }]
                            break;

                        default:
                            break;
                    }


                    store.dispatch(updateProduct(newData, true))
                    selectRef.current.blur()
                    selectRef.current.focus()
                    return false
                }
                else {

                    setFetching(true)
                    fetchOptions(event.target.value).then((newOptions) => {
                        if (fetchId !== fetchRef.current) {
                            return;
                        }
                        store.dispatch(updateProduct(newOptions, 'barcode'))
                        selectRef.current.blur()
                        selectRef.current.focus()
                        setFetching(false);
                    });
                }

                return false
            }
        }
    }
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            if (value === '') {
                setFetching(false)
            }
            else {

                setFetching(true)
                fetchOptions(value).then((newOptions) => {
                    if (fetchId !== fetchRef.current) {
                        return;
                    }
                    setOptions(newOptions);
                    setFetching(false);
                });
            }
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
        <Select
            ref={selectRef}
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            onInputKeyDown={enterHandler}
            {...props}
            options={options}

        />
    );
} // Usage of DebounceSelect


async function fetchProductList(fast) {
    var filterObject = {}
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    filterObject.fast = fast
    switch (from) {
        case 'enters':
            return axios.post('https://r.bein.az/controllers/products/getfast.php', filterObject)
                .then((response) => response.data.Body.List)
                .then((data) =>

                    data.map((d) => ({
                        label: `${d.FastName}  - (${d.Quantity === null ? '0.00' : d.Quantity})`,
                        value: d.Name,
                        barcode: d.BarCode,
                        quantity: d.Quantity,
                        amount: 1,
                        price: d.BuyPrice,
                        packprice: d.PackPrice,
                        packquantity:d.PackQuantity,
                        ispack:d.IsPack,
                        totalprice: `${parseFloat(d.BuyPrice) * parseFloat(1)}`,
                        key: d.Id,
                        name: d.Name,
                    }))
                )
            break;
        case 'losses':
            return axios.post('https://r.bein.az/controllers/products/getfast.php', filterObject)
                .then((response) => response.data.Body.List)
                .then((data) =>

                    data.map((d) => ({
                        label: `${d.FastName}  - (${d.Quantity === null ? '0.00' : d.Quantity})`,
                        value: d.Name,
                        barcode: d.BarCode,
                        quantity: d.Quantity,
                        amount: 1,
                        price: d.BuyPrice,
                        totalprice: `${parseFloat(d.BuyPrice) * parseFloat(1)}`,
                        key: d.Id,
                        name: d.Name,
                        costprice: d.CostPrice,
                        costpricetotal: `${parseFloat(d.CostPrice) * parseFloat(1)}`
                    }))
                )

            break;
        case 'moves':
            return axios.post('https://r.bein.az/controllers/products/getfast.php', filterObject)
                .then((response) => response.data.Body.List)
                .then((data) =>

                    data.map((d) => ({
                        label: `${d.FastName}  - (${d.Quantity === null ? '0.00' : d.Quantity})`,
                        value: d.Name,
                        barcode: d.BarCode,
                        quantity: d.Quantity,
                        amount: 1,
                        price: d.BuyPrice,
                        totalprice: `${parseFloat(d.BuyPrice) * parseFloat(1)}`,
                        key: d.Id,
                        name: d.Name,
                        costprice: d.CostPrice,
                        costpricetotal: `${parseFloat(d.CostPrice) * parseFloat(1)}`
                    }))
                )

            break;
        case 'supplies':
            return axios.post('https://r.bein.az/controllers/products/getfast.php', filterObject)
                .then((response) => response.data.Body.List)
                .then((data) =>

                    data.map((d) => ({
                        label: `${d.FastName}  - (${d.Quantity === null ? '0.00' : d.Quantity})`,
                        value: d.Name,
                        barcode: d.BarCode,
                        quantity: d.Quantity,
                        amount: 1,
                        price: d.BuyPrice,
                        totalprice: `${parseFloat(d.BuyPrice) * parseFloat(1)}`,
                        key: d.Id,
                        name: d.Name,
                        costprice: d.CostPrice,
                        costpricetotal: `${parseFloat(d.CostPrice) * parseFloat(1)}`
                    }))
                )

            break;
            case 'demands':
                return axios.post('https://r.bein.az/controllers/products/getfast.php', filterObject)
                    .then((response) => response.data.Body.List)
                    .then((data) =>
    
                        data.map((d) => ({
                            label: `${d.FastName}  - (${d.Quantity === null ? '0.00' : d.Quantity})`,
                            value: d.Name,
                            barcode: d.BarCode,
                            quantity: d.Quantity,
                            amount: 1,
                            price: d.Price,
                            packprice: d.PackPrice,
                            packquantity:d.PackQuantity,
                            ispack:d.IsPack,
                            totalprice: `${parseFloat(d.Price) * parseFloat(1)}`,
                            key: d.Id,
                            name: d.Name,
                            costprice: d.CostPrice,
                            costpricetotal: `${parseFloat(d.CostPrice) * parseFloat(1)}`
                        }))
                    )
    
                break;
        
        default:
            break;

    }
    

}

const Demo = (props) => {
    const [value, setValue] = React.useState([]);
    changedPositions = props.positions
    from = props.from
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Məhsul əlavə et - Ad,Barkod və ya Artkod ilə"
            fetchOptions={fetchProductList}
            onChange={(newvalue, option) => {
                props.updateProduct(option, 'product')
            }}
            style={{
                width: '100%',
            }}
            positions={props.positions}


        />
    );
};


const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    updateProduct, updateBarcode, updatePositions
}
export default connect(mapStateToProps, mapDispatchToProps)(Demo)