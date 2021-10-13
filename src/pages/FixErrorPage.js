import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { persistConfig } from '../reducers/rootReducer'
import filter from '../Filter/enters'
import { Col, Row } from 'antd';
import FilterPage from '../components/FilterPage';
import './Page.css'
import { Table, Badge, Menu, Dropdown, Space } from 'antd';
import BootstrapTable from 'react-bootstrap-table-next';
import { setRedirect } from '../actions/delActions/delData-action'
import TableLoader from '../components/TableLoader';
import LoaderHOC from '../components/LoaderHOC'
import { ConvertFixedTable } from '../Function/convertNumberDecimal';
import { DownOutlined } from '@ant-design/icons';
import Trans from '../usetranslation/Trans'

import ModalHOC from '../modal/ModalrHOC';

class FixErrorPage extends Component {
    contextRef = createRef()

    expandedRowRender = (e, datas) => {
        console.log(datas)
        console.log(e)

        const columns = [
            { title: 'Sənəd', dataIndex: 'DocType', key: 'doctype' },
            { title: 'Miqdar', dataIndex: 'Quantity', key: 'quantity' },
            { title: 'Qalıq', dataIndex: 'SumQ', key: 'sumq' },
            { title: 'Maya', dataIndex: 'Price', key: 'price' },
            { title: 'Tarix', dataIndex: 'Moment', key: 'moment' },

        ];

        const data = [];
        for (let i = 0; i < Object.keys(datas).length; ++i) {
            for (let a = 0; a < Object.keys(datas[i]).length; a++) {
                if (datas[i][a] && datas[i][a].DocType === e.key) {
                    Object.values(datas[i]).forEach(d => {
                        console.log(d)
                        if (d.Price != null) {
                            data.push({
                                key: Math.random(),
                                DocType: <Trans word={d.DocType}/> ,
                                Quantity: ConvertFixedTable(d.Quantity),
                                SumQ:ConvertFixedTable(d.SumQ),
                                Price: ConvertFixedTable(d.Price),
                                Moment: d.Moment,
                            });
                        }
                    })


                }
            }
        }

        return <Table
            columns={columns}
            rowClassName={(record) => record.SumQ < 0 ? 'minus_errors' : ''}
            dataSource={data}
            pagination={false} />;
    };
    render() {



        const cols = [
            {
                dataIndex: 'DocType',
                key: 'doctype',
                title: 'Ad/Barkod',
            }
        ]

        const datas = [];

        for (let i = 0; i < Object.keys(this.props.datas).length; ++i) {
            for (let a = 0; a < Object.keys(this.props.datas[i]).length; a++) {
                if (this.props.datas[i][a] && this.props.datas[i][a].Price === null) {
                    datas.push({
                        key: this.props.datas[i][a].DocType,
                        DocType: this.props.datas[i][a].DocType,
                    });
                }

            }

        }



        return (
            <Row style={{ overflow: 'hidden' }} className={'table_holder_section'}>
                <Row className='filter_table_wrapper_row doc'>
                    <FilterPage from='enters' filter={filter} />
                    <Table
                        className="components-table-demo-nested"
                        style={{ width: 'max-content' }}
                        columns={cols}
                        pagination={false}
                        expandedRowRender={(e) => this.expandedRowRender(e, this.props.datas)}
                        dataSource={datas}
                    />
                </Row>
            </Row>

        )
    }
}
const mapStateToProps = (state) => ({
    state, setRedirect
})
export default connect(mapStateToProps)(ModalHOC(FixErrorPage, 'fetching'))

