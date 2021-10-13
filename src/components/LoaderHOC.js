import React, { Component } from 'react'
import TableLoader from './TableLoader'
import { Spin, Alert } from 'antd';

const LoaderHOC = (WrappedComponent, field) => {
    return class LoaderHOC extends Component {
        render() {
            return Array.isArray(this.props[field]) && this.props[field].length === 0 ? <Spin className='fetchSpinner' tip="Yüklənir...">
                <Alert />
            </Spin> :
                this.props[field] === undefined ?
                    <div>
                        <Spin className='fetchSpinner' tip="Yüklənir...">
                            <Alert />
                        </Spin>
                    </div>

                    :

                    <WrappedComponent {...this.props} />
        }
    }
}


export default LoaderHOC