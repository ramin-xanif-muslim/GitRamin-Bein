import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Drawer, Button } from 'antd';
import CreateCustomerFormModal from './CreateCustomerFormModal';
import CreateCustomerGroupFormModal from './CreateCustomerGroupFormModal';
export const CreateCustomerModal = (props) => {
    console.log(props)
    return (
        <div>
            <Drawer
                title="Müştəri"
                width={600}
                closable={false}
                onClose={props.onClose}
                destroyOnClose={true}
                visible={props.visible}
            >

                <CreateCustomerFormModal from={props.from}  openSecondModal={props.showChildrenDrawer} fetching={props.state.docmodals.fetching} datas={props.customerGr} />
                <Drawer
                    title="Müştəri qrupu"
                    width={400}
                    closable={false}
                    destroyOnClose={true}
                    onClose={props.onChildrenDrawerClose}
                    visible={props.childrenDrawer}
                >
                    <CreateCustomerGroupFormModal from= {props.from} />
                </Drawer>
            </Drawer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state,
    customerGr: state.docmodals.customerGroups

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerModal)
