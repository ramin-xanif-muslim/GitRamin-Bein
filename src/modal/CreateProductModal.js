import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'antd';
import CreateProductFormModal from './CreateProductFormModal ';
import CreateProductGroupForm from '../components/CreateProductGroupForm';
import CreateProductGroupFormModal from './CreateProductGroupFormModal';
import Trans from '../usetranslation/Trans';
export const CreateProductModal = (props) => {

    return (
        <div>
            <Modal
                title={<Trans word={'Products'} />}
                visible={props.visible}
                onCancel={props.onClose}
                destroyOnClose={true}
                footer={[
                    <Button key="back" onClick={props.onClose}>
                        Bağla
                    </Button>,
                    <Button key="submit" htmlType='submit' form='docModal' type="primary" >
                        Yadda saxla
                    </Button>
                ]}>
                <CreateProductFormModal attrInputs={props.attrInputs} openSecondModal={props.showChildrenDrawer}  />
            </Modal>

            <Modal
                title={<Trans word={'Group Name'} />}
                visible={props.childrenDrawer}
                onCancel={props.onChildrenDrawerClose}
                destroyOnClose={true}
                footer={[
                    <Button key="back" onClick={props.onChildrenDrawerClose}>
                        Bağla
                    </Button>,
                    <Button key="submit" htmlType='submit' form='docModalGroup' type="primary">
                        Yadda Saxla
                    </Button>
                ]}>
                <CreateProductGroupFormModal fetching={props.state.docmodals.fetching} />
            </Modal>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductModal)
