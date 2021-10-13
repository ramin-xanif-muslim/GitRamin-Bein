import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action'
import Trans from '../usetranslation/Trans'
import GridExampleContainer from '../modal/ProductPageInModal'
import filterObject from '../config/filterObject'
import { Pagination } from 'semantic-ui-react'
import { Table } from 'antd';
import { updateSelectProductMulti } from '../actions/updateStates-action'
import TableHOC from './TableHOC'


const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'BarCode',
        dataIndex: 'barcode',
    },
    {
        title: 'BuyPrice',
        dataIndex: 'buyprice',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
];



var datas = []



class ProductTable extends Component {
    constructor(props) {
        super(props)
        datas = []
        this.props.datas.map(d =>
            datas.push({
                key: d.Id,
                name:d.Name,
                artcode:d.ArtCode,
                barcode: d.BarCode,
                buyprice: d.BuyPrice,
                price: d.Price,
                amount:1,
                totalprice: `${parseFloat(d.BuyPrice) * parseFloat(1)}`,
                quantity: d.Quantity,

            })
        )


    }
    state = {
        activePage: 1,
        selectedRowKeys: this.props.state.stateChanges.multiselectproductsrow ?  this.props.state.stateChanges.multiselectproductsrow : [] , // Check here to configure the default column
    };
    handlePaginationChange = (e, { activePage }) => {
        filterObject.pg = activePage - 1;
        this.setState({
            activePage,
        },
            this.props.fetchData('products'),
        )
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRows)
        this.setState({ selectedRowKeys });
        this.props.updateSelectProductMulti(selectedRows,selectedRowKeys)
    };




    render() {
        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };

        const { activePage } = this.state;

        return (
            <div>
                <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={datas} />
                <Pagination
                    activePage={activePage}
                    onClick={this.changePage}
                    onPageChange={this.handlePaginationChange}
                    totalPages={Math.ceil(this.props.state.datas.totalDatas / this.props.state.datas.totalLimit)}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData,updateSelectProductMulti
}
export default connect(mapStateToProps, mapDispatchToProps)(TableHOC(ProductTable))
