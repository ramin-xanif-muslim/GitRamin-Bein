import React, { Component } from 'react'

const TableHOC = (WrappedComponent) => {
    return class TableHOC extends Component {

        render() {
            
            return this.props.state.datas.changePage === true? <div>Loading...</div> : <WrappedComponent {...this.props} {...this.state}/>
        }
    }
}


export default TableHOC