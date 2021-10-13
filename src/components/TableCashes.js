import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import 'antd/dist/antd.css';
class TableCashes extends Component {




    render() {

        return (
            <BootstrapTable
                keyField="Name"
                data={this.props.datas}
                columns={this.props.cols}
                striped
                hover
                condensed
            />
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TableCashes)
