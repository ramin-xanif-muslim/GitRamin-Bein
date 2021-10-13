import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import { Table, Switch, Space } from 'antd';
import { ConvertFixedTable } from '../Function/convertNumberDecimal';
import 'antd/dist/antd.css';
var childrenArr = []
class TableProfit extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            datas: [],
            expandedRowKeys: ['4']
        };
    }


 
  

    render() {
        childrenArr = []
        var spendItemsSum = 0;
        {
            this.props.state.datas.profit.map(d => {
                spendItemsSum += parseFloat(d.Amount)
                childrenArr.push({
                    key: d.Id,
                    name: d.Name,
                    profit: ConvertFixedTable(d.Amount)
                })
            })

        }
        var clearProfit = isNaN(ConvertFixedTable(this.props.state.datas.profitInfo.SaleSum - this.props.state.datas.profitInfo.CostSum - spendItemsSum)) ? '0' :  ConvertFixedTable(this.props.state.datas.profitInfo.SaleSum - this.props.state.datas.profitInfo.CostSum - spendItemsSum)
        var cycleProfit = isNaN(ConvertFixedTable(this.props.state.datas.profitInfo.SaleSum - this.props.state.datas.profitInfo.CostSum)) ? '0' : ConvertFixedTable(this.props.state.datas.profitInfo.SaleSum - this.props.state.datas.profitInfo.CostSum)

        var datas=[
            {
                key: 1,
                name: 'Satış dövrüyyəsi',
                profit: ConvertFixedTable(this.props.state.datas.profitInfo.SaleSum) + ' ₼'
            },
            {
                key: 2,
                name: 'Mayası',
                profit: ConvertFixedTable(this.props.state.datas.profitInfo.CostSum) + ' ₼'
            },
            {
                key: 3,
                name: 'Dövrüyyə mənfəəti',
                profit:cycleProfit + ' ₼'
            },
            {
                key: 4,
                name: 'Xərclər (toplam)',
                profit: ConvertFixedTable(spendItemsSum) + ' ₼',
                children: childrenArr
            },
            {
                key: 5,
                name: <span className='boldContent'>Təmiz mənfəət</span>,
                profit: <span className='boldContent' style={{ color: clearProfit < 0 ? "red" : 'initial' }}>{ConvertFixedTable(clearProfit)} ₼</span>
            },
        ]

        return (
            <Table
                columns={this.props.cols}
                dataSource={datas}
                pagination={false}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TableProfit)
