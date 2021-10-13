import React, { Component } from 'react'
import { Drawer, Form, Button, Col, Row, Input,Modal, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { getGroups } from '../actions/getGroups-action';
import CreateStockForm from '../components/CreateStockForm';
import { openModal } from '../actions/updateStates-action';

const { Option } = Select;

class AddStockModal extends React.Component {



 

    onClose = () => {
        this.props.openModal(false)
    };

    render() {
        return (
            <>

                <Modal
                    visible={this.props.state.stateChanges.openCreateModal}
                    title="Anbar"
                    onCancel={this.onClose}
                >
                           <CreateStockForm datas={this.props.state.groups.groups} />

                </Modal>
          
            </>
        );
    }
}




const mapStateToProps = (state, props) => ({
    state,
})
const mapDispatchToProps = {
    getGroups, openModal
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStockModal)
