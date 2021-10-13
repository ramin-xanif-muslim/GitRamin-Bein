import React, { Component } from 'react'
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { getToken } from '../config/token'
import axios from 'axios';
import { updateCustomer, deleteCustomer } from '../actions/updateCustomer';
import { connect } from 'react-redux'

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = React.useState(false);
    const [value, setValue] = React.useState([]);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);
    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);
            fetchOptions(value).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);

    const selectFunction = (LabeledValue) => {
        setOptions([]);
        console.log(LabeledValue)
    }
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            onSelect={selectFunction}
            defaultActiveFirstOption={true}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
            options={options}
            autoClearSearchValue = {true}
        />
    );
} // Usage of DebounceSelect

async function fetchCustomerList(fast) {
    var filterObject = {}
    filterObject.token = getToken
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


const CustomerSelect = (props) => {
    const [value, setValue] = React.useState([]);
    return (
        <DebounceSelect
            mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchCustomerList}
            onChange={(newValue, option) => {
                props.updateCustomer(option)
                setValue(newValue)
            }}
            style={{
                width: '100%',
            }}
        />
    );
};


const mapStateToProps = (state) => ({
    state,
})
const mapDispatchToProps = {
    updateCustomer, deleteCustomer
}
export default connect(mapStateToProps, mapDispatchToProps)(CustomerSelect)