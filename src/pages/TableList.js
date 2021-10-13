import React, { Component } from 'react'
import TableCustom from './Tablecustom'
import Trans from '../usetranslation/Trans'
import TableHOC from '../components/TableHOC'
import { connect } from 'react-redux'
import { Table } from 'antd'
import { Grid, Input, Pagination, Segment } from 'semantic-ui-react'
import { fetchData } from '../actions/getData-action'
import { updateChangePage } from '../actions/getData-action'
import filterObject from '../config/filterObject'
import { filter } from 'dom-helpers'
var colNames = []
var databody = []
var checkedcolumns = []
var checkedcolumnnames = []
var datalist;
var columnlist;
var emptyMessage
class TableList extends Component {
    state = {
        activePage: 1,
        pageChange: false,
        from: ''
    }
    handlePaginationChange = (e, { activePage, from }) => {
        filterObject.pg = activePage - 1;
        this.setState({
            activePage,
            pageChange: true
        },
            this.props.fetchData(from),
        )
    }
    componentDidMount() {
        this.setState({
            from: this.props.from
        })
    }
    render() {
        colNames = []
        columnlist = []
        databody = []
        checkedcolumns = []
        checkedcolumnnames =[]
        datalist = (
            this.props.state.datas.datas.map(data => databody.push(data))
        );
        datalist = databody
        //add custom element to JsonObject starts
        if (this.props.from === 'stockbalance') {
            datalist.map(d =>
                d.key = d.ProductId
            )
            datalist.map(d =>
                d.TotalSumPrice = parseFloat(d.Price) * parseFloat(d.Quantity)
            )

        }
        else {
            datalist.map(d =>
                d.key = d.Id
            )
         
        }

        //add custom element to JsonObject ends
        console.log(this.props.cols)

        checkedcolumns = (
            Object.values(this.props.showcols).map(c => checkedcolumnnames.push({ title: c.dataIndex, dataIndex: c.dataIndex ,hidden:c.hidden,}))
        );
      
        columnlist = colNames
        checkedcolumns = checkedcolumnnames
        const { activePage, from } = this.state;
        return (
            <div>
                <TableCustom datas={datalist} tableHeaders={checkedcolumns} columns={this.props.cols} editPage={this.props.redirectTo} foredit={this.props.from} />
                <Pagination
                    activePage={activePage}
                    from={from}
                    onClick={this.changePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={Math.ceil(this.props.state.datas.totalDatas / this.props.state.datas.totalLimit)}
                />
            </div>

        )
    }

}
const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    fetchData, updateChangePage
}
export default connect(mapStateToProps, mapDispatchToProps)(TableHOC(TableList))
