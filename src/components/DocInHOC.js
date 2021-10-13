import React, { Component } from 'react'

const DocInHOC = (WrappedComponent,fieldmain,field) => {
    return class DocInHOC extends Component {

        render() {
            console.log(this.props.state[fieldmain][field])
            return this.props.state[fieldmain][field].length === 0? <div>Loading...</div> : <WrappedComponent {...this.props} {...this.state}/>
        }
    }
}


export default DocInHOC