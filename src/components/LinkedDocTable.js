import React, { Component } from 'react'
import { connect } from 'react-redux'
import ModalHOC from '../modal/ModalrHOC';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Form, Button, DatePicker, ConfigProvider } from 'antd';
import Trans from '../usetranslation/Trans';
import cols from '../ColNames/LinkedDocs/colNames';
import './LinkedDocTable.css'
import { fetchDocuments } from '../actions/getData-action';
import moment from 'moment';
import 'moment/locale/az';
import locale from 'antd/lib/locale/az_AZ';
moment.locale('az');

const { RangePicker } = DatePicker;

const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize }) => (
    <div className='documentTable' >
        <BootstrapTable
            remote
            keyField="id"
            data={data}
            columns={cols}
            pagination={paginationFactory({ page, sizePerPage, totalSize, hideSizePerPage: true, paginationSize: Math.ceil(totalSize / sizePerPage) })}
            onTableChange={onTableChange}
        />
    </div>
);
class LinkedDocTable extends Component {
    form = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: this.props.datas,
            sizePerPage: this.props.state.datas.documentInfo.Limit

        };
    }

    handleTableChange = (type, { page, sizePerPage }) => {
        const currentIndex = (page - 1)
        this.props.filter.pg = currentIndex
        this.props.fetchDocuments(this.props.filter)

    }
    render() {
        const { data, sizePerPage, page } = this.state;


        if (this.props.state.datas.documents)
            Object.values(this.props.state.datas.documents).map(c => {
                c.DocType = <Trans word={c.DocType} />
            })

        return (

            <div>
                <div className='linked_doc_button_wrapper'>
                    <Button type="primary">
                        Çap et
                    </Button>
                </div>

                <div className='linked_doc_top_side'>
                    <p className='linked_doc_info'>
                        <span style={{ color: '#656565' }}>Müştəri adı : <span className='linked_info_span cusname_linked'> {this.props.cusname}</span> </span>
                        <span style={{ marginLeft: '70px', color: 'red' }}>Qalıq borc :  <span className='linked_info_span amount_linked' style={{ color: this.props.amount > 0 ? 'initial' : 'red' }}> {this.props.amount} ₼</span></span>
                    </p>

                    <Form
                        ref={this.form}
                        id='linked_doc_filter'
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={this.onFinish}>

                        < Form.Item
                            name={'moment'}
                            label={'Tarix'}
                        >

                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    locale={locale}
                                    showTime={{ format: 'HH:mm:ss' }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    ranges={{
                                        'Bu gün': [moment().startOf('day'), moment().endOf('day')],
                                        'Dünən': [moment().subtract(1, "day").startOf('day'), moment().subtract(1, "day").endOf('day')],
                                        'Bu ay': [moment().startOf('month'), moment().endOf('month')],
                                        'Keçən ay': [moment().subtract(1, "month").startOf('month'), moment().subtract(1, "month").endOf('month')],
                                    }}
                                />
                            </ConfigProvider>
                        </Form.Item>
                        <Button style={{ height: '30px' }} type="primary" form='linked_doc_filter' htmlType="submit">
                            Axtar
                        </Button>

                    </Form>


                </div>

                <RemotePagination
                    data={this.props.state.datas.documents}
                    page={this.props.filter.pg + 1}
                    sizePerPage={sizePerPage}
                    totalSize={this.props.state.datas.documentInfo.Count}
                    onTableChange={this.handleTableChange}
                />
            </div >

        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {
    fetchDocuments
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalHOC(LinkedDocTable, 'fetching'))
