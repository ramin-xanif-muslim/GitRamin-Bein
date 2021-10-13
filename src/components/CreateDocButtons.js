import React, { Component } from 'react'
import { Button, Radio } from 'antd';
import { connect } from 'react-redux'
import updateChanged from '../actions/updateChanged-action'
import { DownloadOutlined } from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
class CreateDocButtons extends React.Component {


    handleClosePage = () =>{
        this.props.updateChanged(true,this.props.from)
    }
    render() {

        if (this.props.state.changed.changed) {
            
            return <Redirect to={this.props.state.changed.redirect} />
          }
        return (
            <>
                <Button onClick={this.handleClosePage} type="primary" >Bagla </Button>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
    updateChanged
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateDocButtons)
