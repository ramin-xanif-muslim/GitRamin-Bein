
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { fetchData, fetchDataFast, updateSearchInput } from '../actions/getData-action'

import filterObject from '../config/filterObject'
import {
    PlusCircleOutlined,
    SearchOutlined
} from '@ant-design/icons';
const { Search } = Input;
class SearchInput extends Component {

    state = {
        value: ''
    }


    onChange = (e) => {

        this.setState({
            value: e.target.value
        })
    }
    handleSearch = (e) => {
        if (e.target.value != '') {
            if (this.props.from === 'fast' || this.props.from === 'modal') {
                filterObject.fast = e.target.value
                this.props.fetchDataFast(this.props.fetchFast)
                this.props.updateSearchInput(e.target.value)

            }
            else {
                filterObject.nm = e.target.value
                this.props.fetchData(this.props.fetchFast)
            }
            e.target.value = ''

        }
        else {
            filterObject.fast = ''
            filterObject.nm = ''
            this.props.fetchData(this.props.fetchFast)
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state.datas.searching != this.props.state.datas.searching) {
            this.setState({
                value: nextProps.state.datas.searching
            })
        }
        else if (nextProps.state.datas.searching != this.state.value) {
            this.setState({
                value: nextProps.state.datas.searching
            })
        }
    }
    render() {

        return (

            <Search className='search_header' placeholder="Axtarış..." value={this.state.value} onChange={this.onChange} onPressEnter={this.handleSearch} loading={this.props.state.datas.loading} style={{ width: 200 }} />

        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchData, fetchDataFast, updateSearchInput
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput)