import React, { Component } from 'react'
import { Modal, Button } from 'antd';
import ProductTable from '../components/CheckProducts'
import { connect } from 'react-redux'
import { fetchData } from '../actions/getData-action';
import filterObject from '../config/filterObject';
import { updateSelectProductMultiConfirm } from '../actions/updateStates-action';
var datalistProduct = [];

class AddProductsFromModal extends Component {
    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
        filterObject.pg = 0
        filterObject.id = ''
        this.props.updateSelectProductMultiConfirm(false)
        this.props.fetchData('products')
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
            this.props.updateSelectProductMultiConfirm(true)
        }, 1500);
    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.updateSelectProductMultiConfirm(false)

    };

    render() {
        const { visible, loading } = this.state;
        datalistProduct = []
           Object.values(this.props.state.datas.datas).map(data =>datalistProduct.push(data))
           datalistProduct.map(d =>
            d.key = d.Id
        )
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal with customized footer
                </Button>
                <Modal
                    visible={visible}
                    title="Title"
                    width = {800}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    bodyStyle={{width:800}}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <ProductTable datas={datalistProduct} />

                </Modal>
            </>
        );
    }
}




const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    fetchData,updateSelectProductMultiConfirm
}
export default connect(mapStateToProps, mapDispatchToProps)(AddProductsFromModal)
