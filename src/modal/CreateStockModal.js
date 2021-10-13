import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Drawer, Button } from 'antd';
import CreateStockFormModal from './CreateStockFormModal';

export const CreateStockModal = (props) => {
    console.log(props)
    return (
        <div>
            <Drawer
                title="Anbar"
                width={600}
                closable={false}
                onClose={props.onClose}
                destroyOnClose={true}
                visible={props.visible}
            >

                <CreateStockFormModal onClose = {props.onClose} fetching={props.state.docmodals.fetching} moveFrom = {props.moveFrom ? props.moveFrom : false } datas={props.stockGr} />
            </Drawer>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state,
    stockGr: state.docmodals.stockGroups

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateStockModal)
