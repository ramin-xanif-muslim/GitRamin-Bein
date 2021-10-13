
import React, { Component } from 'react'
import { Drawer, Button } from 'antd';
import CreateCustomerForm from '../components/CreateCustomerForm';
import { connect } from 'react-redux'
import { getGroups } from '../actions/getGroups-action';
import CreateCustomerGroupForm from '../components/CreateCustomerGroupForm';
import { updateStatesCreate } from '../actions/updateStates-action';
class CreateCustomerAndCustomerGroup extends Component {

    componentWillMount() {
        this.props.getGroups('customergroups')
    }



    state = { visible: false, childrenDrawer: false };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
        this.props.updateStatesCreate(false)
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
        if (this.props.state.stateChanges.created === true) {
            this.props.getGroups('customergroups')
        }
    };
    render() {
        return (
            <>
                <Button type="primary" onClick={this.showDrawer}>
                    Müştəri  yarat
                </Button>
                <Drawer
                    title="Multi-level drawer"
                    width={520}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Button type="primary" onClick={this.showChildrenDrawer}>
                        Müştəri qrupu yarat

                    </Button>
                    <CreateCustomerForm datas={this.props.state.groups.groups} />
                    <Drawer
                        title="Two-level Drawer"
                        width={320}
                        closable={false}
                        onClose={this.onChildrenDrawerClose}
                        visible={this.state.childrenDrawer}
                        destroyOnClose = {true}
                    >
                        This is two-level drawer
                        <CreateCustomerGroupForm datas={this.props.state.groups.groups} />
                    </Drawer>
                </Drawer>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    getGroups,updateStatesCreate
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomerAndCustomerGroup)