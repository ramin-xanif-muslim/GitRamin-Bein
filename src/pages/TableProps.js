import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchData from '../actions/getData-action'
import TableList from './TableList'
import Trans from '../usetranslation/Trans'
import TableHOC from '../components/TableHOC'
class TableProps extends Component {


    render() {
        return (
            <div>
                <TableList/>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData,
}
export default connect(mapStateToProps, mapDispatchToProps)(TableProps)
