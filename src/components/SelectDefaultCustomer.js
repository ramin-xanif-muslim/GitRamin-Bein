import React, { Component } from 'react';
import { getToken } from '../config/token'
import axios from 'axios';
import AsyncSelect from 'react-select/async';


async function fetchCustomerList(fast) {
    var filterObject = {}
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    filterObject.fast = fast
    return axios.post('https://r.bein.az/controllers/customers/getfast.php', filterObject)
        .then((response) => response.data.Body.List)
        .then((data) =>

            data.map((d) => ({
                label: `${d.Name}  - (${d.GroupName})`,
                value: d.Name,
                key: d.Id,
            }))
        )
}





const promiseOptions = inputValue =>
    new Promise(resolve => {
        resolve(fetchCustomerList(inputValue));
    });



class WithPromises extends Component {
    constructor(props) {
        super(props)
      
    }

    render() {

    
        console.log( this.props.selectedCustomerName )
        return (

            <AsyncSelect defaultValue={{ label: `${this.props.selectedCustomerName}`, value:this.props.selectedCustomerName}}
                cacheOptions defaultOptions loadOptions={promiseOptions} />

        );
    }
}

export default WithPromises