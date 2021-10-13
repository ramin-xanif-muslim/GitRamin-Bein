import React, { Component } from 'react'
import { Skeleton } from 'antd';
const LoaderDocHOC = (WrappedComponent, field) => {
    return class LoaderDoc extends Component {
        render() {
            
            return this.props[field] === true ? <Skeleton className='doc_loader' active /> : <WrappedComponent {...this.props} />
        }
    }
}


export default LoaderDocHOC