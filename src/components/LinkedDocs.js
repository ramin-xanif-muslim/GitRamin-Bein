import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Drawer, Button } from 'antd';
import LinkedDocTable from './LinkedDocTable';


class LinkedDocs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
    }







    render() {
        return (
            <Drawer
                title="Əlaqəli sənədlər"
                className='docTableWrapper'
                onClose={this.props.onClose}
                visible={this.props.visible}
                bodyStyle={{ paddingBottom: 80 }}
            >


        
                <LinkedDocTable filter={this.props.filter} amount={this.props.amount} cusname={this.props.cusname} datas={this.props.state.datas.documents} onClose={this.props.onClose} fetching={this.props.state.datas.fetchingLinked} />

            </Drawer>
        )
    }
}

const mapStateToProps = (state) => ({
    state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LinkedDocs)
