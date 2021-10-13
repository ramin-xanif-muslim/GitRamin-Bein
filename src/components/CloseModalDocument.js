




import React, { Component } from 'react';
import { Modal, Button, Space } from 'antd';



class CloseModalDocument extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
           

            </>
        );
    }
}

export default CloseModalDocument