import React, { Component } from 'react'
import { Button, message, Modal, Menu, Dropdown } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert } from 'antd';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import updateChanged from '../actions/updateChanged-action'
import { updateUpperheader } from '../actions/getNavbar-action';
import { exitModal } from '../actions/updateStates-action';
import { changeSubMenu } from '../actions/getNavbar-action';
import { updateSelectProductMultiConfirm, updateSendObject, submitForm } from '../actions/updateStates-action';
// import Sound from 'react-sound';
import { saveDoc } from '../actions/putAactions/saveBtn-action';
// import Ok from '../audio/ok.mp3'
import { duration } from 'moment';
import {
    CheckSquareOutlined,
    PlusCircleOutlined,
    DownOutlined
} from '@ant-design/icons';
import './Doc.css'



class DocButtons extends React.Component {


    state = {
        redirect: false,
        send: false,
        isPlaying: false,
        visible: false,
        from: this.props.from,
        fromDoc: this.props.fromDoc,
        toDoc: this.props.toDoc,
        returnPage: false,
        redirectExternal: false,
        redirectLinkedDoc: false

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.props.exitModal(false, this.props.state.stateChanges.fromvisible, this.props.state.stateChanges.name)
    };
    handleReturnPage = () => {
        this.props.exitModal(false, this.props.state.stateChanges.fromvisible, this.props.state.stateChanges.name)
        this.props.updateUpperheader(this.props.state.stateChanges.name)
        this.props.changeSubMenu(this.props.state.stateChanges.name)
        this.setState({
            redirect: true
        });
    }
    handleCloseAlert = () => {
        message.destroy();
    }

    handleClearChanged = (e) => {
        if (e.target.parentNode.id === 'closeBtn' || e.target.id === 'closeBtn') {

            if (this.props.state.stateChanges.changed) {
                this.props.exitModal(true, this.props.state.stateChanges.fromvisible, this.props.state.stateChanges.name ? this.props.state.stateChanges.name : this.props.state.navbar.activeSubItem)
                return
            }
            else {
                this.setState({
                    returnPage: false,
                    send: false,
                })
                this.setState({
                    redirect: true
                });
            }

        }
        else if (e.target.parentNode.id === 'saveBtn' || e.target.id === 'saveBtn' || e.target.id === 'saveTrans') {
            this.setState({
                returnPage: false,
            })


        }
        else if (e.target.parentNode.id === 'newDropdown') {

        }
    }


    handleeSaveDocModal = () => {

        this.props.exitModal(false, this.props.state.stateChanges.fromvisible, this.props.state.stateChanges.name ? this.props.state.stateChanges.name : this.props.state.navbar.activeSubItem)
        this.props.updateUpperheader(this.props.state.stateChanges.name)
        this.setState({
            returnPage: true
        })
    }
    onChangeText = (e) => {
        this.setState({
            text: e.target.value
        })
    };

    handlePayment = (e) => {
        this.setState({
            redirectExternal: true,
        })
    }
    handleLinked = () => {
        this.setState({
            redirectLinkedDoc: true
        })
    }



    render() {
        if (this.state.redirect) {
            return <Redirect push to={`/${this.props.state.stateChanges.fromvisible ? this.props.state.stateChanges.fromvisible : this.props.from}`} />;
        }
        if (this.state.redirectExternal && this.props.state.savedoc.iscreated) {
            return <Redirect push to={{
                pathname: this.props.toDoc,
                state: {
                    fromdoc: this.props.fromDoc,
                    doc: this.props.doc[0],
                    selectCustomerId :  this.props.state.datas.selectedCustomerId,
                    selectCustomerName :  this.props.state.datas.selectedCustomerName

                }
            }} />;
        }
        if (this.state.redirectLinkedDoc) {
            return <Redirect push to={{
                pathname: this.props.toLinked,
                state: {
                    fromdoc: this.props.fromDoc,
                    doc: this.props.doc[0]
                }
            }} />;
        }



        const menu = (
            <Menu>
                <Menu.Item key="0" disabled={!this.props.match.params.id ? this.props.state.savedoc.newDocId === '' ? true : false : false} ><Button onClick={this.handlePayment} id={'saveTrans'} htmlType={'submit'} form='myForm'>Ödəmə</Button></Menu.Item>
                <Menu.Item key="1" disabled={!this.props.match.params.id ? this.props.state.savedoc.newDocId === '' ? true : false : false} onClick={this.handleLinked}>Qaytarma</Menu.Item>
                <Menu.Item key="2" disabled={!this.props.match.params.id ? this.props.state.savedoc.newDocId === '' ? true : false : false}>Sifariş</Menu.Item>
            </Menu>
        );
        return (
            <div className='doc_header_buttons '>
                {
                    Object.values(this.props.buttonsName).filter(p => p.id === 'saveBtn').map(p =>
                        <Button onClick={this.handleClearChanged} form={p.form} htmlType={'submit'} loading={this.props.loading} key={p.id} className={p.className} id={p.id}>{p.title}</Button>
                    )
                }
                {
                    Object.values(this.props.buttonsName).filter(p => p.id != 'saveBtn').map(p =>
                        p.icon ? <Dropdown overlay={menu} trigger={['click']}>

                            <Button htmlType={p.type} key={p.id} className={p.className} icon={<DownOutlined />} onClick={e => e.preventDefault()}>
                                {p.title}
                            </Button>
                        </Dropdown> :
                            <Button onClick={this.handleClearChanged} form={p.form} htmlType={p.type} key={p.id} className={p.className} id={p.id}>{p.title}</Button>

                    )




                }


                <Modal
                    title='Diqqət'
                    closable={false}
                    className='close_doc_modal_wrapper'
                    visible={this.props.state.stateChanges.visible}
                    footer={[

                        <Button key="back" onClick={this.handleCancel}>
                            Geri qayıt
                        </Button>,
                        <div className='close_doc_modal_right_side'>
                            <Button form="myForm" key="submit" htmlType="submit" onClick={this.handleeSaveDocModal} >
                                Bəli
                            </Button>
                            <Button
                                key="link"
                                href="#"
                                type="primary"
                                onClick={this.handleReturnPage}
                            >
                                Xeyr
                            </Button>
                        </div>

                    ]}
                >
                    <p>Dəyişikliklər yadda saxlanılsın</p>
                </Modal>

            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateChanged, updateSelectProductMultiConfirm, updateSendObject, submitForm, saveDoc, exitModal, updateUpperheader, changeSubMenu
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DocButtons))
