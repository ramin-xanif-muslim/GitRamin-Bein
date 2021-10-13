import React, { Component } from 'react'
import { Skeleton } from 'antd';

const ModalHOC = (WrappedComponent, field) => {
    return class LoaderHOC extends Component {
        render() {
            
            return this.props[field] === true ? <Skeleton active /> : <WrappedComponent {...this.props} />
        }
    }
}


export default ModalHOC