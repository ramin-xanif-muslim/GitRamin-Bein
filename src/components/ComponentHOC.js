import React, { Component } from 'react'

const CompoenentHOC = (WrappedComponent,fieldmain,field) => {
    return class DocInHOC extends Component {

        render() {
            console.log(this.props.state[fieldmain][field])
            return this.props.state[fieldmain][field] ? <div>Loading...</div> : <WrappedComponent {...this.props} {...this.state}/>
        }
    }
}


export default CompoenentHOC