import React, { Component } from 'react'
import { connect } from 'react-redux'
import GridExampleContainer from './DownloadPage'



class Download extends Component {


    componentDidMount() {


    }

    render() {
        return (
            <div className='table_holder'>
                <GridExampleContainer />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    state
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Download)
